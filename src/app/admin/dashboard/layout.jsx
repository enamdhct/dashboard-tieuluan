
'use client'
import { Inter } from "next/font/google";
import Link from "next/link";
import Icon from "@/assets/icon/icon";
import { usePathname, redirect } from "next/navigation";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { getCookie } from "@/services/cookieService";
import { getUser } from "@/services/userService";
import TabMenu from "@/components/TabMenu/TabMenu";
import { useEffect, useState } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}) {
    const pathName = usePathname()
    const myCookieValue = getCookie('userID');
    const [selectedTab, setSelectedTab] = useState(pathName.split('/')[3]);

    const [user, setUser] = useState('')
    const [imgURL, setImgURL] = useState('')

    useEffect(()=>{
        localStorage.setItem('userID', getCookie('userID'))
        localStorage.setItem('accessToken', getCookie('accessToken'))
    }, [])

    useEffect(()=>{
        if (myCookieValue){
            getUserInfo()
        }
    }, [myCookieValue])

    async function getUserInfo (){
        let user = await getUser(myCookieValue)
        setUser(user)
        setImgURL(user.avatarURL)
        console.log(user);
    }
    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
      };
    function handleLogout(){
        // localStorage.clear();
        redirect('/admin/auth/logout')
    }
    return (
        <div className="flex flex-row grow min-h-full" style={{overflowY: "hidden"}}>
            <div className=" bg-white shadow-inner flex flex-col overflow-x-hidden" style={{ width: "12%", position: "fixed", height: "100vh", overflowY: "hidden"}}>
                <div className="flex justify-center w-full">
                    <img src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2FArgiShop.png?alt=media&token=7bf18b21-7d03-4775-9f5b-f2d906dd321f" alt="" width={80} height={80}/>
                </div>
                <div className="text-white p-4">
                    <div className={`p-2 ${selectedTab === "dashboard" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('dashboard')}>
                        <TabMenu url={'/admin/dashboard/'} iconName={'home'} text={'Dashboard'}  className={`${selectedTab === "dashboard" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "product" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('product')}>
                        <TabMenu url={'/admin/dashboard/product'} iconName={'product'} text={'Sản phẩm'} className={`${selectedTab === "product" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "category" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('category')}>
                        <TabMenu url={'/admin/dashboard/category'} iconName={'categogy'} text={'Danh mục'} className={`${selectedTab === "category" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "voucher" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('voucher')}>
                        <TabMenu url={'/admin/dashboard/voucher'} iconName={'voucher'} text={'Mã giảm giá'} className={`${selectedTab === "voucher" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "order" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('order')}>
                        <TabMenu url={'/admin/dashboard/order'} iconName={'order'} text={'Đơn hàng'} className={`${selectedTab === "order" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "member" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('member')}>
                        <TabMenu url={'/admin/dashboard/member'} iconName={'member'} text={'Nhân viên'} className={`${selectedTab === "member" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "customer" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('customer')}>
                        <TabMenu url={'/admin/dashboard/customer'} iconName={'customer'} text={'Khách hàng'} className={`${selectedTab === "customer" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "comment" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('comment')}>
                        <TabMenu url={'/admin/dashboard/comment'} iconName={'comment'} text={'Bình luận'} className={`${selectedTab === "comment" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "review" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('review')}>
                        <TabMenu url={'/admin/dashboard/review'} iconName={'review'} text={'Đánh giá'} className={`${selectedTab === "review" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>                    
                    <div className={`p-2 ${selectedTab === "vendor" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('vendor')}>
                        <TabMenu url={'/admin/dashboard/vendor'} iconName={'vendor'} text={'Nhà cung cấp'} className={`${selectedTab === "vendor" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "requestBuild" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('requestBuild')}>
                        <TabMenu url={'/admin/dashboard/requestBuild'} iconName={'vendor'} text={'Yêu cầu PC'} className={`${selectedTab === "requestBuild" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "contact" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('contact')}>
                        <TabMenu url={'/admin/dashboard/contact'} iconName={'contact'} text={'Liên hệ'} className={`${selectedTab === "contact" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "refund" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('refund')}>
                        <TabMenu url={'/admin/dashboard/refund'} iconName={'refund'} text={'Hoàn tiền'} className={`${selectedTab === "refund" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <div className={`p-2 ${selectedTab === "warehouse" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"} my-2 rounded flex items-center`} onClick={()=> handleTabClick('warehouse')}>
                        <TabMenu url={'/admin/dashboard/warehouse'} iconName={'wareHouse'} text={'Kho hàng'} className={`${selectedTab === "warehouse" ? " text-white font-bold" : "text-slate-500"}`}></TabMenu>
                    </div>
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            {/* <TabMenu iconName={'statistical'} text={'Thống kê'}></TabMenu>  */}
                            <div className={`flex flex-row justify-between items-center gap-5 p-2 mt-3 w-full rounded ${selectedTab === "statistical" ? "bg-green-400 text-white font-bold" : "hover:bg-slate-100 text-slate-500"}`} onClick={()=> handleTabClick('statistical')}>
                                <div className="flex flex-row text-lg">
                                    <Icon name={"statistical"} className={`w-6 h-6 mr-3 ${selectedTab === "statistical" ? " text-white font-bold" : "text-slate-500"} `}></Icon>
                                    <div>Thống kê</div>
                                </div>
                                <div className="flex items-center">
                                    <Icon name={"arrow"} className={`w-6 h-6 mr-3 ${selectedTab === "statistical" ? " text-white font-bold" : "text-slate-500"} `}></Icon>
                                </div>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User Actions" variant="flat" style={{width: "100%"}}>
                        <DropdownItem key="Thống kê đánh giá">
                            <Link href={'/admin/dashboard/statistical/review'} className='no-underline text-black'>
                                <div className='flex justify-center items-center'>Thống kê đánh giá</div>
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="Thống kê kho hàng">
                            <Link href={'/admin/dashboard/statistical/warehouse'} className='no-underline text-black'>
                                <div className='flex justify-center items-center'>Thống kê kho hàng</div>
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="Thống kê khách hàng">
                            <Link href={'/admin/dashboard/statistical/customer'} className='no-underline text-black'>
                                <div className='flex justify-center items-center'>Thống kê khách hàng</div>
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="Thống kê doanh số">
                            <Link href={'/admin/dashboard/statistical/revenue'} className='no-underline text-black'>
                                <div className='flex justify-center items-center'>Thống kê doanh số</div>
                            </Link>
                        </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="overflow-hidden" style={{backgroundColor: '#f5f5f5', width: "88%", marginLeft: "12%", overflowY: "hidden"}}>
                <div className="flex justify-end p-3 bg-white shadow-inner">
                    <div className="mr-8">
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                            <div className="text-center text-black bg-slate-50 px-4 py-1 rounded-full">
                                <User   
                                    name={user.name}
                                    description={user.role}
                                    avatarProps={{
                                    src: imgURL,
                                    radius:"md"
                                    }}
                                    classNames={{
                                        description: 'text-red-500 font-bold text-center'}
                                    }
                                />
                            </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat">
                            <DropdownItem key="settings">
                                <Link href={`/admin/my-info/${user._id}`}>
                                    <div className='flex justify-center items-center'>Thông tin cá nhân</div>
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                <div className='flex justify-center cursor-pointer' onClick={()=>handleLogout()}>Đăng xuất</div> 
                            </DropdownItem>

                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                {children}
            </div>
        </div>

    );
}
