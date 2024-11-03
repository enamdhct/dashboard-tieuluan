import React, {useEffect, useState} from 'react'
import {exportProductWareHouse, importProductWareHouse} from '@/services/warehouseService'
import {alertSuccess} from '@/components/Swal/alert'
import { getUser } from '@/services/userService'

export default function FormWareHouse({IsChange, close, type, refreshData, warehouseId}) {
    async function handleSave(e){
        let user = await getUser("65046e1d40ee336989d6e5bf")
        console.log(user);
        const formData = {
            "userID": "65046e1d40ee336989d6e5bf",
            "quantity": e.get('quantity'),
            "type": type,
            "note": e.get('note'),
            "warehouseId": warehouseId,
            "user": {
                "name": user.name,
                "avt": user.avatarURL
            }
        }
        if (type === 'Nhập kho'){
            let importRS = await importProductWareHouse(JSON.stringify(formData))
            console.log(importRS);
            if (importRS){
                alertSuccess({status: "success", text: "Nhập kho thành công"})
            }
        } else {
            let exportRS = await exportProductWareHouse(JSON.stringify(formData))
            console.log(exportRS);
            if(exportRS){
                alertSuccess({status: "success", text: "Xuất kho thành công"})
            }
        }
        refreshData()
        close()
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
                                {type === 'import' ? <span>Thông tin nhập kho</span> : <span>Thông tin xuất kho</span>}
                            </div>
                            <form action={(e)=>handleSave(e)}>
                                <div className='flex flex-col gap-4 mt-3 p-5'>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Số lượng hàng:</label>
                                        <input type="number" name="quantity" id="quantity" className='w-2/3 rounded'/>
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <label htmlFor="" className='w-1/3'>Ghi chú:</label>
                                        <input type="text" name="note" id="note" className='w-2/3 rounded'/>
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
