'use client'
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Form,{Input, Button, Label, InputUpLoad}  from '@/components/Form/Form'
import {createVendor} from '@/services/vendorService'
import TitleTab from '@/components/TitleTab/TitleTab'
import { alertSuccess } from '@/components/Swal/alert'


export default function page() {
  const router = useRouter()
  const [linkIMG,setLinkIMG] = useState('');

  async function handleCreate(e){
    const formData = {
      "name": e.get('vendorName'),
      "location": e.get('location'),
      "email": e.get('email'),
      "phone": e.get('phone'),
      "link": e.get('link'),
      "logo": linkIMG,
      "isActive": "Ẩn"
    }
    console.log(formData);
    let create = await createVendor(JSON.stringify(formData))
    if (create){
        router.push('/vendor')
    }
  }

  return (
    <div className='p-8 h-[calc(100vh-40px)]'>
      <div style={{minHeight: "87%"}} className='bg-white rounded p-5'>
      <TitleTab text={'Thêm nhà cung cấp'} className={'text-black'}></TitleTab>
      <Form action={handleCreate}>
        <div className='flex flex-col mt-5 border-2 p-4 rounded'>
          <Label name={'Tên nhà cung cấp'}></Label>
          <Input name='vendorName' placeholder={"Nhập tên nhà cung cấp"}></Input>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4'>
          <Label name={'Trụ sở'}></Label>
          <Input name='location' placeholder={"Trụ sở nhà cung cấp"}></Input>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4'>
          <Label name={'Hình ảnh'}></Label>
          <InputUpLoad onChange={setLinkIMG} imgLink = {linkIMG}></InputUpLoad>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4'>
          <Label name={'Địa chỉ email'}></Label>
          <Input name='email' placeholder={"Địa chỉ email nhà cung cấp"}></Input>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4'>
          <Label name={'Số điện thoại'}></Label>
          <Input name='phone' placeholder={"Số điện thoại nhà cung cấp"}></Input>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4 rounded'>
          <Label name={'Địa chỉ website'}></Label>
          <Input name='link' placeholder={'Nhập địa chỉ website nếu có'}></Input>
        </div>
        <Button type='submit' className='mt-4'>Thêm nhà cung cấp</Button>
      </Form>
      </div>
    </div>
  )
}
