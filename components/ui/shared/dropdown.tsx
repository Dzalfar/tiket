import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from '@/lib/database/models/category.model'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  

type DropdownProps = {
    value: string,
    onChangeHandler: () => void
}
const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([
        { _id: '1', name: 'category 1' },
        { _id: '2', name: 'category 2' },
        { _id: '3', name: 'category 3' },
    ])

  return (
    <Select onOpenChange={onChangeHandler} defaultValue={value} >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    {categories.length > 0 && categories.map((category) => (
        <SelectItem key={category._id} value={category._id} className='select-item p-regular-14'>
            {category.name}
        </SelectItem>
    ))}
        <AlertDialog>
    <AlertDialogTrigger>Open</AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>

  </SelectContent>
</Select>

  )
}

export default Dropdown