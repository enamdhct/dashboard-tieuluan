'use client'
import React, {useState, useEffect} from 'react'
import { alertSuccess } from '@/components/Swal/alert'
import { useRouter } from 'next/navigation'
import {changePassword , getUser } from '@/services/userService'
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function FormChangePassword({IsChange, close, ID}) {
    console.log(IsChange);
    const router = useRouter()
    const [user, setUser]= useState('')


    useEffect(()=>{
        getUserInfo()
    }, [])

    async function getUserInfo (){
        let user = await getUser(ID)
        console.log(user);
        setUser(user)
    }
    
    async function handleChangePassword(data){
        const formData = {
            "userId": ID,
            "currentPassword": data.password,
            "newPassword": data.newPassword,
        }
        let update = await changePassword(JSON.stringify(formData))
        console.log(update.message);
        if (update.message === "Mật khẩu hiện tại không đúng"){
            alertSuccess({status: "error", text: update.message})
            // router.push('/customer')
        } else {
            alertSuccess({status: "success", text: update.message})
            close()
        }
    }
    const validationSchema = Yup.object({
        password: Yup.string().required('Vui lòng nhập mât khẩu hiện tại'),
        newPassword: Yup.string().required('Vui lòng nhập mật khẩu mới'),
        confirmPasssword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
        .required('Vui lòng nhập lại mật khẩu'),
    });
    const RegistrationForm = () => {
        const formik = useFormik({
            initialValues: {
            username: user.username,
            password: '',
            newPassword: '',
            confirmPasssword: '',

            },
            validationSchema: validationSchema,
            onSubmit: async (values) => {
            await handleChangePassword(values);
            },
        });
        return (
            <div className="flex flex-col gap-3 px-5 pb-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Tên đăng nhập *</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={`border-2 rounded ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            disabled
                        />
                        {formik.touched.username && formik.errors.username && (
                            <span className="text-red-500">{formik.errors.username}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Mật khẩu hiện tại:</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            className={`rounded border-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500">{formik.errors.password}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="newPassword">Mật khẩu mới</label>
                        <input
                            type="text"
                            name="newPassword"
                            id="newPassword"
                            className={`rounded border-2 ${formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.newPassword}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <span className="text-red-500">{formik.errors.newPassword}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPasssword">Nhập lại mật khẩu</label>
                        <input
                            type="text"
                            name="confirmPasssword"
                            id="confirmPasssword"
                            className={`rounded border-2 ${formik.touched.confirmPasssword && formik.errors.confirmPasssword ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.confirmPasssword}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.confirmPasssword && formik.errors.confirmPasssword && (
                            <span className="text-red-500">{formik.errors.confirmPasssword}</span>
                        )}
                    </div>
                    <div className='flex flex-row gap-4'>
                        <button type="submit" className="bg-red-500 text-white font-bold w-fit p-2 rounded mt-4">
                            Xác nhận
                        </button>
                        <button className=' border font-bold w-fit p-2 rounded mt-4' onClick={()=> close()}>Đóng</button>
                    </div>
                </form>
            </div>
        )
    }

  return (
    <div className={IsChange === false ? "hidden" : ""}>
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" style={{width: '30%'}}>
                        <div className='font-bold text-xl pt-5 flex justify-center'>
                            <span>Đổi mật khẩu</span> 
                        </div>
                        <RegistrationForm></RegistrationForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
