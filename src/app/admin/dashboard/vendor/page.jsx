'use client'
import React, {useState, useEffect} from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Table from '@/components/DataTable/Table'
import Icon from '@/assets/icon/icon'
import Link from 'next/link'
import ToolTips from '@/components/ToolTips/ToolTips'
import SearchDatatable from '@/components/SearchDatatable/SearchDatatable'
import { getAllVendor, deleteVendor } from '@/services/vendorService'
import { alertSuccess, confirmDelete } from '@/components/Swal/alert'

export default function page() {
    const [arrUser, setArrUser] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(()=>{
        getUser()
    },[])

    async function getUser(){
        let vendors = await getAllVendor(currentPage)
        setArrUser(vendors.vendors)
        setTotalPages(vendors.pagination.totalPages);
        setCurrentPage(vendors.pagination.currentPage);
    }
    async function handleDelete (id){
        let isConfirm = await confirmDelete()
        if (isConfirm){
            let delUser = await deleteVendor(id)
            if (delUser){
                alertSuccess({ status: 'success', text: 'Xóa nhà cung cấp thành công' })
                getUser()
            }
        } 
    }
    const handlePageClick = ({ selected }) => {
        const newPage = selected + 1;
        setCurrentPage(newPage);
      };
    async function handleSearchUser(e){
        if (e.key === 'Enter') {
            log("huhu")
            // const searchText = e.target.value;
            // let rs = await searchUserWithName(searchText)
            // setArrUser(rs.vendors)
        }
    }
    async function handleEmptyInput (e){
        if (e.target.value === ''){
            getUser()
        }
    }
    let keyImg = "logo"
    const columns = [
      { key: '_id', label: 'Mã nhà cung cấp' },
      { key: keyImg, label: 'Logo' },
      { key: 'name', label: 'Tên nhà cung cấp', text: 'text-center' },
      { key: 'email', label: 'Email', text: 'text-center'},
      { key: 'phone', label: 'Số điện thoại', text: 'text-center'},
      { key: 'location', label: 'Quê quán', text: 'text-center'},
    ];
    const customActionColumn = {
        label: 'Thao tác',
        render: (item) => (
          <div className='flex flex-row gap-3 justify-center'>
            <Link href={`vendor/info/${item._id}`}>
                <ToolTips
                icon={<Icon name={'detail'} className={'text-sky-500 w-6 h-6'}></Icon>}
                tooltipText={'Xem thông tin nhà cung cấp'}
                />
            </Link>
            <Link href={`vendor/edit/${item._id}`}>
                <ToolTips
                icon={<Icon name={'edit'} className={'text-yellow-400 w-6 h-6'}></Icon>}
                tooltipText={'Thay đổi thông tin nhà cung cấp'}
                />
            </Link>
            <ToolTips 
                onClick={() => handleDelete(item._id)}
                icon={<Icon name={'delete'} className={'text-red-600 w-6 h-6'}></Icon>}
                tooltipText={'Xóa nhà cung cấp'}
            />
          </div>
        ),
      };
  return (
    <div className='p-8 h-[calc(100vh-40px)]'>
        <TitleTab text={'Quản lý nhà cung cấp'} className={"text-black"}></TitleTab>
        <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
            <div className='shadow-md'>
                <div className='flex justify-end mt-4'>
                    {/* <SearchDatatable fnSearch={handleSearchUser} fnChange={handleEmptyInput}></SearchDatatable> */}
                    <Link href={'vendor/create'}>
                        <button className="p-2 bg-sky-500 text-white rounded">Thêm nhà cung cấp</button>
                    </Link>
                </div>
                <div className='mt-4'>
                    <div>
                        <Table
                        customColumnName={"Thao tác"}
                        keyImg={keyImg}
                        columns={columns}
                        data={arrUser}
                        customActionColumn={customActionColumn}
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
