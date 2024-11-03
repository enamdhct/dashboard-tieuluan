import React, {useEffect, useState} from 'react'
import {alertSuccess} from '@/components/Swal/alert'
import { createVoucher, getVoucher, updateVoucher } from '@/services/voucherService'

export default function FormVoucher({IsChange, voucherID, close, refreshData, type}) {
    const [voucher, setVoucher] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState(100)
    const [percent, setPercent] = useState(10)
    const [fixed, setFixed] = useState(100)
    const [minimumNumber, setMinimumNumber] = useState(100_000)


    useEffect(()=>{
        getCategoryInfo()
    }, [voucherID])

    async function getCategoryInfo(){
        let voucher = await getVoucher(voucherID)
        console.log({voucher});
        
        setVoucher(voucher)
        setName(voucher.name)
        setNumber(voucher.number)
        setPercent(voucher.percent)
        setFixed(voucher.fixed)
        setMinimumNumber(voucher?.minimumNumber)
    }
    async function handleSave(e){
        const formData = {
            "name": e.get('name'),
            "number": e.get('number'),
            "percent": e.get('percent'),
            "fixed": e.get('fixed'),
            "minimumPrice": e.get('minimumNumber'),
        }
        if (type === 'edit'){
            let update = await updateVoucher(voucherID, JSON.stringify(formData))
            if (update){
                alertSuccess({ status: 'success', text: 'Thêm danh mục thành công' })
                refreshData()
                close()
            }
        } else {
            let create = await createVoucher(JSON.stringify(formData))
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
                                <span>Thông tin voucher</span>
                            </div>
                            <form action={(e)=>handleSave(e)}>
                                <div className='flex flex-col gap-4 mt-3 p-5'>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Tên voucher:</label>
                                        {type === "edit" ? <input type="text" name="name" id="name" className='w-2/3 rounded' value={name} onChange={(e)=>setName(e.target.value)}/> : <input type="text" name="name" id="name" className='w-2/3 rounded'/>}
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Số lượng:</label>
                                        {type === "edit" ? <input type="number" name="number" id="number" className='w-2/3 rounded' value={number} onChange={(e)=>setNumber(e.target.value)}/> : <input type="number" name="number" id="number" className='w-2/3 rounded'/>}
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Phần trăm:</label>
                                        {type === "edit" ? <input type="number" name="percent" id="percent" className='w-2/3 rounded' value={percent} onChange={(e)=>setPercent(e.target.value)}/> : <input type="number" name="percent" id="percent" className='w-2/3 rounded'/>}
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Số tiền:</label>
                                        {type === "edit" ? <input type="number" name="fixed" id="fixed" className='w-2/3 rounded' value={fixed} onChange={(e)=>setFixed(e.target.value)}/> : <input type="number" name="fixed" id="fixed" className='w-2/3 rounded'/>}
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Số tiền tối thiểu:</label>
                                        {type === "edit" ? <input type="number" name="minimumNumber" id="minimumNumber" className='w-2/3 rounded' value={minimumNumber} onChange={(e)=>setMinimumNumber(e.target.value)}/> : <input type="number" name="minimumNumber" id="minimumNumber" className='w-2/3 rounded'/>}
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
