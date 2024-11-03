'use client'
import React, { useState } from 'react'
import { updateCategory } from '@/services/categoryService'
import TitleTab from '@/components/TitleTab/TitleTab'
import Form,{Input, Quill, Button, Label, InputUpLoad}  from '@/components/Form/Form'



export default function page() {
  const [productCategory,setProductCategory] = useState('');

  const handleUpdate=(e)=>{
    // e.preventDefault();
    const formData = {
      "name": productCategory,
    }
    let update = updateCategory('6529620b4d4be4d931221a6b',JSON.stringify(formData))

  }
  return (
    <div>
      <TitleTab text={'Thêm danh mục'} className={'text-black'}></TitleTab>
      <Form action={handleUpdate}>
        <div className='flex flex-col mt-5 border-2 p-4 rounded'>
          <Label name={'Tên danh mục'}></Label>
          <Input name='productCategory' placeholder={"Nhập tên danh mục"} onChange={setProductCategory} value={productCategory}></Input>
        </div>
        <Button type='submit' className='mt-4'>Thêm danh mục</Button>
      </Form>
    </div>

  )
}
