'use client'
import React, {useState, useEffect} from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Table from '@/components/DataTable/Table'
import { getAllWareHousePaignation, searchWareProductName } from '@/services/warehouseService'
import Icon from '@/assets/icon/icon'
import Link from 'next/link'
import FormWareHouse from '@/components/FormWareHouse/FormWareHouse'
import SearchDatatable from '@/components/SearchDatatable/SearchDatatable'
import Pagination from '@/components/Pagination/Pagination'
import { alertSuccess, confirmDelete } from '@/components/Swal/alert'

export default function page() {
  const [arrWareHouse, setArrWareHouse] = useState('')
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isChangeLocation, setIsChangeLocation] = useState(false)
  const [typeForm, setTypeForm] = useState('')
  const [wareID, setWareID] = useState('')

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(()=>{
    getWareHouse()
  }, [currentPage])
  async function getWareHouse (){
    let arrWare = await getAllWareHousePaignation(currentPage)
    setArrWareHouse(arrWare.warehouses)
    setTotalPages(arrWare.pagination.totalPages);
    setCurrentPage(arrWare.pagination.currentPage);
  }
  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };
  const handleOptionsClick = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };
function handleImportProduct(id){
    setWareID(id)
    setIsChangeLocation(true)
    setTypeForm('Nhập kho')
}
function handleExportProduct(id){
    setWareID(id)
    setIsChangeLocation(true)
    setTypeForm('Xuất kho')

}
function handleCloseModel(){
    setIsChangeLocation(false)
}
async function handleSearchProduct(e){
  if (e.key === 'Enter') {
      const searchText = e.target.value;
      console.log(searchText);
      let rs = await searchWareProductName(searchText)
      setArrWareHouse(rs.products)
  }
}
async function handleEmptyInput (e){
  if (e.target.value === ''){
    getWareHouse()
  }
}
async function handleDeleteProduct(id) {
  let isConfirm = await confirmDelete()
  if (isConfirm){
    alertSuccess({ status: 'success', text: 'Xóa thành công sản phẩm' })
  } else {
    alertSuccess({ status: 'error', text: 'Đã có lỗi xảy ra'})
  }
}
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
      <TitleTab text={'Quản lý kho'} className={"text-black"}></TitleTab>
      <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
        <div className='flex justify-end'>
          <SearchDatatable fnSearch={handleSearchProduct} fnChange={handleEmptyInput}></SearchDatatable>
        </div>
        <div className='shadow-md'>
          <table className="w-full border-collapse font-arial mt-4">
            <thead>
              <tr>
                <th className="border text-left p-3 w-1/6">Mã sản phẩm</th>
                <th className="border text-center p-3 w-1/6">Hình ảnh</th>
                <th className="border text-left p-3 w-1/6">Tên sản phẩm</th>
                <th className="border text-center p-3 w-1/6">Số lượng</th>
                <th className="border text-center p-3 w-1/6">Xem lịch sử</th>
                <th className="border text-center p-3 w-1/6">Thao tác</th>
              </tr>
            </thead>
            <tbody>{arrWareHouse && arrWareHouse.map((item, index)=>{
                return(
                  <tr key={index}>
                    <td className="border text-left p-2">{item.productID}</td>
                    <td className="border flex justify-center p-2">
                      <img src={item.productIMG} alt="" width={50} height={50}/>
                      </td>
                    <td className="border text-left p-2">{item.productName}</td>
                    <td className="border text-center p-2">{item.quantity}</td>
                    <td className="border text-center p-2">
                      <Link href={`warehouse/${item._id}`}>
                        <span>Xem</span>
                      </Link>
                    </td>
                    <td className="border p-2">
                      <div className='flex flex-row gap-3 justify-center'>
                        <button className='bg-green-400 font-bold text-white px-2 rounded' onClick={()=>handleImportProduct(item._id)}>Nhập</button>
                        <button className='bg-yellow-400 font-bold text-white px-2 rounded' onClick={()=>handleExportProduct(item._id)}>Xuất</button>
                        <button className='bg-red-500 font-bold text-white px-2 rounded' onClick={()=>handleDeleteProduct(item._id)}>Xóa</button>
                      </div>
                    </td>
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
      <FormWareHouse close={handleCloseModel} warehouseId={wareID} IsChange={isChangeLocation} type={typeForm} refreshData={getWareHouse}></FormWareHouse>
    </div>
  )
}
