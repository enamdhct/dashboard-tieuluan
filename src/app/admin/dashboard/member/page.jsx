'use client'
import React, {useState, useEffect} from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Table from '@/components/DataTable/Table'
import Icon from '@/assets/icon/icon'
import Link from 'next/link'
import ToolTips from '@/components/ToolTips/ToolTips'
import SearchDatatable from '@/components/SearchDatatable/SearchDatatable'
import { getAll, searchUserWithName, deleteUser } from '@/services/userService'
import { alertSuccess, confirmDelete } from '@/components/Swal/alert'

export default function page() {
    const [arrUser, setArrUser] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(()=>{
        getUser()
    },[])

    async function getUser(){
        let users = await getAll()
        setArrUser(users.users.filter(item => item.role != ""))
        setTotalPages(users.pagination.totalPages);
        setCurrentPage(users.pagination.currentPage);
    }
    async function handleDelete (id){
        let isConfirm = await confirmDelete()
        if (isConfirm){
            let delUser = await deleteUser(id)
            if (delUser){
                alertSuccess({ status: 'success', text: 'Xóa nhân viên thành công' })
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
            const searchText = e.target.value;
            let rs = await searchUserWithName(searchText)
            setArrUser(rs.users)
        }
    }
    async function handleEmptyInput (e){
        if (e.target.value === ''){
            getUser()
        }
    }
    let keyImg = "avatarURL"
    const columns = [
      { key: '_id', label: 'Mã nhân viên' },
      { key: 'name', label: 'Tên nhân viên' },
      { key: keyImg, label: 'Hình ảnh' },
      { key: 'gender', label: 'Giới tính', text: 'text-center'},
      { key: 'phone', label: 'Số điện thoại', text: 'text-center'},
      { key: 'location', label: 'Quê quán', text: 'text-center'},
      { key: 'role', label: 'Chức vụ', text: 'text-center'},
    ];
    const customActionColumn = {
        label: 'Thao tác',
        render: (item) => (
          <div className='flex flex-row gap-3 justify-center'>
            <Link href={`member/info/${item._id}`}>
                <ToolTips
                icon={<Icon name={'detail'} className={'text-sky-500 w-6 h-6'}></Icon>}
                tooltipText={'Xem thông tin nhân viên'}
                />
            </Link>
            <Link href={`member/edit/${item._id}`}>
                <ToolTips
                icon={<Icon name={'edit'} className={'text-yellow-400 w-6 h-6'}></Icon>}
                tooltipText={'Thay đổi thông tin nhân viên'}
                />
            </Link>
            <ToolTips 
                onClick={() => handleDelete(item._id)}
                icon={<Icon name={'delete'} className={'text-red-600 w-6 h-6'}></Icon>}
                tooltipText={'Xóa nhân viên'}
            />
          </div>
        ),
      };
  return (
    // <div className='p-8 h-[calc(100%-40px)]'>
    <div className='p-8 h-[calc(100vh-40px)]'>
        <TitleTab text={'Quản lý nhân viên'} className={"text-black"}></TitleTab>
        <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
            <div className='flex justify-between mt-4'>
                <SearchDatatable fnSearch={handleSearchUser} fnChange={handleEmptyInput}></SearchDatatable>
                <Link href={'member/create'}>
                    <button className="p-2 bg-sky-500 text-white rounded">Thêm nhân viên</button>
                </Link>
            </div>
            <div className='mt-4'>
                <div className='border shadow-inner'>
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
  )
}
