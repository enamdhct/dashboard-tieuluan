'use client'
import React, { useEffect, useState } from 'react'
import { getUser } from '@/services/userService'
import TitleTab from '@/components/TitleTab/TitleTab'
import {Avatar} from "@nextui-org/react";
import { getUserOrder } from '@/services/orderService';
import Table from '@/components/DataTable/Table';

const moment = require('moment');

export default function page({params}) {
    const [user, setUser] = useState('')
    const [orders, setOrders] = useState('')
    const [personInfo, setPersonInfo] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        getUserInfo()
        getOrder()
    }, [params])

    async function getUserInfo(){
        let user = await getUser(params.id)
        if (user.person){
            setPersonInfo(user.person)
        }
        setUser(user)
    }
    async function getOrder (){
        let orders = await getUserOrder(JSON.stringify({"userID": params.id}))
        console.log(orders.orders);
        setOrders(orders.orders)
        setTotalPages(orders.pagination.totalPages);
        setCurrentPage(orders.pagination.currentPage);
    }
    const handlePageClick = ({ selected }) => {
        const newPage = selected + 1;
        setCurrentPage(newPage);
      };
    const columns = [
    { key: '_id', label: 'Mã đơn hàng' },
    { key: 'state', label: 'Trạng thái', text: 'text-center' },
    { key: 'Price', label: 'Tổng tiền', text: 'text-center'},
    { key: 'paymentMethod', label: 'Thanh toán', text: 'text-center'},
    ];
    const customActionColumn = {
        label: 'Thời gian',
        render: (item) => (
            <div className='text-center'>{moment(item.orderTime).format("DD/MM/YYYY HH:mm:ss")}</div>
        ),
      };
  return (
    <div className='p-8'>
        <TitleTab text={'Thông tin nhân viên'} className={"text-black"}></TitleTab>
        <div className='border'>
            <div className='bg-white rounded py-12 text-lg flex flex-col w-full gap-5'>
                <div className='w-full'>
                    <div className='flex flex-row gap-3 mt-3'>
                        <div className='w-1/4 flex justify-center items-center'>
                            <Avatar src={user.avatarURL} className="w-28 h-28 text-large" isBordered />
                        </div>
                        <div className='w-3/4 flex flex-col gap-3'>
                            <div>
                                <h1 className='font-bold text-2xl'>{user.name}</h1>
                            </div>
                            <div className='flex flex-row gap-3'>
                                <div className='w-1/3 flex gap-2 flex-col'>
                                    <div className='flex flex-row gap-2'>
                                        <label htmlFor="" className='text-slate-500 w-1/4'>Mã KH: </label>
                                        <span className='w-3/4'>{user._id}</span>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <label htmlFor="" className='text-slate-500 w-1/4'>Giới tính: </label>
                                        <span className='w-3/4'>{user.gender}</span>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <label htmlFor="" className='text-slate-500  w-1/4'>Email: </label>
                                        <span className=' w-3/4'>{user.email}</span>
                                    </div>
                                </div>
                                <div className='w-1/3 flex gap-2 flex-col'>
                                    <div className='flex flex-row gap-2'>
                                        <label htmlFor="" className='text-slate-500  w-1/2'>Quên quán: </label>
                                        <span className='w-1/2'>{user.location}</span>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <label htmlFor="" className='text-slate-500  w-1/2'>Số điện thoại: </label>
                                        <span className='w-1/2'>{user.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='font-bold text-xl text-green-500 ml-8'>Thông tin cá nhân</h1>
                <hr className='mx-8'/>
                <div className='w-full m-8'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-row gap-5'>
                            <div className='flex flex-col gap-5 w-1/3'>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>CCCD: </label>
                                    <span className='w-3/4'>{personInfo.cccd}</span>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>Hôn nhân: </label>
                                    <span className='w-3/4'>{personInfo.marriage}</span>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>Số tài khoản: </label>
                                    <span className='w-3/4'>{personInfo.stk}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5 w-1/3'>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>Ngày cấp: </label>
                                    <span className='w-3/4'>{personInfo.cccdDate}</span>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>Dân tộc: </label>
                                    <span className='w-3/4'>{personInfo.nation}</span>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>Chủ thẻ: </label>
                                    <span className='w-3/4'>{personInfo.personSTK}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5 w-1/3'>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>Nơi cấp: </label>
                                    <span className='w-3/4'>{personInfo.cccdPlace}</span>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>Tôn giáo: </label>
                                    <span className='w-3/4'>{personInfo.religion}</span>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <label htmlFor="" className='text-slate-500 w-1/4'>Ngân hàng: </label>
                                    <span className='w-3/4'>{personInfo.bank}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <h1 className='font-bold text-xl text-green-500 ml-8'>Đơn hàng</h1>
                <hr className='mx-8'/>
                <div className='mt-4 p-8'>
                    <div>
                        <Table
                        customColumnName={"Thời gian"}
                        customActionColumn={customActionColumn}
                        columns={columns}
                        data={orders}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageClick}
                        />
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}
