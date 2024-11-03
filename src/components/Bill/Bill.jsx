import React, {useEffect, useState, useRef} from "react";

import { useReactToPrint } from 'react-to-print'
import { getUser } from "@/services/userService";
import { getLocation } from "@/services/locationService";



export default function Bill({isOpen, close, order}) {
    const componentRef = useRef();
    const [userInfo, setUserInfo] = useState('')
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
  
    useEffect(()=>{
        if(order){
            getUserInfo();
        }
    },[order])
    // const getCourseInfo = async() => {
    //     // console.log(course);
    //     let response = await getOneCourse(course);
    //     if (response){
    //         setCourse(response.data)
    //     }
    //     // console.log('hhaha',response.data);
    // }
    async function getUserInfo (){
        let user = await getUser(order.userID)
        setUserInfo(user)
    }
    function formatDate() {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();

        var formattedDate = "Ngày " + day + ", tháng " + month + ", năm " + year;
        return formattedDate

    }
    console.log(order);
  return (
    
    <div className={isOpen === false ? "hidden" : ""}>
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative w-1/2 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className='text-lg pt-5 flex flex-col justify-center'>
                            <div className="body-modal-container flex justify-center p-4">
                                <div ref={componentRef} className="border border-slate-300 rounded p-4 w-full">
                                    <div>
                                        <h2 className="text-center text-xl font-bold mb-4">HÓA ĐƠN BÁN HÀNG</h2>
                                        <div className="flex w-full flex-col gap-1 items-end">
                                            <div>
                                                <span>Ký hiệu: </span><span className="text-red-500">1C21TAA</span>
                                            </div>
                                            <div>
                                                <span>Mã số: </span><span>00001</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mb-2">
                                            <span>{formatDate()}</span>
                                        </div>
                                    </div>
                                    <hr className="mb-4" />
                                    <div className="info-center mb-4">
                                        <h3 className="text-lg font-bold">Thông tin bên bán</h3>
                                        <p className="mb-1"><label className="font-bold">Mã số thuế:</label> 1234567890</p>
                                        <p className="mb-1"><label className="font-bold">Địa chỉ:</label> Bình Minh, Vĩnh Long</p>
                                        <p className="mb-1"><label className="font-bold">Số điện thoại:</label> 0123456789</p>
                                        <p className="mb-1"><label className="font-bold">Email:</label> argishop@gmail.com</p>
                                    </div>
                                    <hr className="mb-4" />
                                    <div className="info-student mb-4">
                                        <h3 className="text-lg font-bold">Thông tin bên mua</h3>
                                        <p className="mb-1"><label className="font-bold">Họ và tên:</label> {userInfo.name}</p>
                                        <p className="mb-1"><label className="font-bold">Địa chỉ:</label> {userInfo.location}</p>
                                        <p className="mb-1"><label className="font-bold">Số điện thoại:</label> {userInfo.phone}</p>
                                        <p className="mb-1"><label className="font-bold">Email:</label> {userInfo.email}</p>
                                        <div>
                                            <p className="mb-1"><label className="font-bold">Hình thức thanh toán:</label> Chuyển khoản</p> 
                                            <p className="mb-1"><label className="font-bold">Đồng tiền thanh toán:</label> VNĐ</p>
                                        </div>
                                        <p className="mb-1"><label className="font-bold">Mã đơn hàng:</label> {order._id}</p>
                                    </div>
                                    <div className="table w-full">
                                        <table className="w-full border-collapse mb-4">
                                            <thead>
                                                <tr>
                                                    <th className="border text-left p-2">STT</th>
                                                    <th className="border text-left p-2">Tên sản phẩm</th>
                                                    <th className="border text-center p-2">Số lượng</th>
                                                    <th className="border text-center p-2">Đơn giá</th>
                                                    <th className="border text-center p-2">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.product && order.product.map((item, index)=>{
                                                    return (
                                                        <tr key={index}>
                                                            <td className="border text-left p-4">{index}</td>
                                                            <td className="border text-left p-4">{item.name}</td>
                                                            <td className="border text-center p-4">{item.quantity}</td>
                                                            <td className="border text-center p-4">{item.price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</td>
                                                            <td className="border text-center p-4">{item.totalPrice.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <hr className="mb-4" />
                                    <div className="mb-20">
                                        <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="mb-1">Người mua hàng</p>
                                            <p className="mb-1">(Kí tên ghi rõ họ tên)</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="mb-1">Người bán hàng</p>
                                            <p className="mb-1">(Kí tên ghi rõ họ tên)</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 p-4">
                                <button onClick={()=> handlePrint()} className="px-2 py-2 font-bold text-lg text-white bg-green-400 rounded">In hóa đơn</button>
                                <button onClick={() => close()} className="px-2 py-2 font-bold text-lg border border-green-400 rounded">Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}