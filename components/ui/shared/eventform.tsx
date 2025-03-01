"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import * as z from "zod"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import EventFormSchema from '@/lib/validator'
import { eventDefaultValues } from '@/constants'
import Dropdown from './dropdown'
import { Textarea } from "@/components/ui/textarea"
import FileUploader from './fileUploader'
import Image from 'next/image'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import { Router } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createEvent } from '@/lib/actions/event.action'






type EventFormProps = {
    userId: string;
    type: "Create" | "Update"
  }
  
const EventForm = ({ userId, type }: EventFormProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [files, setFiles] = useState<File[]>([])
  const initialValues = eventDefaultValues;
  const Router = useRouter()

  const { startUpload } = useUploadThing('imageUploader')
  
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: initialValues
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EventFormSchema>) {
    const eventData = values;

    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files)

      if (!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }
   
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: {
            ...values, imageUrl: uploadedImageUrl
          },
          userId,
          path: "/profile"
        })
       
        if (newEvent) {
          form.reset();
          Router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
      
      }
    }
  }
    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5k">
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input placeholder="event title" {...field} className='input-field' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Dropdown onChangeHandler={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col gap-5 md:flex-row '></div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl className='h-72'>
                      <Textarea placeholder="description" {...field} className='textarea rounded-2xl' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl className='h-72'>
                      <FileUploader
                        onFieldsChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                        <Image
                          src="/assets/icons/location-grey.svg"
                          alt='calendar'
                          width={24}
                          height={24}
                        />
                        <Input placeholder="event location" {...field} className='input-field' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                        <Image
                          src="/assets/icons/calendar.svg"
                          alt='calendar'
                          width={24}
                          height={24}
                        />
                        <p className="text-gray-600">start date</p>
                        <DatePicker selected={startDate} onChange={(date) => date !== null && setStartDate(date)} showTimeSelect timeInputLabel='Time:' dateFormat={'dd/MM/yyyy h:mm aa'} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                        <Image
                          src="/assets/icons/calendar.svg"
                          alt='calendar'
                          width={24}
                          height={24}
                        />
                        <p className="text-gray-600">start date</p>
                        <DatePicker selected={startDate} onChange={(date) => date !== null && setStartDate(date)} showTimeSelect timeInputLabel='Time:' dateFormat={'dd/MM/yyyy h:mm aa'} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex  flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Image
                        src="/assets/icons/dollar.svg"
                        alt='dollar'
                        width={24}
                        height={24}
                      />
                      <Input type="number" placeholder="price" {...field} className='p-regular-16 border-none bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex items-center'>
                        <label htmlFor="isFree" className='whitespace-nowrap pe-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Free</label>
                        <Checkbox onCheckedChange={field.onChange} checked={field.value} id='isFree' className='mr-2' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                        <Image
                          src="/assets/icons/link.svg"
                          alt='link'
                          width={24}
                          height={24}
                        />
                        <Input placeholder="event url" {...field} className='input-field' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? (
              "submitting..."
            ) : `${type} event`}</Button>
          </form>
        </Form>
      </div>
    )
  
  }


export default EventForm