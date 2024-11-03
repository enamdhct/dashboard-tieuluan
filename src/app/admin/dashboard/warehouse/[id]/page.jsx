'use client'
import React, {useEffect, useState} from "react";

import { getWareHouse, searchWareUser, getLog } from "@/services/warehouseService";
import { getUser } from "@/services/userService";
import SearchDatatable from "@/components/SearchDatatable/SearchDatatable";
import TitleTab from "@/components/TitleTab/TitleTab";
import Pagination from "@/components/Pagination/Pagination";
import { Avatar } from "@nextui-org/react";


const moment = require('moment');

export default function page({params}) {
    const [Warehouse, setWarehouse] = useState('')
    const [arrUser, setArrUser] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        getWareHouseData()
    },[currentPage])
    async function getWareHouseData (){
        try {
            let ware = await getLog(JSON.stringify({"warehouseId": params.id}), currentPage)
            setWarehouse(ware)
            setTotalPages(ware.pagination.totalPages);
            setCurrentPage(ware.pagination.currentPage);
            const users = []
              for(let i = 0; i<ware.logs.length;i++){
                  let user = await getUser(ware.logs[i].userID)
                  users.push(user)
              }
              setArrUser(users)

        } catch (error) {
            console.error('Error fetching data:', error);
    }}
    const handlePageClick = ({ selected }) => {
      const newPage = selected + 1;
      setCurrentPage(newPage);
    };
    async function handleSearch(e){
        if (e.key === 'Enter') {
            const searchText = e.target.value;
            const formData = {
                "name": searchText,
                "warehouseID": params.id
            }
            console.log(formData);
            let rs = await searchWareUser(JSON.stringify(formData))
            setWarehouse(rs.warehouse)
        }
      }
    async function handleEmptyInput (e){
        if (e.target.value === ''){
            getWareHouseData()
        }
      }
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
      <TitleTab text={'Lịch sử xuất nhập'} className={"text-black"}></TitleTab>
      <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
        <div className='flex justify-end mt-4'>
          <SearchDatatable fnSearch={handleSearch} fnChange={handleEmptyInput}></SearchDatatable>
        </div>
        <div className="shadow-md">
          <table className="w-full border-collapse font-arial mt-4">
            <thead>
              <tr>
                <th className="border text-left p-3 w-1/5">Sản phẩm</th>
                <th className="border text-left p-3 w-1/5">Nhân viên</th>
                <th className="border text-center p-3 w-1/5">Loại</th>
                <th className="border text-center p-3 w-1/5">Số lượng</th>
                <th className="border text-center p-3 w-1/5">Thời gian</th>
              </tr>
            </thead>
            <tbody>{Warehouse && Warehouse.logs.map((item, index)=>{
                const user = arrUser[index]
                return(
                  <tr key={index}>
                      <td className="border text-left p-2">
                        <div className="flex flex-row items-center gap-3">
                            <img src={Warehouse.product.productIMG} width={50} height={10} alt="" />
                            <span>{Warehouse.product.productName}</span>
                        </div>
                      </td>
                    <td className="border text-center p-2">{
                      user && 
                      <div className="flex flex-row items-center gap-3 ml-2">
                            {/* <img src={user.avatarURL} width={50} height={10} alt="" /> */}
                            <Avatar src={user.avatarURL} size="md" isBordered />
                            <span>{user.name}</span>
                      </div>
                    }</td>
                    <td className="border text-center p-2">{item.type}</td>
                    <td className="border text-center p-2">{item.quantity}</td>
                    <td className="border text-center p-2">{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                  </tr>
                )
              })
              }</tbody>
          </table>
          <div className='py-4 px-2'>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />
          </div>
        </div>
      </div>
    </div>
  )
}
