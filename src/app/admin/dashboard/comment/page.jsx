// 'use client'
// import React ,{useEffect, useState}from 'react'
// import TitleTab from '@/components/TitleTab/TitleTab'
// import Icon from '@/assets/icon/icon'
// import { confirmDelete, alertSuccess } from '@/components/Swal/alert'
// import ToolTips from '@/components/ToolTips/ToolTips'
// import { getAll, deleteComment } from '@/services/commentService'
// import Pagination from '@/components/Pagination/Pagination'
// import { Avatar } from '@nextui-org/react'
// import Link from 'next/link'


// const moment = require('moment');

// export default function page() {
//   const [arrComment, setArrComment] = useState('')

//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(()=>{
//       getData()
//   },[])
//   async function getData(){
//     let data = await getAll()
//     setArrComment(data.comments)
//     setTotalPages(data.pagination.totalPages);
//     setCurrentPage(data.pagination.currentPage);
//   }

//   const handlePageClick = ({ selected }) => {
//     const newPage = selected + 1;
//     setCurrentPage(newPage);
//   };

//   async function handleDelete (id){
//     let isConfirm = await confirmDelete()
//     if (isConfirm){
//       let rs = await deleteComment(id)
//       if (rs){
//         getData()
//       }
//     }
//   }

//   async function handleRepComment (id){
//   }

//   async function handleChangeSelect(value){
//     if (value === 'all'){
//       getData()
//     } else {
//       let arrComment = await getCommentWithState(JSON.stringify({"state": value}))
//       if (arrComment){
//         setArrComment(arrComment)
//       }
//     }
//   }
//   return (
//     <div className='p-8 h-[calc(100%-40px)]'>
//       <TitleTab text={'Quản lý bình luận'} className={'text-black'}></TitleTab>
//       <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
//         <div className='shadow-md'>
//           <table className="w-full border-collapse font-arial mt-4">
//               <thead>
//                 <tr>
//                   <th className="border text-left p-4">Khách hàng</th>
//                   <th className="border text-left p-4">Nội dung</th>
//                   <th className="border text-left p-4">Sản phẩm</th>
//                   <th className="border text-center p-4">Thời gian</th>
//                   <th className="border text-center p-4">Thao tác</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                 arrComment.length > 0 ? (          
//                   arrComment && arrComment.map((item, index)=>{
//                     return(
//                       <tr key={index}>
//                         <td className="border text-left p-4">
//                           <div className='flex flex-row gap-2 items-center'>
//                             {/* <img src={item.user.avatarURL} alt="" width={50} height={50}/> */}
//                             <Avatar src={item.user.avatarURL} size="lg" isBordered />
//                             <span>{item.user.name}</span>
//                           </div>
//                         </td>
//                         <td className="border text-left p-4">{item.content}</td>
//                         <td className="border text-center p-4">
//                           <div className='flex flex-row gap-2 items-center'>
//                               <img src={item.product.imgURL} alt="" width={50} height={50}/>
//                               <span>{item.product.name}</span>
//                             </div>
//                         </td>
//                         <td className="border text-center p-4">{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
//                         <td className="border text-left p-4">
//                           <div className='flex flex-row gap-3 justify-center'>
//                             <Link href={`comment/detail/${item._id}`}>
//                               <ToolTips
//                                 icon={<Icon name={'detail'} className={'text-sky-500 w-6 h-6'}></Icon>}
//                                 tooltipText={'Xem chi tiết'}
//                               />
//                             </Link>
//                             <ToolTips 
//                               onClick={()=>handleDelete(item._id)}
//                               icon={<Icon name={'delete'} className={'text-red-600 w-6 h-6'}></Icon>}
//                               tooltipText={"Xóa đánh giá"}
//                             />
//                           </div>
//                         </td>
//                       </tr>
//                     )
//                   })
//                 ) : (            
//                   <tr >
//                     <td colSpan="6" className='border text-center p-4'>Không có bình luận</td>
//                   </tr>
//                 )}
//               </tbody> 
//           </table>
//           <div className='px-2 py-5'>
//             <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'
import React, {useEffect, useState} from "react";
import TitleTab from '@/components/TitleTab/TitleTab'
import Table from '@/components/DataTable/Table'
import Icon from "@/assets/icon/icon";
import { confirmDelete } from "@/components/Swal/alert";
import {deleteWarehouseWithProductID} from "@/services/warehouseService"
import { getProductPagination, deleteProduct, searchProductName, updateProduct} from '@/services/productService';
import Link from "next/link";
import SearchDatatable from '@/components/SearchDatatable/SearchDatatable'
import ToolTips from "@/components/ToolTips/ToolTips";
import { alertSuccess } from "@/components/Swal/alert";
import { getCountComment } from "@/services/commentService";

