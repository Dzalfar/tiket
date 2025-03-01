"use client"
import React, { useEffect, useState } from 'react'
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
import { createCategory, getAllCategories } from '@/lib/actions/category.action'
  
  

type DropdownProps = {
    value: string,
    onChangeHandler: () => void
}
const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [newCategory, setNewCategory] = useState('')
    const handleAddCategory =  () => {
      createCategory({
        categoryName: newCategory.trim()
      })
        .then((category) => {
        setCategories((prevState) => [...prevState, category]);
      })
  }
  
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    }

    getCategories();
   },[])

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
    <AlertDialogTrigger>add new category</AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>New Category</AlertDialogTitle>
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