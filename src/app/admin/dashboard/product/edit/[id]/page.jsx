'use client'
import React, { useEffect, useState } from 'react'
import {createProduct, updateProduct, getProduct} from '@/services/productService'
import TitleTab from '@/components/TitleTab/TitleTab'
import Form,{Input, Quill, Button, Label, InputUpLoad, Select}  from '@/components/Form/Form'
import { getAllCategory } from '@/services/categoryService'
import { getAllVendor } from '@/services/vendorService'
import { useRouter } from 'next/navigation'
import { alertSuccess } from '@/components/Swal/alert'
import Link from 'next/link'



export default function page({params}) {
  const router = useRouter()
    const [product, setProduct] = useState('')
  const [productName,setProductName] = useState('');
  const [price,setPrice] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [vendorID, setVendorID] = useState('');
  const [component, setComponent] = useState('');
  const [standard, setStandard] = useState('');
  const [guarantee, setGuarantee] = useState('');
  const [description, setDescription] = useState('');
  const [userGuide, setUserGuide] = useState('');
  const [linkIMG,setLinkIMG] = useState('');
  const [arrCategory, setCategory] = useState('');
  const [arrVendor, setVendor] = useState('');
  const [specialTreatment, setSpecialTreatment] = useState('')
  const [core,setCore] = useState('');
  const [flow,setFlow] = useState('');
  const [memory,setMemory] = useState('');
  const [source,setSource] = useState('');
  const [dimesion,setDimesion] = useState('');
  const [speed,setSpeed] = useState('');
  const [graphicsChip,setGraphicsChip] = useState('');
  const [genergation,setGenergation] = useState('');
  const [bus,setBus] = useState('');
  const [read,setRead] = useState('');
  const [write,setWrite] = useState('');
  const [capacity,setCapacity] = useState('');
  const [connect,setConnect] = useState('');
  const [demand, setDemand] = useState('')

  const [isChangeLocation, setIsChangeLocation] = useState(false)

    useEffect(()=>{
        getPro()
        getCategoryName()
        getVendor()
    },[])
    useEffect(()=>{
        if(product){
            setProductName(product.name)
            setPrice(product.price)
            setCategoryID(product.categoryID)
            setVendorID(product.vendorID)
            setComponent(product.component)
            setStandard(product.standard)
            setDescription(product.description)
            setUserGuide(product.userGuide)
            setLinkIMG(product.imgURL)
            setSpecialTreatment(product.specialTreatment)
            setGuarantee(product.guarantee)
            setDemand(product.demand)
        }
        if (product.productDetail) {
          setCore(product.productDetail.core)
          setFlow(product.productDetail.flow)
          setMemory(product.productDetail.memory)
          setSource(product.productDetail.source)
          setDimesion(product.productDetail.dimension)
          setSpeed(product.productDetail.speed)
          setGraphicsChip(product.productDetail.graphicsChip)
          setGenergation(product.productDetail.genergation)
          setBus(product.productDetail.bus)
          setRead(product.productDetail.read)
          setWrite(product.productDetail.write)
          setCapacity(product.productDetail.capacity)
          setConnect(product.productDetail.connect)
        }
    },[product])
    async function getPro() {
        let prod = await getProduct(params.id)
        setProduct(prod)
        console.log("hahah",prod)
    }
  const handleUpdate=(e)=>{
    // e.preventDefault();
    const formData = {
      "name": productName,
      "price": price,
      "description": description,
      "demand": demand,
      // "user": userGuide,
      "categoryID": categoryID,
      "guarantee":  guarantee,
      "vendorID": vendorID,
      // "component": component,
      // 'standard': standard,
      "imgURL": linkIMG,
      "specialTreatment": specialTreatment,
      "productDetail": {
        "core": core,
        "flow": flow,
        "memory": memory,
        "source": source,
        "dimension": dimesion,
        "speed": speed,
        "graphicsChip": graphicsChip,
        "genergation": genergation,
        "bus": bus,
        "read": read,
        "write": write,
        "capacity": capacity,
        "connect": connect
      }

    }
    let update = updateProduct(params.id,JSON.stringify(formData))
    if (update){
      alertSuccess({ status: 'success', text: 'Sửa sản phẩm thành công' })
      router.push('../../product')
    } else {
      alertSuccess({ status: 'error', text: 'Sửa sản phẩm thành công' })
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
  function handleCloseModel(){
    setIsChangeLocation(false)
}
  return (
    <div className='p-10'>
      <TitleTab text={'Sửa sản phẩm'} className={'text-black'}></TitleTab>

      <div className='bg-white p-4'>
        <Form action={handleUpdate}>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Tên sản phẩm'}></Label>
            <Input name='productName' placeholder={"Nhập tên sản phẩm"} onChange={setProductName} value={productName}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4'>
            <Label name={'Giá bán'}></Label>
            <Input name='price' placeholder={"Giá bán sản phẩm"} onChange={setPrice} value={price}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4'>
            <Label name={'Hình ảnh'}></Label>
            <InputUpLoad onChange={setLinkIMG} imgLink = {linkIMG} ></InputUpLoad>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Mã danh mục'}></Label>
            {/* <Input name='categoryID' placeholder={"Nhập mã danh mục"} onChange={setCategoryID} value={categoryID}></Input> */}
            <Select category={arrCategory} name='categoryID' onChange={setCategoryID} value={categoryID}></Select>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Mã nhà sản xuất'}></Label>
            <Select category={arrVendor} name='vendorID' onChange={setVendorID} value={vendorID}></Select>
            {/* <Input name='vendorID' placeholder={"Nhập mã nhà sản xuất"} onChange={setVendorID} value={vendorID}></Input> */}
          </div>
          <div className='mt-5 min-h-full border-2 p-4 rounded'>
            <Label name={'Giới thiệu sản phẩm'}></Label>
            <Quill classname="" value={description} onChange={setDescription}></Quill>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4'>
            <Label name={'Bảo hành'}></Label>
            <Input name='guarantee' placeholder={"Thời gian bảo hành"} onChange={setGuarantee} value={guarantee}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4'>
            <Label name={'Nhu cầu'}></Label>
            <Input name='demand' placeholder={"Nhu cầu sử dụng"} onChange={setDemand} value={demand}></Input>
          </div>
          <div className='mt-5 border-2 p-4 rounded'>
            <Label name={'Tính năng tác dụng'}></Label>
            <Quill classname="" value={specialTreatment} onChange={setSpecialTreatment}></Quill>
          </div>
          {/* <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Thành phần'}></Label>
            <Input name='component' placeholder={'Nhập thành phần'} onChange={setComponent} value={component}></Input>
          </div> */}
          {/* <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Chuẩn đóng gói'}></Label>
            <Input name='standard' placeholder={"Nhập chuẩn đóng gói"} onChange={setStandard} value={standard}></Input>
          </div> */}
          {/* <div className='mt-5 border-2 p-4 rounded'>
            <Label name={'Hướng dẫn sử dụng'}></Label>
            <Quill classname="" value={userGuide} onChange={setUserGuide}></Quill>
          </div> */}
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Core'}></Label>
            <Input name='core' placeholder={"Nhập Core của sản phẩm"} onChange={setCore} value={core}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Số luồng'}></Label>
            <Input name='flow' placeholder={"Nhập số luồng sản phẩm"} onChange={setFlow} value={flow}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Bộ nhớ'}></Label>
            <Input name='memory' placeholder={"Nhập bộ nhớ sản phẩm"} onChange={setMemory} value={memory}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Nguồn'}></Label>
            <Input name='source' placeholder={"Nhập nguồn sản phẩm"} onChange={setSource} value={source}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Kích thước'}></Label>
            <Input name='dimension' placeholder={"Nhập kích thước sản phẩm"} onChange={setDimesion} value={dimesion}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Tốc độ'}></Label>
            <Input name='speed' placeholder={"Nhập tốc độ sản phẩm"} onChange={setSpeed} value={speed}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Vi xử lý'}></Label>
            <Input name='graphicsChip' placeholder={"Nhập vi xữ lý sản phẩm"} onChange={setGraphicsChip} value={graphicsChip}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Thế hệ'}></Label>
            <Input name='genergation' placeholder={"Nhập thế hệ sản phẩm"} onChange={setGenergation} value={genergation}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Bus'}></Label>
            <Input name='bus' placeholder={"Nhập bus sản phẩm"} onChange={setBus} value={bus}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Tốc độ đọc'}></Label>
            <Input name='read' placeholder={"Nhập tốc độ đọc sản phẩm"} onChange={setRead} value={read}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Tốc độ ghi'}></Label>
            <Input name='write' placeholder={"Nhập tốc độ ghi sản phẩm"} onChange={setWrite} value={write}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Dung tích'}></Label>
            <Input name='capacity' placeholder={"Nhập dung tích sản phẩm"} onChange={setCapacity} value={capacity}></Input>
          </div>
          <div className='flex flex-col mt-5 border-2 p-4 rounded'>
            <Label name={'Kết nối'}></Label>
            <Input name='connect' placeholder={"Nhập kết nối sản phẩm"} ></Input>
          </div>
          <Button type='submit' className='mt-4'>Sửa sản phẩm</Button>
        </Form>
      </div>

    </div>

  )
}
