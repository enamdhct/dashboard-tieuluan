'use client'
import React ,{useEffect, useState}from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Icon from '@/assets/icon/icon'
import { getUser } from '@/services/userService'
import { getAllOrder, deleteOrder, updateOrder, getOrderWithState, searchOrder, getAll, getOrder } from '@/services/orderService'
import { confirmDelete, alertSuccess } from '@/components/Swal/alert'
import { getWareByProductID, updateWareHouse } from '@/services/warehouseService'
import ToolTips from '@/components/ToolTips/ToolTips'
import SearchDatatable from '@/components/SearchDatatable/SearchDatatable'
import Pagination from '@/components/Pagination/Pagination'
import Link from 'next/link'
import Bill from '@/components/Bill/Bill'


const moment = require('moment');

export default function page() {
  const [arrOrder, setArrOrder] = useState('')
  const [arrUser, setArrUser] = useState([])

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenPrint,setisOpenPrint] = useState(false)
  const [orderInfo, setOrderInfo] = useState('')

  useEffect(()=>{
      getData()
  },[currentPage])
  async function getData(){
    let data = await getAll(currentPage, JSON.stringify({"type": "admin"}))
    setArrOrder(data.orders)
    console.log(data);
    setTotalPages(data.pagination.totalPages);
    setCurrentPage(data.pagination.currentPage);
    const users = []
    for(let i = 0; i<data.orders.length;i++){
        let user = await getUser(data.orders[i].userID)
        users.push(user)
    }
    setArrUser(users)
  }

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  async function handleDelete (id){
    let isConfirm = await confirmDelete()
    if (isConfirm){
      let rs = await deleteOrder(id)
      if (rs){
        getData()
      }
    }
  }

  async function handleApprove (id){
    let update = await updateOrder(id, JSON.stringify({"state": "Đang vận chuyển"}))
    if (update){
      alertSuccess({ status: 'success', text: 'Thao tác thành công' })
    }
    let order = await getOrder(id)
    console.log(order);
    for (let i=0; i<order.product.length; i++){
      console.log(order.product[i].name);
      let rs = await getWareByProductID(JSON.stringify({"productID": order.product[i].productID}))
      console.log(rs[0]);
      console.log(rs[0].quantity - order.product[i].quantity);
      let caculatorQuantity = rs[0].quantity - order.product[i].quantity
      let update = updateWareHouse(rs[0]._id, JSON.stringify({"quantity": caculatorQuantity}))
    }
    getData()
    
  }

  async function handleSearchOrder(e){
    if (e.key === 'Enter') {
        const searchText = e.target.value;
        let rs = await searchOrder(JSON.stringify({"text": searchText}))
        console.log(rs.orders);
        const arr = []
        arr.push(rs.orders)
        setArrOrder(arr)
    }
  }

  async function handleEmptyInput (e){
    if (e.target.value === ''){
      getData()
    }
  }

  function getStateClass(state) {
    switch (state) {
      case 'Đang xử lí':
        return 'text-yellow-500 font-bold';
      case 'Đang vận chuyển':
        return 'text-sky-500 font-bold';
      case 'Hoàn thành':
        return 'text-green-500 font-bold';
     case 'Đã hủy':
        return 'text-red-500 font-bold';
    case 'Nháp':
        return 'text-slate-400 font-bold';
    }
  }
  async function handleChangeSelect(value){
    if (value === 'all'){
      getData()
    } else {
      let arrOrder = await getOrderWithState(JSON.stringify({"state": value}))
      if (arrOrder){
        setArrOrder(arrOrder)
      }
    }
  }
  function handlePrint(item){
    setOrderInfo(item)
    setisOpenPrint(true);
  }
  const openModal = () => setShowModal(true);

  // Hàm đóng modal
  const closeModal = () => setShowModal(false);


  const sortRow = (type="desc")=>{
    try{
      const data = arrOrder.sort((a,b)=> (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *(type == 'desc' ? -1: 1));
      console.log({data});
      
      setArrOrder(data)
    }catch(err){
      console.log({err});
      
    }

  }
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
      <TitleTab text={'Quản lý đơn hàng'} className={'text-black'}></TitleTab>
    <div className="mt-4 bg-white p-5 rounded-lg shadow-inner" style={{minHeight: "87%"}}>
      <div className='flex flex-row justify-between'>
        <select className='rounded' onChange={(e)=>{handleChangeSelect(e.target.value)}}>
            <option value="all">Tất cả</option>
            <option value="Đang xử lí">Đang xử lí</option>
            <option value="Đang vận chuyển">Đang vận chuyển</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Đã hủy">Đã hủy</option>
        </select>
        {/* <select className='rounded' onChange={(e)=>{
          console.log("sort");
          sortRow(e.target.value)
        }}>
        <option value="asc">Cu nhat</option>
            <option value="desc">Moi nhat</option>
        </select> */}
        <SearchDatatable fnSearch={handleSearchOrder} fnChange={handleEmptyInput}></SearchDatatable>
      </div>
      <div className='shadow-md'>
      <table className="w-full border-collapse font-arial mt-4">
            <thead className='bg-slate-100'>
              <tr>
                <th className="border text-left p-4">Mã đơn hàng</th>
                <th className="border text-left p-4">Ngày đặt</th>
                <th className="border text-left p-4">Người đặt</th>
                <th className="border text-left p-4">Lời nhắn</th>
                <th className="border text-center p-4">Thành tiền</th>
                <th className="border text-center p-4">Thanh toán</th>
                <th className="border text-center p-4">Trạng thái</th>
                <th className="border text-center p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
              arrOrder?.length > 0 ? (          
                arrOrder && arrOrder.filter((item) => item.state != 'Nháp').map((item, index)=>{
                  const user = arrUser[index];
                  return(
                    <tr key={index}>
                      <td className="border text-left p-4">{item._id} </td>
                      <td className="border text-left p-4">{moment(item.orderTime).format("DD/MM/YYYY HH:mm:ss")}</td>
                      <td className="border text-left p-4">{user && user.name}</td>
                      <td className="border text-left p-4">{item.note && item.note}</td>
                      <td className="border text-center p-4">{item.Price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</td>
                      <td className="border text-center p-4">{item.paymentMethod === "COD" ? 'COD' : 'Chuyển khoản'}</td>
                      <td className="border text-center p-4">{
                        <span className={getStateClass(item.state)}>{item.state}</span>
                      }</td>

                      <td className="border text-left p-4">
                        <div className='flex flex-row gap-3 justify-center'>
                        {item.state === "Đang xử lí" &&
                          <ToolTips 
                          onClick={()=>handleApprove(item._id)}
                          icon={<Icon name={'check'} className={'text-green-600 w-6 h-6'}></Icon>}
                          tooltipText={"Xác nhận đơn hàng"}
                        />}
                          <Link href={`order/${item._id}`}>
                            <ToolTips
                              icon={<Icon name={'detail'} className={'text-sky-500 w-6 h-6'}></Icon>}
                              tooltipText={'Xem chi tiết'}
                            />
                          </Link>
                          {item.paymentMethod === "Payment" &&                           
                            <ToolTips 
                              onClick={()=>handlePrint(item)}
                              icon={<Icon name={'print'} className={'text-yellow-400 w-6 h-6'}></Icon>}
                              tooltipText={"Xuất hóa đơn"}
                            />
                          }
                          <ToolTips 
                            onClick={()=>handleDelete(item._id)}
                            icon={<Icon name={'delete'} className={'text-red-600 w-6 h-6'}></Icon>}
                            tooltipText={"Xóa đơn hàng"}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (            
                <tr >
                  <td colSpan="6" className='border text-center p-4'>Không có đơn hàng</td>
                </tr>
              )}
            </tbody> 
        </table>
        <div className='w-1/2'>
          <Bill isOpen={isOpenPrint} close={()=>setisOpenPrint(false)} order={orderInfo}></Bill>
        </div>
        <div className='py-2 px-5'>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />
        </div>
        {/* <ul className='list-disc'>
          <li>hu</li>
          <li>haha</li>
          <li>hihi</li>
        </ul> */}
      </div>
    </div>

    </div>
  )
}

