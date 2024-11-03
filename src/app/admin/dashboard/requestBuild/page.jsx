'use client'
import React, {useState, useEffect} from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Table from '@/components/DataTable/Table'
import Icon from '@/assets/icon/icon'
import Link from 'next/link'
import ToolTips from '@/components/ToolTips/ToolTips'
import SearchDatatable from '@/components/SearchDatatable/SearchDatatable'
import { getAllRequestBuild, deleteRequestBuild, updateRequestBuild } from '@/services/requestBuildService'
import { createOrder } from '@/services/orderService'
import { alertSuccess, confirmDelete } from '@/components/Swal/alert'

export default function page() {
    const [arrUser, setArrUser] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(()=>{
        getUser()
    },[])

    async function getUser(){
        let requestBuilds = await getAllRequestBuild(currentPage)
        console.log("hahah", requestBuilds);
        setArrUser(requestBuilds.requestBuilds.filter(item => item.state != 'Đơn hàng'))
        setTotalPages(requestBuilds.pagination.totalPages);
        setCurrentPage(requestBuilds.pagination.currentPage);
    }
    async function handleDelete (id){
        let isConfirm = await confirmDelete()
        if (isConfirm){
            let delUser = await deleteRequestBuild(id)
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

    const handleAddOrder = async (item) => {
        let price = 0
        let products = []
        const field = ["cpu", "gpu", "source", "disk", "main", "ram"]

        for(let i=0; i<field.length; i++){
            if (item.product[field[i]] != null){
                price += item.product[field[i]].totalPrice
                products.push(item.product[field[i]])
            }
        }
        
        let formData = {
            product: products,
            state: "Đang xử lí",
            userID: item.userID,
            orderTime: new Date(),
            note: "",
            Price: price,
            // shippingAddress: idLocation,
            paymentMethod: 'COD',
            shippingFee: 0
        }
        let order = await createOrder(JSON.stringify(formData))

        let request = await updateRequestBuild(item._id, JSON.stringify({orderID: order._id, state: "Đơn hàng"}))

        console.log("req", request);

        console.log("order", order);
        console.log("hahah", formData);
    }
    let keyImg = "avatarURL"
    const columns = [
      { key: '_id', label: 'Mã yêu cầu' },
      { key: 'name', label: 'Khách hàng', text: 'text-center'},
      { key: keyImg, label: 'Hình ảnh', text: 'text-center'},
      { key: 'phone', label: 'Số điện thoại', text: 'text-center'},
      { key: 'email', label: 'Email', text: 'text-center'},
      { key: 'Price', label: 'Tổng tiền', text: 'text-center'},
      { key: 'state', label: 'Trạng thái', text: 'text-center' },
    ];
    const customActionColumn = {
        label: 'Thao tác',
        render: (item) => (
          <div className='flex flex-row gap-3 justify-center'>
            <Link href={`requestBuild/info/${item._id}`}>
                <ToolTips
                icon={<Icon name={'detail'} className={'text-sky-500 w-6 h-6'}></Icon>}
                tooltipText={'Xem thông tin yêu cầu'}
                />
            </Link>
            <Link href={`requestBuild/edit/${item._id}`}>
                <ToolTips
                icon={<Icon name={'edit'} className={'text-yellow-400 w-6 h-6'}></Icon>}
                tooltipText={'Thay đổi thông tin nhà cung cấp'}
                />
            </Link>
            {/* <Link href={`requestBuild/edit/${item._id}`}> */}
                <ToolTips
                icon={<Icon name={'order'} className={'text-green-400 w-6 h-6'}></Icon>}
                tooltipText={'Thêm đơn hàng'}
                onClick={()=>handleAddOrder(item)}
                />
            {/* </Link> */}
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
        <TitleTab text={'Quản lý yêu cầu'} className={"text-black"}></TitleTab>
        <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
            <div className='shadow-md'>
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
