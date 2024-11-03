'use client'
import React, {useState, useEffect} from "react";
import TitleTab from '@/components/TitleTab/TitleTab'
import Table from '@/components/DataTable/Table'
import Link from "next/link";
import { getAll, deleteCategory, updateCategory } from "@/services/categoryService";
import Icon from "@/assets/icon/icon";
import FormCategory from "@/components/FormCategory/FormCategory";
import ToolTips from "@/components/ToolTips/ToolTips";
import { alertSuccess, confirmDelete } from "@/components/Swal/alert";
import { updateStateProduct } from "@/services/productService";


export default function page() {
  const [categorys, setCategory] = useState('')
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeForm, setTypeForm] = useState('')
  const [isClickAction, setIsClickAction] = useState(false)
  const [categoryID, setCategoryID] = useState('')

  useEffect(()=>{
    getCategory()
  },[])

  async function getCategory(){
    let category = await getAll(currentPage)
    setCategory(category.categorys)
    setTotalPages(category.pagination.totalPages);
    setCurrentPage(category.pagination.currentPage);
  }
  function handleCloseModel(){
    setIsClickAction(false)
  }
  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };
  async function handleDelete (id){
    let isConfirm = await confirmDelete()
    if (isConfirm){
      let del = await deleteCategory(id)
      if (del){
        alertSuccess({ status: 'success', text: 'Xóa danh mục thành công' })
        getCategory()
      }
    }
  }
  function handleCreate (){
    setIsClickAction(true)
    setTypeForm('add')
  }
  function handleEdit (id){
    setCategoryID(id)
    setIsClickAction(true)
    setTypeForm('edit')
  }
  async function handleStatusViewCategory(id, status){
    if(status === 'Hiện'){
        let update = await updateCategory(id, JSON.stringify({"isActive": "Ẩn"}))
        let changeState = await updateStateProduct(JSON.stringify({"categoryID": id,"isActive": "Ẩn"}))
        if (update){
            alertSuccess({ status: 'success', text: 'Ẩn danh mục thành công' })
            getCategory()
        }
    } else {
        let update = await updateCategory(id, JSON.stringify({"isActive": "Hiện"}))
        let changeState = await updateStateProduct(JSON.stringify({"categoryID": id,"isActive": "Hiện"}))
        if (update){
            alertSuccess({ status: 'success', text: 'Hiện danh mục thành công' })
            getCategory()
        }
    }
  }
  const columns = [
    { key: '_id', label: 'Mã danh mục', text: 'text-center' },
    { key: 'name', label: 'Tên danh mục', text: 'text-center'},
    { key: 'detail', label: 'Chi tiết', text: 'text-center'},
  ];
  const customActionColumn = {
    label: 'Thao tác',
    render: (item) => (
      <div className='flex flex-row gap-3 justify-center'>
        {
            item.isActive === 'Hiện' ? 
            <ToolTips        
            onClick={() => handleStatusViewCategory(item._id, 'Hiện')}
            icon={<Icon name={'eyeOff'} className={'text-sky-600 w-6 h-6'} />}
            tooltipText={'Ẩn danh mục'}
            ></ToolTips>
            :             
            <ToolTips        
            onClick={() => handleStatusViewCategory(item._id, 'Ẩn')}
            icon={<Icon name={'eyeOn'} className={'text-sky-600 w-6 h-6'} />}
            tooltipText={'Hiện danh mục'}
            ></ToolTips>
        }
        <ToolTips
        onClick={() => handleEdit(item._id)}
        icon={<Icon name={'edit'} className={'text-yellow-400 w-6 h-6'}></Icon>}
        tooltipText={'Thay đổi danh mục'}
        />
        <ToolTips 
            onClick={() => handleDelete(item._id)}
            icon={<Icon name={'delete'} className={'text-red-600 w-6 h-6'}></Icon>}
            tooltipText={'Xóa danh mục'}
        />
      </div>
    ),
  };
  return (
    <div className='p-8 h-[calc(100vh-40px)]'>

      <TitleTab text={'Danh mục'}  className={'text-black'}></TitleTab>

      <div className='bg-white p-5 rounded-lg shadow-inner mt-4' style={{minHeight: "87%"}}>
        <div className='flex justify-end mt-4'>
            {/* <SearchDatatable fnSearch={handleSearchUser} fnChange={handleEmptyInput}></SearchDatatable> */}
            <button className="p-2 bg-sky-500 text-white rounded" onClick={() => handleCreate()}>Thêm danh mục</button>
        </div>
        <div className='mt-4'>
              <div className="shadow-md">
                  <Table
                  customColumnName={"Thao tác"}
                  columns={columns}
                  data={categorys}
                  customActionColumn={customActionColumn}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageClick}
                  />
              </div>
          </div>
      </div>

        <FormCategory close={handleCloseModel} categoryID={categoryID} IsChange={isClickAction} type={typeForm} refreshData={getCategory}></FormCategory>
    </div>

  )
}
