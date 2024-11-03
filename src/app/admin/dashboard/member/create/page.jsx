'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { createUser } from '@/services/userService'
import { useFormik } from 'formik';
import { alertSuccess } from '@/components/Swal/alert';
import * as Yup from 'yup';

export default function page() {
  const router = useRouter()

  async function handleCreate(data){
    const formData = {
        "username": data.username,
        "password": data.password,
        "name": data.name,
        "email": data.email,
        "birthday": data.birthday,
        "gender": data.gender,
        "location": data.location,
        "phone": data.phone,
        "role": data.role,
        "avatarURL": "https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fimages.png?alt=media&token=0478b7d1-5dff-49db-a833-5176fbd4815f"
    }
    let create = await createUser(JSON.stringify(formData))
    if (create._id){
        alertSuccess({status: "success", text: "Thêm nhân viên thành công"})
        router.push('../member')
    }
}
const validationSchema = Yup.object({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
    confirmPasssword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng nhập lại mật khẩu'),
    name: Yup.string().required('Vui lòng nhập họ và tên của bạn'),
    email: Yup.string().email('Email không hợp lệ'),
    birthday: Yup.date(),
    gender: Yup.string().oneOf(['Nam', 'Nữ', 'Khác'], 'Vui lòng chọn giới tính'),
    location: Yup.string(),
    phone: Yup.string(),
    role: Yup.string().required('Vui lòng nhập vai trò của nhân viên'),
});
const RegistrationForm = () => {
    const formik = useFormik({
        initialValues: {
        username: '',
        password: '',
        confirmPasssword: '',
        name: '',
        email: '',
        birthday: '',
        gender: '',
        location: '',
        phone: '',
        role: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
        // Xử lý submit form
        console.log('Form submitted:', values);
        // Gọi hàm handleRegister với giá trị values
        await handleCreate(values);
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
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <span className="text-red-500">{formik.errors.username}</span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Mật khẩu *</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={`border-2 rounded ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <span className="text-red-500">{formik.errors.password}</span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu *</label>
                    <input
                        type="password"
                        name="confirmPasssword"
                        id="confirmPassword"
                        className={`border-2 rounded ${formik.touched.confirmPasssword && formik.errors.confirmPasssword ? 'border-red-500' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPasssword && formik.errors.confirmPasssword && (
                        <span className="text-red-500">{formik.errors.confirmPasssword}</span>
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
                    />
                    {formik.touched.role && formik.errors.role && (
                        <span className="text-red-500">{formik.errors.role}</span>
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
    <div className='p-8 h-[calc(100vh-40px)]'>
        <div style={{minHeight: "87%"}}>
            <div className="bg-white rounded p-5 flex justify-center">
                <div className="w-2/3 border-2 p-5 rounded-lg border-green-400">
                    <div className="flex justify-center">
                        <h3 className='font-bold text-lg'>Thêm nhân viên</h3>
                    </div>
                    <RegistrationForm></RegistrationForm>
                </div>
            </div>
        </div>
    </div>
);
}
