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

export default function page() {
  const [arrProduct, setArrProduct] = useState('')
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    getData()
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
    { key: '_id', label: 'Mã sản phẩm' },
    { key: 'name', label: 'Tên sản phẩm' },
    { key: keyImg, label: 'Hình ảnh' },
    { key: 'price', label: 'Giá bán', text: 'text-center'},
    { key: 'isActive', label: 'Trạng thái xem', text: 'text-center'},
    { key: 'isBestSaler', label: 'SP Nổi bật', text: 'text-center'},
  ];
  const customActionColumn = {
    label: 'Thao tác',
    render: (item) => (
      <div className='flex flex-row gap-3 justify-center'>
        {
            item.isActive === 'Hiện' ? 
            <ToolTips        
            onClick={() => handleStatusViewProduct(item._id, 'Hiện')}
            icon={<Icon name={'eyeOff'} className={'text-sky-600 w-6 h-6'} />}
            tooltipText={'Ẩn sản phẩm'}
            ></ToolTips>
            :             
            <ToolTips        
            onClick={() => handleStatusViewProduct(item._id, 'Ẩn')}
            icon={<Icon name={'eyeOn'} className={'text-sky-600 w-6 h-6'} />}
            tooltipText={'Hiện sản phẩm'}
            ></ToolTips>
        }
        {
            item.isBestSaler === 'Có' ?
            <ToolTips
            onClick={() => handleStatusBestSalerProduct(item._id, item.isBestSaler)}
            icon={<Icon name={'bestSaler'} className={'text-green-500 w-6 h-6'}></Icon>}
            tooltipText={'Bỏ làm sản phẩm nổi bật'} />
            :         
            <ToolTips
            onClick={() => handleStatusBestSalerProduct(item._id, item.isBestSaler)}
            icon={<Icon name={'bestSaler'} className={'text-slate-300 w-6 h-6'}></Icon>}
            tooltipText={'Đặt làm sản phẩm nổi bật'}
            />
        
        }

        <Link href={`product/edit/${item._id}`}>
            <ToolTips
            icon={<Icon name={'edit'} className={'text-yellow-400 w-6 h-6'}></Icon>}
            tooltipText={'Sửa sản phẩm'}
            />
        </Link>
        <ToolTips 
            onClick={() => handleDelete(item._id)}
            icon={<Icon name={'delete'} className={'text-red-600 w-6 h-6'}></Icon>}
            tooltipText={'Xóa sản phẩm'}
        />
      </div>
    ),
  };
  return (
    <div className='p-8 h-[calc(100vh-40px)]'>
      <TitleTab text={'Sản Phẩm'}  className={'text-black'}></TitleTab>
      <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
        <div className='flex justify-between mt-4'>
          <SearchDatatable fnSearch={handleSearchProduct} fnChange={handleEmptyInput}></SearchDatatable>
          <Link href={'product/create'}>
            <button className="p-2 bg-sky-500 text-white rounded">Thêm sản phẩm</button>
          </Link>
        </div>
        <div className='mt-4'>
          <div className="shadow-md">
          <Table
            keyImg={keyImg}
            columns={columns}
            data={arrProduct}
            customColumnName={"Thao tác"}
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
