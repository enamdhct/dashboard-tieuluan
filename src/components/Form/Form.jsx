'use client'
// import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState} from 'react'
import {ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from 'uuid';
import {storage} from './config'

export function InputUpLoad({onChange, imgLink}) {
  const handleImageDelete = () => {
    if (imgLink === null) return;
    const parts = imgLink.split('/images%2F');
    const imgName = parts[1].split('?');
    const imgRef = ref(storage, `images/${imgName[0]}`);
    deleteObject(imgRef)
    .then(() => {
      onChange(null);
      let up = document.querySelector('#Upload')
      // console.log(up.value)
      up.value = ''
    })
    .catch((error) => {
        console.error("Lỗi khi xóa hình ảnh:", error);
    });
  }
 
  const handleImageUpload = (e) => {
    if(e.target.files[0] == null) return;
    const imgRef = ref(storage, `images/${e.target.files[0].name}`)
    console.log(imgRef)
    uploadBytes(imgRef, e.target.files[0]).then( async ()=>{
      const downloadURL = await getDownloadURL(imgRef);
      onChange(downloadURL)
    })
  }
  return (
    <div className='flex flex-col mt-4'>
        <input type="file" id='Upload' accept="image/*" onChange={(e)=>{handleImageUpload(e)}}/>
        {
          imgLink && (
            <div className="mt-4 flex flex-row gap-4 justify-center">
              <img src={imgLink} alt="" width={300} height={300}/>
              <div onClick={() => handleImageDelete()}>X</div>
            </div>
          )
        }
    </div>
  )
}
export function Quill({value, onChange}) {
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      ['blockquote', 'code-block'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }], 
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'direction': 'rtl' }], 
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean'],
    ],
  };
  return <ReactQuill theme="snow" value={value} onChange={onChange} className='bg-white h-50 mt-4 rounded' modules={modules}/>;
}

export function Label({name, className}){
  return <span className={className + "text-lg font-medium underline"}>{name}</span>
}

export function Input({name, placeholder, value, onChange}){
  return onChange ? <input className='h-10 mt-2 border rounded p-2 focus:outline-none' name={name} placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)}/>: <input className='h-10 mt-2 border rounded p-2 focus:outline-none' name={name} placeholder={placeholder}/>
}

export function Button({type, className, children}){
    return <button type={type} className={className + " bg-sky-500 p-2 text-white font-bold rounded"}>{children}</button>
}

export function Select({category, name, value, onChange}){
  
  return (
    onChange ?     
    <select name={name} value={value} onChange={(e)=>onChange(e.target.value)}>
    {
      category.length > 0 && category.filter((item)=> item.name !== "Tất cả").map((item, index)=>
        // console.log(item);
        <option key={index} value={item._id}>{item.name}</option>
      )
    }
    </select>:
    <select name={name} className='mt-4'>
      {
        category.length > 0 && category.filter((item)=> item.name !== "Tất cả").map((item, index)=>
          // console.log(item);
          <option key={index} value={item._id}>{item.name}</option>
        )
      }
    </select>
  )
}

export default function Form({action,className,children}) {
  return (
    <form action={(e)=>action(e)} className={className + ""}>
        {children}
    </form>
  )
}