export default function page() {
  const [arrProduct, setArrProduct] = useState('')
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrCount, setArrCount] = useState('')

  useEffect(()=>{
    getData()
    getCountCommentInfo()
  },[currentPage])

  async function getData() {
    try {
      let data = await getProductPagination(currentPage);
      setArrProduct(data.products);
      setTotalPages(data.pagination.totalPages);
      setCurrentPage(data.pagination.currentPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function getCountCommentInfo (){
    let countCmt = await getCountComment(currentPage)
    console.log(countCmt.countCmt);
    setArrCount(countCmt.countCmt)
  }

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  async function handleDelete (id){
    let isConfirm = await confirmDelete()
    if (isConfirm){
        let rs = await deleteProduct(id)
        if (rs){
            let deleteWare = await deleteWarehouseWithProductID(JSON.stringify({"productID": id}))
            if (deleteWare){
                alertSuccess({ status: 'success', text: 'Xóa sản phẩm thành công' })
            }
            getData()
        }
    }

  }
  async function handleSearchProduct(e){
    if (e.key === 'Enter') {
        const searchText = e.target.value;
        let rs = await searchProductName(searchText)
        setArrProduct(rs.products)
    }
  }
  async function handleEmptyInput (e){
    if (e.target.value === ''){
        getData()
    }
  }
  async function handleStatusViewProduct(id, status){
    if(status === 'Hiện'){
        let update = await updateProduct(id, JSON.stringify({"isActive": "Ẩn"}))
        if (update){
            alertSuccess({ status: 'success', text: 'Ẩn sản phẩm thành công' })
            getData()
        }
    } else {
        let update = await updateProduct(id, JSON.stringify({"isActive": "Hiện"}))
        if (update){
            alertSuccess({ status: 'success', text: 'Hiện sản phẩm thành công' })
            getData()
        }
    }
  }
  async function handleStatusBestSalerProduct(id, status){
    if(status === 'Có'){
        let update = await updateProduct(id, JSON.stringify({"isBestSaler": "Không"}))
        if (update){
            alertSuccess({ status: 'success', text: 'Thao tác thành công' })
            getData()
        }
    } else {
        let update = await updateProduct(id, JSON.stringify({"isBestSaler": "Có"}))
        if (update){
            alertSuccess({ status: 'success', text: 'Thao tác thành công' })
            getData()
        }
    }
  }

  let keyImg = "imgURL"
  const columns = [
    { key: 'name', label: 'Tên sản phẩm', text: 'w-1/5 text-left'},
    { key: keyImg, label: 'Hình ảnh', text: 'w-1/5'},
    { key: 'price', label: 'Giá bán', text: 'text-center'},
    { key: 'isActive', label: 'Trạng thái xem', text: 'text-center'},
  ];
  const customActionColumn = {
    label: 'Thao tác',
    render: (item) => (
      <div className='flex flex-row gap-3 justify-center'>
        <Link href={`comment/list-comment/${item._id}`}>
          <div className="hover:text-green-500">Xem bình luận</div>
        </Link>
      </div>
    ),
  };
  const customStateColumn = {
    label: 'Tổng bình luận',
    render: (item, index) => (
      <div className='flex justify-center'>
        <span>{arrCount && JSON.stringify(arrCount[index].totalComments)}</span>
      </div>
    ),
  };
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
      <TitleTab text={'Sản Phẩm'}  className={'text-black'}></TitleTab>
      <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
        <div className='flex justify-end mt-4'>
          <SearchDatatable fnSearch={handleSearchProduct} fnChange={handleEmptyInput}></SearchDatatable>
        </div>
        <div className='mt-4'>
          <div className="shadow-md">
          <Table
            keyImg={keyImg}
            customColumnName2={"Tổng bình luận"}
            columns={columns}
            data={arrProduct}
            customColumnName={"Thao tác"}
            customStateColumn={customStateColumn}
            customActionColumn={customActionColumn}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageClick}
          />
          </div>
        </div>
      </div>
    </div>

  )
}
