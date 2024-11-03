'use client'
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Form,{Input, Quill, Button, Label, InputUpLoad, Select}  from '@/components/Form/Form'
import {createProduct} from '@/services/productService'
import { getAllCategory } from '@/services/categoryService'
import { getAllVendor } from '@/services/vendorService'
import { createWareHouse } from '@/services/warehouseService'
import TitleTab from '@/components/TitleTab/TitleTab'
import { alertSuccess } from '@/components/Swal/alert'


export default function page() {
  const router = useRouter()
  const [description,setDescription] = useState();
  const [userGuide,setUserGuide] = useState();
  const [specialTreatment,setSpecialTreatment] = useState();
  const [linkIMG,setLinkIMG] = useState('');
  const [arrCategory, setCategory] = useState('');
  const [arrVendor, setVendor] = useState('');
  // const [core,setCore] = useState('');
  // const [flow,setFlow] = useState('');
  // const [memory,setMemory] = useState('');
  // const [source,setSource] = useState('');
  // const [dimesion,setDimesion] = useState('');
  // const [speed,setSpeed] = useState('');
  // const [graphicsChip,setGraphicsChip] = useState('');
  // const [genergation,setGenergation] = useState('');
  // const [bus,setBus] = useState('');
  // const [read,setRead] = useState('');
  // const [write,setWrite] = useState('');
  // const [capacity,setCapacity] = useState('');
  // const [connect,setConnect] = useState('');

  useEffect(()=>{
    getCategoryName()
    getVendor()
  },[])

  async function handleCreate(e){
    const formData = {
      "name": e.get('productName'),
      "price": e.get('price'),
      "categoryID": e.get('categoryID'),
      "vendorID": e.get('vendorID'),
      "demand": e.get('demand'),
      // "standard": e.get('Standard'),
      // "component": e.get('component'),
      "description": description,
      // "userGuide": userGuide,
      "imgURL": linkIMG,
      "specialTreatment": specialTreatment,
      "isBestSaler": "Không",
      "guarantee": e.get('guarantee'),
      "isActive": "Ẩn",
      "productDetail": {
        "core": e.get('core'),
        "flow": e.get("flow"),
        "memory": e.get("memory"),
        "source": e.get("source"),
        "dimension": e.get("dimension"),
        "speed": e.get("speed"),
        "graphicsChip": e.get("graphicsChip"),
        "genergation": e.get("genergation"),
        "bus": e.get("bus"),
        "read": e.get("read"),
        "write": e.get("write"),
        "capacity": e.get("capacity"),
        "connect": e.get("connect")
      }
    }
    // console.log(arrCategory);
    let create = await createProduct(JSON.stringify(formData))
    if (create){
      const formWareHouse = {
        "productID": create._id,
        "productName": e.get('productName'),
        "productIMG": linkIMG,
        "quantity": 0
      }
      let createWare = await createWareHouse(JSON.stringify(formWareHouse))
      if (createWare){
        alertSuccess({ status: 'success', text: 'Thêm sản phẩm thành công' })
        router.push('../product')
      } else {
        alertSuccess({ status: 'error', text: 'Thêm sản phẩm thất bại' })
      }
    }
  }
  async function getCategoryName(){
    let arr = await getAllCategory()
    setCategory(arr)
    console.log(arr)
  }
  async function getVendor(){
    let arr = await getAllVendor();
    setVendor(arr.vendors)
    console.log(arr)
  }
  
  return (
    <div className='p-10'>
      <TitleTab text={'Thêm sản phẩm'} className={'text-black'}></TitleTab>
      <div className='bg-white p-4'>
        <Form action={handleCreate}>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Tên sản phẩm'}></Label>
            <Input name='productName' placeholder={"Nhập tên sản phẩm"}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4'>
            <Label name={'Giá bán'}></Label>
            <Input name='price' placeholder={"Giá bán sản phẩm"}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4'>
            <Label name={'Bảo hành'}></Label>
            <Input name='guarantee' placeholder={"Thời gian bảo hành"}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4'>
            <Label name={'Nhu cầu'}></Label>
            <Input name='demand' placeholder={"Đáp ứng cho nhu cầu"}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4'>
            <Label name={'Hình ảnh'}></Label>
            <InputUpLoad onChange={setLinkIMG} imgLink = {linkIMG}></InputUpLoad>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Mã danh mục'}></Label>
            <Select name='categoryID' category={arrCategory}></Select>

          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Mã nhà sản xuất'}></Label>
            <Select name='vendorID' category={arrVendor}></Select>
          </div>
          <div className='mt-5 min-h-full border-2 p-4 rounded'>
            <Label name={'Giới thiệu sản phẩm'}></Label>
            <Quill classname="" value={description} onChange={setDescription}></Quill>
          </div>
          {/* <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Thành phần'}></Label>
            <Input name='component' placeholder={'Nhập thành phần'}></Input>
          </div> */}
          {/* <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Chuẩn đóng gói'}></Label>
            <Input name='Standard' placeholder={"Nhập chuẩn đóng gói"}></Input>
          </div> */}
          <div className='mt-5 border-2 p-4 rounded'>
            <Label name={'Tính năng tác dụng'}></Label>
            <Quill classname="" value={specialTreatment} onChange={setSpecialTreatment}></Quill>
          </div>
          {/* <div className='mt-5 border-2 p-4 rounded'>
            <Label name={'Hướng dẫn sử dụng'}></Label>
            <Quill classname="" value={userGuide} onChange={setUserGuide}></Quill>
          </div> */}
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Core'}></Label>
            <Input name='core' placeholder={"Nhập Core của sản phẩm"}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Số luồng'}></Label>
            <Input name='flow' placeholder={"Nhập số luồng sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Bộ nhớ'}></Label>
            <Input name='memory' placeholder={"Nhập bộ nhớ sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Nguồn'}></Label>
            <Input name='source' placeholder={"Nhập nguồn sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Kích thước'}></Label>
            <Input name='dimension' placeholder={"Nhập kích thước sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Tốc độ'}></Label>
            <Input name='speed' placeholder={"Nhập tốc độ sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Vi xử lý'}></Label>
            <Input name='graphicsChip' placeholder={"Nhập vi xữ lý sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Thế hệ'}></Label>
            <Input name='genergation' placeholder={"Nhập thế hệ sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Bus'}></Label>
            <Input name='bus' placeholder={"Nhập bus sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Tốc độ đọc'}></Label>
            <Input name='read' placeholder={"Nhập tốc độ đọc sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Tốc độ ghi'}></Label>
            <Input name='write' placeholder={"Nhập tốc độ ghi sản phẩm"}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Dung tích'}></Label>
            <Input name='capacity' placeholder={"Nhập dung tích sản phẩm"} ></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Kết nối'}></Label>
            <Input name='connect' placeholder={"Nhập kết nối sản phẩm"} ></Input>
          </div>
          <Button type='submit' className='mt-4'>Thêm sản phẩm</Button>
        </Form>
      </div>
    </div>
  )
}
