'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {updateVendor, getVendor} from '@/services/vendorService'
import TitleTab from '@/components/TitleTab/TitleTab'
import Form,{Input, Button, Label, InputUpLoad}  from '@/components/Form/Form'
import { alertSuccess } from '@/components/Swal/alert'


export default function page({params}) {
    const router = useRouter()
    const [vendor, setVendor] = useState('')
  const [vendorName,setVendorName] = useState('');
  const [location,setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [link, setLink] = useState('');
  const [logo,setLogo] = useState('');

    useEffect(()=>{
        getVendorInfo()
    },[])
    useEffect(()=>{
        if(vendor){
            setVendorName(vendor.name)
            setLocation(vendor.location)
            setEmail(vendor.email)
            setPhone(vendor.phone)
            setLink(vendor.link)
            setLogo(vendor.logo)
        }
    },[vendor])
    async function getVendorInfo() {
        let ven = await getVendor(params.id)
        setVendor(ven)
        console.log(ven)
    }
  const handleUpdate=(e)=>{
    const formData = {
      "name": vendorName,
      "location": location,
      "email": email,
      "phone": phone,
      "link": link,
      "logo": logo
    }
    let update = updateVendor(params.id,JSON.stringify(formData))
    if (update){
        alertSuccess({status: "success", text: "Sửa nhà cung cấp thành công"})
        router.push('/vendor')
    }

  }

  return (
    <div className='p-10'>
      <TitleTab text={'Sửa nhà cung cấp'} className={'text-black'}></TitleTab>
      <Form action={handleUpdate}>
        <div className='flex flex-col mt-5 border-2 p-4 rounded'>
          <Label name={'Tên nhà cung cấp'}></Label>
          <Input name='vendorName' placeholder={"Nhập tên nhà cung cấp"} onChange={setVendorName} value={vendorName}></Input>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4'>
          <Label name={'Trụ sở'}></Label>
          <Input name='location' placeholder={"Trụ sở nhà cung cấp"} onChange={setLocation} value={location}></Input>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4'>
          <Label name={'Hình ảnh'}></Label>
          <InputUpLoad onChange={setLogo} imgLink = {logo} ></InputUpLoad>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4 rounded'>
          <Label name={'Địa chỉ email'}></Label>
          <Input name='standard' placeholder={"Nhập đại chỉ email"} onChange={setEmail} value={email}></Input>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4 rounded'>
          <Label name={'Số điện thoại'}></Label>
          <Input name='standard' placeholder={"Nhập số điện thoại"} onChange={setPhone} value={phone}></Input>
        </div>
        <div className='flex flex-col mt-5 border-2 p-4 rounded'>
          <Label name={'Địa chỉ Website'}></Label>
          <Input name='link' placeholder={'Nhập địa chỉ website'} onChange={setLink} value={link}></Input>
        </div>
        <Button type='submit' className='mt-4'>Sửa nhà cung cấp</Button>
      </Form>
    </div>

  )
}
