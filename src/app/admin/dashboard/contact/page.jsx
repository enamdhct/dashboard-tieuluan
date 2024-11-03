'use client'
import React, {useState, useEffect} from 'react'
import { alertSuccess, confirmDelete } from '@/components/Swal/alert'
import { getAllContact, updateContact, deleteContact } from '@/services/contactService'
import TitleTab from '@/components/TitleTab/TitleTab'
import SearchDatatable from '@/components/SearchDatatable/SearchDatatable'
import Table from '@/components/DataTable/Table'
import ToolTips from '@/components/ToolTips/ToolTips'
import Icon from '@/assets/icon/icon'


export default function page() {
    const [arrContact, setArrContact] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [typeView, setTypeView] = useState('all')

    useEffect(()=> {
        getDataContact()
    }, [])

    async function getDataContact(){
        let contacts = await getAllContact(currentPage)
        console.log(contacts);
        setArrContact(contacts.contacts)
        setTotalPages(contacts.pagination.totalPages);
        setCurrentPage(contacts.pagination.currentPage);
    }

    const handlePageClick = ({ selected }) => {
        const newPage = selected + 1;
        setCurrentPage(newPage);
      };
    async function handleProcess (id){
        let update = await updateContact(id, JSON.stringify({state: "Đã xử lý"}))
        if (update){
            alertSuccess({ status: 'success', text: 'Cập nhật trạng thái thành công' })
            getDataContact()
        } else {
            alertSuccess({ status: 'error', text: 'Đã có lỗi xãy ra' })
        }
    }
    async function handleDelete(id){
        let isConfirm = await confirmDelete()
        if (isConfirm){
            let del = await deleteContact(id)
            if (del){
                alertSuccess({ status: 'success', text: 'Xóa liên hệ thành công' })
                getDataContact()
            } else {
                alertSuccess({ status: 'error', text: 'Đã có lỗi xãy ra' })
            }
        }
    }

    const columns = [
        { key: 'name', label: 'Tên khách hàng' ,text: 'text-center' },
        { key: 'email', label: 'Địa chỉ email', text: 'text-center'},
        { key: 'phone', label: 'Số diện thoại', text: 'text-center'},
        { key: 'content', label: 'Nội dung', text: 'text-center'},
      ];
      const customStateColumn = {
        label: 'Trạng thái',
        render: (item) => (
          <div className='flex justify-center'>
            <span className={`font-bold ${item.state === "Chưa xử lý" ? "text-yellow-400" : "text-green-500"}`}>{item.state}</span>
          </div>
        ),
      };
      const customActionColumn = {
        label: 'Thao tác',
        render: (item) => (
          <div className='flex flex-row gap-3 justify-center'>
            {item.state != "Chưa đánh giá" &&
                <ToolTips
                onClick={() => handleProcess(item._id)}
                icon={<Icon name={'check'} className={'text-green-400 w-6 h-6'}></Icon>}
                tooltipText={'Xử lý liên hệ'}
                />
            }
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
        <div className='bg-white p-5 rounded-lg shadow-inner h-full'>
            <div>
                <div>
                    <TitleTab text={'Liên hệ'} className={"text-black"}></TitleTab>
                </div>
                <div className='mt-4'>
                    <div className='border shadow-inner'>
                        <Table
                        customColumnName={"Thao tác"}
                        customColumnName2={"Trạng thái"}
                        columns={columns}
                        data={arrContact}
                        customActionColumn={customActionColumn}
                        customStateColumn={customStateColumn}
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
