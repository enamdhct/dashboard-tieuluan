'use client'
import React, {useState, useEffect} from 'react'
import { alertSuccess } from '@/components/Swal/alert'
import { useRouter } from 'next/navigation'
import { updateUser, getUser } from '@/services/userService'
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation'
import * as Yup from 'yup';

export default function page({params}) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [user, setUser]= useState('')

    useEffect(()=>{
        getUserInfo()
    }, [params])

    async function getUserInfo (){
        let user = await getUser(params.id)
        console.log(user.person.stk);
        setUser(user)
    }
    async function handleUpdate(data){
        const formData = {
            "username": data.username,
            "name": data.name,
            "email": data.email,
            "birthday": data.birthday,
            "gender": data.gender,
            "location": data.location,
            "phone": data.phone,
            "role": data.role,
            "person": {
                "stk": data.stk,
                "personSTK": data.personSTK,
                "bank": data.bank,
                "cccd": data.cccd,
                "cccdDate": data.cccdDate,
                "cccdPlace": data.cccdPlace,
                "nation": data.nation,
                "religion": data.religion,
                "marriage": data.marriage,
            }
        }
        let update = await updateUser(params.id, JSON.stringify(formData))
        console.log(update);
        if (update){
            alertSuccess({status: "success", text: "Thay đổi thông tin thành công"})
            let type  = searchParams.get('type')
            console.log(type);
            if (type == "my-info"){
                router.push(`../../../my-info/${params.id}`)
            } else {
                router.push("../../member")
            }

        }
    }
    const validationSchema = Yup.object({
        username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
        name: Yup.string().required('Vui lòng nhập họ và tên của bạn'),
        email: Yup.string().email('Email không hợp lệ'),
        birthday: Yup.date(),
        gender: Yup.string().oneOf(['Nam', 'Nữ', 'Khác'], 'Vui lòng chọn giới tính'),
        location: Yup.string(),
        phone: Yup.string(),
        role: Yup.string().required('Vui lòng nhập vai trò của nhân viên'),
    });
    const RegistrationForm = () => {
        let person
        if (user?.person){
            person = user.person
            console.log(person.stk);
        }
        const formik = useFormik({
            initialValues: {
            username: user.username,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            gender: user.gender,
            location: user.location,
            phone: user.phone,
            role: user.role,
            stk: person?.stk,
            personSTK: person?.personSTK,
            bank: person?.bank,
            cccd: person?.cccd,
            cccdDate: person?.cccdDate,
            cccdPlace: person?.cccdPlace,
            resident: person?.resident,
            nation: person?.nation,
            religion: person?.religion,
            marriage: person?.marriage
            },
            validationSchema: validationSchema,
            onSubmit: async (values) => {
            // Xử lý submit form
            console.log('Form submitted:', values);
            // Gọi hàm handleRegister với giá trị values
            await handleUpdate(values);
            },
        });
        return (
            <div className="flex flex-col gap-3">
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
                        />
                        {formik.touched.username && formik.errors.username && (
                            <span className="text-red-500">{formik.errors.username}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className={`rounded border-2 ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-red-500">{formik.errors.name}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Địa chỉ Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={`rounded border-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.emailname}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500">{formik.errors.email}</span>
                        )}
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="birthday">Ngày sinh</label>
                            <input
                                type="date"
                                name="birthday"
                                id="birthday"
                                className={`rounded border-2 ${formik.touched.birthday && formik.errors.birthday ? 'border-red-500' : ''}`}
                                onChange={formik.handleChange}
                                value={formik.values.birthday}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.birthday && formik.errors.birthday && (
                                <span className="text-red-500">{formik.errors.birthday}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                            <span>Giới tính</span>
                            <div className="flex flex-row gap-5">
                                <label htmlFor="gender-male">
                                    <input
                                        type="radio"
                                        value="Nam"
                                        name="gender"
                                        id="gender-male"
                                        className={`rounded border-2 ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''}`}
                                        checked={formik.values.gender === 'Nam'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />{" "}
                                    Nam
                                </label>
                                <label htmlFor="gender-female">
                                    <input
                                        type="radio"
                                        value="Nữ"
                                        name="gender"
                                        id="gender-female"
                                        className={`rounded border-2 ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''}`}
                                        checked={formik.values.gender === 'Nữ'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />{" "}
                                    Nữ
                                </label>
                                <label htmlFor="gender-other">
                                    <input
                                        type="radio"
                                        value="Khác"
                                        name="gender"
                                        id="gender-other"
                                        className={`rounded border-2 ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''}`}
                                        checked={formik.values.gender === 'Khác'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />{" "}
                                    Khác
                                </label>
                            </div>
                            {formik.touched.gender && formik.errors.gender && (
                                <span className="text-red-500">{formik.errors.gender}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="location">Địa chỉ</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            className={`rounded border-2 ${formik.touched.location && formik.errors.location ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.location}
                        />
                        {formik.touched.location && formik.errors.location && (
                            <span className="text-red-500">{formik.errors.location}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className={`rounded border-2 ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <span className="text-red-500">{formik.errors.phone}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Vai trò</label>
                        <input
                            type="text"
                            name="role"
                            id="role"
                            className={`rounded border-2 ${formik.touched.role && formik.errors.role ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.role}
                        />
                        {formik.touched.role && formik.errors.role && (
                            <span className="text-red-500">{formik.errors.role}</span>
                        )}
                    </div>
                    <h1 className='font-bold text-lg py-4'>Thông tin cá nhân</h1>
                    <div className="flex flex-col gap-2">
                            <label htmlFor="stk">Số tài khoản</label>
                            <input
                                type="text"
                                name="stk"
                                id="stk"
                                className={`rounded border-2 ${formik.touched.stk && formik.errors.stk ? 'border-red-500' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stk}
                            />
                            {formik.touched.stk && formik.errors.stk && (
                                <span className="text-red-500">{formik.errors.stk}</span>
                            )}
                        </div>
                        <div className='flex flex-row gap-2 w-full'>
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="personSTK">Chủ tài khoản</label>
                                <input
                                    type="text"
                                    name="personSTK"
                                    id="personSTK"
                                    className={`rounded border-2 ${formik.touched.personSTK && formik.errors.personSTK ? 'border-red-500' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.personSTK}
                                />
                                {formik.touched.personSTK && formik.errors.personSTK && (
                                    <span className="text-red-500">{formik.errors.personSTK}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="bank">Ngân hàng</label>
                                <input
                                    type="text"
                                    name="bank"
                                    id="bank"
                                    className={`rounded border-2 ${formik.touched.bank && formik.errors.bank ? 'border-red-500' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.bank}
                                />
                                {formik.touched.bank && formik.errors.bank && (
                                    <span className="text-red-500">{formik.errors.bank}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cccd">Số căn cước công dân</label>
                            <input
                                type="text"
                                name="cccd"
                                id="cccd"
                                className={`rounded border-2 ${formik.touched.cccd && formik.errors.cccd ? 'border-red-500' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cccd}
                            />
                            {formik.touched.cccd && formik.errors.cccd && (
                                <span className="text-red-500">{formik.errors.cccd}</span>
                            )}
                        </div>
                        <div className='flex flex-row gap-2 w-full'>
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="cccdDate">Ngày cấp</label>
                                <input
                                    type="text"
                                    name="cccdDate"
                                    id="cccdDate"
                                    className={`rounded border-2 ${formik.touched.cccdDate && formik.errors.cccdDate ? 'border-red-500' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cccdDate}
                                />
                                {formik.touched.cccdDate && formik.errors.cccdDate && (
                                    <span className="text-red-500">{formik.errors.cccdDate}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="cccdPlace">Nơi cấp</label>
                                <input
                                    type="text"
                                    name="cccdPlace"
                                    id="cccdPlace"
                                    className={`rounded border-2 ${formik.touched.cccdPlace && formik.errors.cccdPlace ? 'border-red-500' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cccdPlace}
                                />
                                {formik.touched.cccdPlace && formik.errors.cccdPlace && (
                                    <span className="text-red-500">{formik.errors.cccdPlace}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="resident">Địa chỉ thường trú</label>
                            <input
                                type="text"
                                name="resident"
                                id="resident"
                                className={`rounded border-2 ${formik.touched.resident && formik.errors.resident ? 'border-red-500' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.resident}
                            />
                            {formik.touched.resident && formik.errors.resident && (
                                <span className="text-red-500">{formik.errors.resident}</span>
                            )}
                        </div>
                        <div className='flex flex-row gap-2 w-full'>
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="nation">Dân tộc</label>
                                <input
                                    type="text"
                                    name="nation"
                                    id="nation"
                                    className={`rounded border-2 ${formik.touched.nation && formik.errors.nation ? 'border-red-500' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nation}
                                />
                                {formik.touched.nation && formik.errors.nation && (
                                    <span className="text-red-500">{formik.errors.nation}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="religion">Tôn giáo</label>
                                <input
                                    type="text"
                                    name="religion"
                                    id="religion"
                                    className={`rounded border-2 ${formik.touched.religion && formik.errors.religion ? 'border-red-500' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.religion}
                                />
                                {formik.touched.religion && formik.errors.religion && (
                                    <span className="text-red-500">{formik.errors.religion}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="marriage">Tình trạng hôn nhân</label>
                            <input
                                type="text"
                                name="marriage"
                                id="marriage"
                                className={`rounded border-2 ${formik.touched.marriage && formik.errors.marriage ? 'border-red-500' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.marriage}
                            />
                            {formik.touched.marriage && formik.errors.marriage && (
                                <span className="text-red-500">{formik.errors.marriage}</span>
                            )}
                        </div>
                    <div>
                        <button type="submit" className="bg-red-500 text-white font-bold w-fit p-2 rounded mt-4">
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        )
    }
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
        <div style={{minHeight: "87%"}}>
            <div className="bg-white rounded p-5 flex justify-center">
                <div className="w-2/3 border-2 p-5 rounded-lg border-green-400">
                    <div className="flex justify-center">
                        <h3 className='font-bold text-lg'>Sửa thông tin nhân viên</h3>
                    </div>
                    <RegistrationForm></RegistrationForm>
                </div>
            </div>
        </div>
    </div>
  )
}
