// import React from 'react'
import { cookies } from 'next/headers'
import { Login } from '@/services/authService';
import { redirect } from 'next/navigation'
import Icon from '@/assets/icon/icon';

let validate = null
let login = ""
export default function page() {
  
  async function handleClient(e){
    "use server"
    const cookieStore = cookies();
    const username= e.get('username')
    const password  = e.get('password')
    const formData = {
      "username": username,
      "password": password
    }
    login = await Login(JSON.stringify(formData))
    console.log(login.accessToken);
    if (login.accessToken != undefined){
      validate = null;
      cookieStore.set("accessToken", login.accessToken);
      cookieStore.set("userID", login._id);
      redirect('/admin/dashboard')
    } else {
      validate = {massage: "Tài khoản hoặc mật khẩu không chính xác"}
      redirect('/admin/auth/login')
    }
    
  }

  return (
    <div style={{
      backgroundImage: 'url("https://i.pinimg.com/originals/42/d2/37/42d237a7c619a64be59761bb75d3cabd.jpg")',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      }} className='h-screen'>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        backdropFilter: 'blur(5px)', 
      }}>
        <div className='flex items-center h-full justify-center'>
          <div className='flex flex-col justify-center w-1/3 border rounded p-4' style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
          <div className='flex justify-center mt-4'>
            <Icon name={'userLogin'} className={'text-red-600 w-32 h-32'}></Icon>
          </div>
            <form action={handleClient}>
                <div className='flex flex-col my-4'>
                  <div className='flex flex-col justify-center w-full items-center'>
                    <div className='flex flex-row gap-3 items-center border shadow-lg rounded p-2 w-2/3 bg-white'>
                      <Icon name={'username'} className={'text-red-600 w-6 h-6'}></Icon> <span>|</span>
                      <input type="text" name='username' placeholder='Nhập tên đăng nhập' className='border-0 w-full outline-0'/>
                    </div>
                      {validate !=null && <span className='text-red-500'>{validate.massage}</span>}
                  </div>
                  <div className='flex flex-col mt-5 justify-center w-full items-center'>
                    <div className='flex flex-row gap-3 items-center border shadow-lg rounded p-2 w-2/3 bg-white'>
                      <Icon name={'password'} className={'text-red-600 w-6 h-6'}></Icon><span>|</span>
                      <input type="password" name='password' placeholder='Nhập mật khẩu' className='border-0 w-full'/>
                    </div>
                      {validate !=null && <span className='text-red-500'>{validate.massage}</span>}
                  </div>
                  <div className="flex flex-row justify-center w-2/3 gap-3 items-center mt-4">
                        <input
                            type="checkbox"
                            name="agreement"
                        />
                        <span className='font-bold px-3'>Ghi nhớ tôi</span>
                    </div>
                </div>
                <div className='mt-4 flex justify-center mb-4'>
                  <button className='bg-red-500 px-4 py-2 font-bold text-lg text-white rounded' type='submit'>Đăng nhập</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
