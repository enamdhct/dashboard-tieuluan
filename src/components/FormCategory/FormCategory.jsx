import React, {useEffect, useState} from 'react'
import { createCategory, updateCategory, getCategory } from '@/services/categoryService'
import {alertSuccess} from '@/components/Swal/alert'

export default function FormCategory({IsChange, categoryID, close, refreshData, type}) {
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')

    useEffect(()=>{
        getCategoryInfo()
    }, [categoryID])

    async function getCategoryInfo(){
        let cate = await getCategory(categoryID)
        setCategory(cate)
        setName(cate.name)
        setDetail(cate.detail)
    }
    async function handleSave(e){
        const formData = {
            "name": e.get('name'),
            "detail": e.get('detail'),
        }
        if (type === 'edit'){
            let update = await updateCategory(categoryID, JSON.stringify(formData))
            if (update){
                alertSuccess({ status: 'success', text: 'Thêm danh mục thành công' })
                refreshData()
                close()
            }
        } else {
            let create = await createCategory(JSON.stringify(formData))
            if (create){
                alertSuccess({ status: 'success', text: 'Thêm danh mục thành công' })
                refreshData()
                close()
            }
        }

    }
    return (
        <div className={IsChange === false ? "hidden" : ""}>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className='font-bold text-xl pt-5 flex justify-center'>
                                <span>Thông tin danh mục</span>
                            </div>
                            <form action={(e)=>handleSave(e)}>
                                <div className='flex flex-col gap-4 mt-3 p-5'>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Tên danh mục:</label>
                                        {type === "edit" ? <input type="text" name="name" id="name" className='w-2/3 rounded' value={name} onChange={(e)=>setName(e.target.value)}/> : <input type="text" name="name" id="name" className='w-2/3 rounded'/>}
                                        
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Chi tiết:</label>
                                        {type === "edit" ? <input type="text" name="detail" id="detail" className='w-2/3 rounded' value={detail} onChange={(e)=>setDetail(e.target.value)}/> : <input type="text" name="detail" id="detail" className='w-2/3 rounded'/>}
                                    </div>
                                </div>
        
                                <div className="bg-gray-50 px-4 py-3 gap-4 flex flex-row sm:flex-row-reverse sm:px-6">
                                    <button type='submit' className='bg-green-400 text-white font-bold p-2 rounded cursor-pointer'>
                                        <span>Lưu</span>
                                    </button>
                                    <div className='bg-slate-200 font-bold p-2 rounded cursor-pointer' onClick={close}>
                                        <span>
                                            Hủy
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
