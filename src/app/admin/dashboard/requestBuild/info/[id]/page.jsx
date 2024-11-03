'use client'
import React, {useState, useEffect} from 'react'
import Search from '@/components/Search/Search';
import { searchProductName } from '@/services/productService'
import Link from 'next/link';
import ProductCardBuild from '@/components/ProductCartBuild/ProductCardBuild';
import ProductCardBuildOpen from '@/components/ProductCartBuild/ProductCardBuildOpen';
import ResultProductSearchItem from '@/components/ResultProductSearcjItem/ResultProductSearchItem';
import { getUser } from '@/services/userService'
import { createRequestBuild, getRequestBuild, updateRequestBuild } from '@/services/requestBuildService';
import { alertSuccess } from '@/components/Swal/alert';
import { createOrder } from '@/services/orderService'

export default function BuildPC({params}) {
    const [showModal, setShowModal] = useState('');
    const [showMenu, setShowMenu] = useState('');
    const [searchResultsCPU, setSearchResultsCPU] = useState([]);
    const [searchResultsGPU, setSearchResultsGPU] = useState([]);
    const [searchResultsRam, setSearchResultsRam] = useState([]);
    const [searchResultsMain, setSearchResultsMain] = useState([]);
    const [searchResultsSource, setSearchResultsSource] = useState([]);
    const [searchResultsDisk, setSearchResultsDisk] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cpu, setCPU] = useState('')
    const [gpu, setGPU] = useState('')
    const [ram, setRam] = useState('')
    const [source, setSource] = useState('')
    const [main, setMain] = useState('')
    const [disk, setDisk] = useState('')
    const [user, setUser] = useState('')
    const [requestValue, setRequestValue] = useState()

    const openModal = (type) => {
        switch (type) {
            case "cpu":
                setCPU("");
                break;
            case "gpu":
                setGPU("");
                break;
            case "ram":
                setRam("");
                break;
            case "main":
                setMain("");
                break;
            case "disk":
                setDisk("");
                break;
            case "source":
                setSource("");
                break;
            default:
                break;
        }
      setShowModal(type);
    }
  
    const closeModal = (type) => {
      setShowModal("");
      setSearchValue("")
    }
    async function handleSearchProduct(e){
        if (e.key === 'Enter') {
            let results = await searchProductName(searchValue)
            setSearchResultsCPU(results.products.filter(item => item.state != 'Đơn hàng'));
            setShowMenu('cpu');
        }
    }
    async function handleInputChange (event){
        const valueInput = event.target.value;
        setSearchValue(valueInput);
        if (event.target.value === ''){
            setShowMenu('');
        }
    }
    async function handleClickSearchProduct(){
        console.log('huhu');
        let results = await searchProductName(searchValue)
        setSearchResultsCPU(results.products.filter(item => item.state != 'Đơn hàng'));
        setShowMenu("cpu");
    }

    async function handleSearchProductGPU(e){
        if (e.key === 'Enter') {
            let results = await searchProductName(searchValue)
            setSearchResultsGPU(results.products);
            setShowMenu('gpu');
        }
    }
    async function handleInputChangeGPU (event){
        const valueInput = event.target.value;
        setSearchValue(valueInput);
        if (event.target.value === ''){
            setShowMenu('');
        }
    }
    async function handleClickSearchProductGPU(){
        console.log('huhu');
        let results = await searchProductName(searchValue)
        setSearchResultsGPU(results.products);
        setShowMenu("gpu");
    }


    async function handleSearchProductRam(e){
        if (e.key === 'Enter') {
            let results = await searchProductName(searchValue)
            setSearchResultsRam(results.products);
            setShowMenu('ram');
        }
    }
    async function handleInputChangeRam (event){
        const valueInput = event.target.value;
        setSearchValue(valueInput);
        if (event.target.value === ''){
            setShowMenu('');
        }
    }
    async function handleClickSearchProductRam(){
        console.log('huhu');
        let results = await searchProductName(searchValue)
        setSearchResultsRam(results.products);
        setShowMenu("ram");
    }


    async function handleSearchProductSource(e){
        if (e.key === 'Enter') {
            let results = await searchProductName(searchValue)
            setSearchResultsSource(results.products);
            setShowMenu('source');
        }
    }
    async function handleInputChangeSource (event){
        const valueInput = event.target.value;
        setSearchValue(valueInput);
        if (event.target.value === ''){
            setShowMenu('');
        }
    }
    async function handleClickSearchProductSource(){
        console.log('huhu');
        let results = await searchProductName(searchValue)
        setSearchResultsSource(results.products);
        setShowMenu("source");
    }


    async function handleSearchProductDisk(e){
        if (e.key === 'Enter') {
            let results = await searchProductName(searchValue)
            setSearchResultsDisk(results.products);
            setShowMenu('disk');
        }
    }
    async function handleInputChangeDisk (event){
        const valueInput = event.target.value;
        setSearchValue(valueInput);
        if (event.target.value === ''){
            setShowMenu('');
        }
    }
    async function handleClickSearchProductDisk(){
        console.log('huhu');
        let results = await searchProductName(searchValue)
        setSearchResultsDisk(results.products);
        setShowMenu("disk");
    }


    async function handleSearchProductMain(e){
        if (e.key === 'Enter') {
            let results = await searchProductName(searchValue)
            setSearchResultsMain(results.products);
            setShowMenu('main');
        }
    }
    async function handleInputChangeMain (event){
        const valueInput = event.target.value;
        setSearchValue(valueInput);
        if (event.target.value === ''){
            setShowMenu('');
        }
    }
    async function handleClickSearchProductMain(){
        console.log('huhu');
        let results = await searchProductName(searchValue)
        setSearchResultsMain(results.products);
        setShowMenu("main");
    }


    const handleAddProductBuild = (item, type) => {
        console.log("haha", item);
        switch (type) {
            case "cpu":
                setCPU(item);
                break;
            case "gpu":
                setGPU(item);
                break;
            case "ram":
                setRam(item);
                break;
            case "main":
                setMain(item);
                break;
            case "disk":
                setDisk(item);
                break;
            case "source":
                setSource(item);
            default:
                break;
        }
        setShowModal('');
    }
    useEffect(()=>{
        getUserInfo()
        getResquest()
    },[])
    const getResquest = async () => {
        const request = await getRequestBuild(params.id);
        setRequestValue(request)
        console.log("hehe", request);
        setCPU(request.product.cpu != null ? request.product.cpu : "")
        setGPU(request.product.gpu != null ? request.product.gpu : "")
        setDisk(request.product.disk != null ? request.product.disk : "")
        setMain(request.product.main != null ? request.product.main : "")
        setRam(request.product.ram != null ? request.product.ram : "")
        setSource(request.product.source != null ? request.product.source : "")
    }
    async function getUserInfo (){
        let userID  = localStorage.getItem('userID')
        let user = await getUser(userID)
        console.log(user);
        setUser(user)
    }
    const convertObj = (item) => {
        let obj = {
            name: item.name,
            productID: item._id,
            price: item.price,
            imgProduct: item.imgURL,
            totalPrice: item.price,
            quantity: 1
        }
        return obj
    }

    const handleClickSendRequest = async (item) => {
        if (requestValue.state === "Đơn hàng"){

            return alertSuccess({ status: 'error', text: `Đơn hàng đã được thêm` })
        }
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

        if (order && request) {
            alertSuccess({ status: 'success', text: `Đã thêm đơn hàng thành công` })
        }

        console.log("req", request);

        console.log("order", order);
        console.log("hahah", formData);
    }
    // const handleClickSendRequest = async () => {
    //     // const products = [];
    //     // if (cpu !== '') products.push(convertObj(cpu));
    //     // if (gpu !== '') products.push(convertObj(gpu));
    //     // if (source !== '') products.push(convertObj(source));
    //     // if (ram !== '') products.push(convertObj(ram));
    //     // if (main !== '') products.push(convertObj(main));
    //     // if (disk !== '') products.push(convertObj(disk));
    //     const products = {
    //         cpu: cpu != '' ? convertObj(cpu) : null,
    //         gpu: gpu != '' ? convertObj(gpu) : null,
    //         disk: disk != '' ? convertObj(disk) : null,
    //         main: main != '' ? convertObj(main) : null,
    //         source: source != '' ? convertObj(source) : null,
    //         ram: ram != '' ? convertObj(ram) : null,
    //     }
    //     const data = {
    //         product: products,
    //         state:  "Đang xử lí",
    //         userID: user._id,
    //         name: user.name,
    //         avatarURL: user.avatarURL
    //     }
    //     const request = await createRequestBuild(JSON.stringify(data))
    //     if (request){
    //         setCPU("")
    //         setGPU("")
    //         setRam("")
    //         setDisk("")
    //         setMain("")
    //         setSource("")
    //         alertSuccess({ status: 'success', text: `Đã gửi yêu cầu thành công` })
    //     }
    //     console.log("data", data);
    //     // console.log("req", request);
    // }


  return (
    <div className='m-5 bg-white rounded'>
        <div className='flex flex-col p-4 w-full items-start'>
            <div className='text-2xl font-bold '>
                Tùy chọn cấu hình
            </div>
            <div className='rounded bg-slate-100 p-4 mt-3 text-lg'>
                {/* {JSON.stringify(requestValue)} */}
                <p>Tên khách hàng: {requestValue?.name}</p>
                <p>Email: {requestValue?.email}</p>
                <p>Số điện thoại: {requestValue?.phone}</p>
                <p>Mã yêu cầu: {requestValue?._id}</p>
            </div>
            {/* <div className='mt-5 mb-5 bg-blue-500 text-white text-bold p-2 rounded cursor-pointer' onClick={()=>handleClickSendRequest(requestValue)}>
                Tạo đơn hàng
            </div> */}
        </div>
        <div className='w-full flex flex-row h-full'>
            <div className='flex flex-col justify-center h-full w-1/3 gap-36 mt-48'>
                <div className='w-full flex justify-center'>
                    <div className='p-2 w-fit' style={{backgroundColor: "#f5f5f5"}}>
                        <div className='flex flex-col w-full justify-center'>
                            {cpu !== '' ? 
                            <div className='w-full flex justify-center'>
                                <ProductCardBuild product={cpu} setStateFn={setCPU}></ProductCardBuild>
                            </div>:
                            <div style={{ pointerEvents: 'none' }}>
                                <ProductCardBuildOpen type={'cpu'} openFn={openModal}></ProductCardBuildOpen>
                            </div>
                            
                            }
                        </div>
                        {
                            showModal === 'cpu' &&                
                            <div className='flex justify-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='relative' style={{width: '300px'}}>
                                        <Search fnSearch={handleSearchProduct} fnChange={handleInputChange} fnClickSearch={handleClickSearchProduct}/>
                                    </div>
                                    <button onClick={closeModal} className='font-bold text-lg text-red-600'>X</button>
                                </div>

                                {showMenu === 'cpu' && (
                                    <div className='menu absolute bg-slate-50 rounded p-3 mt-12' style={{ zIndex: 9999 }}>
                                        <div>
                                            {
                                                searchResultsCPU && searchResultsCPU.length > 0 ? (searchResultsCPU.slice(0, 5).map((item, index)=>(
                                                    <div key={index} className='mt-2 hover:bg-slate-200 flex items-center p-2'>
                                                        <ResultProductSearchItem fnAddBuild={handleAddProductBuild} type={'cpu'} item={item}></ResultProductSearchItem>
                                                        <hr />
                                                    </div>
                                                ))) : (
                                                    <div className='mt-2 p-2 flex items-center'>
                                                        <span>Không có kết quả tìm kiếm</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
        
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <div className='p-2 w-fit' style={{backgroundColor: "#f5f5f5"}}>
                        <div className='flex flex-col w-full justify-center'>
                            {gpu !== '' ? 
                            <div className='w-full flex justify-center'>
                                <ProductCardBuild product={gpu} setStateFn={setGPU}></ProductCardBuild>
                            </div>:
                            <div className='w-full flex justify-center' style={{ pointerEvents: 'none' }}>
                                <ProductCardBuildOpen type={'gpu'} openFn={openModal}></ProductCardBuildOpen>
                            </div>}
                        </div>
                        {
                            showModal === 'gpu' &&                
                            <div className='flex justify-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='relative' style={{width: '300px'}}>
                                        <Search fnSearch={handleSearchProductGPU} fnChange={handleInputChangeGPU} fnClickSearch={handleClickSearchProductGPU}/>
                                    </div>
                                    <button onClick={closeModal} className='font-bold text-lg text-red-600'>X</button>
                                </div>

                                {showMenu === 'gpu' && (
                                    <div className='menu absolute bg-slate-50 rounded p-3 mt-12' style={{ zIndex: 9999 }}>
                                        <div>
                                            {
                                                searchResultsGPU && searchResultsGPU.length > 0 ? (searchResultsGPU.slice(0, 5).map((item, index)=>(
                                                    <div key={index} className='mt-2 hover:bg-slate-200 flex items-center p-2'>
                                                        <ResultProductSearchItem fnAddBuild={handleAddProductBuild} type={'gpu'} item={item}></ResultProductSearchItem>
                                                        <hr />
                                                    </div>
                                                ))) : (
                                                    <div className='mt-2 p-2 flex items-center'>
                                                        <span>Không có kết quả tìm kiếm</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                        }
        
                    </div>
                </div>
            </div>
            <div className='w-1/3 h-full justify-center flex flex-col gap-28 p-5'>
                <div className='w-full flex justify-center'>
                    <div className='p-2 w-fit' style={{backgroundColor: "#f5f5f5"}}>
                        <div className='flex flex-col w-full justify-center'>
                            {ram !== '' ? 
                            <div className='w-full flex justify-center'>
                                <ProductCardBuild product={ram} setStateFn={setRam}></ProductCardBuild>
                            </div>:
                            <div style={{ pointerEvents: 'none' }}>
                                <ProductCardBuildOpen type={'ram'} openFn={openModal}></ProductCardBuildOpen>
                            </div>
                            }
                        </div>
                        {
                            showModal === 'ram' &&                
                            <div className='flex justify-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='relative' style={{width: '300px'}}>
                                        <Search fnSearch={handleSearchProductRam} fnChange={handleInputChangeRam} fnClickSearch={handleClickSearchProductRam}/>
                                    </div>
                                    <button onClick={closeModal} className='font-bold text-lg text-red-600'>X</button>
                                </div>

                                {showMenu === 'ram' && (
                                    <div className='menu absolute bg-slate-50 rounded p-3 mt-12' style={{ zIndex: 9999 }}>
                                        <div>
                                            {
                                                searchResultsRam && searchResultsRam.length > 0 ? (searchResultsRam.slice(0, 5).map((item, index)=>(
                                                    <div key={index} className='mt-2 hover:bg-slate-200 flex items-center p-2'>
                                                        <ResultProductSearchItem fnAddBuild={handleAddProductBuild} type={'ram'} item={item}></ResultProductSearchItem>
                                                        <hr />
                                                    </div>
                                                ))) : (
                                                    <div className='mt-2 p-2 flex items-center'>
                                                        <span>Không có kết quả tìm kiếm</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                        }
        
                    </div>
                </div>
                <img src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fpc.jpg?alt=media&token=09cc34e1-d1a4-4e7a-8a8e-bfb7ed4d1c73" alt="" style={{width: 300, height: 300}}/>
                <div className='w-full flex justify-center'>
                    <div className='p-2 w-fit' style={{backgroundColor: "#f5f5f5"}}>
                        <div className='flex flex-col w-full justify-center'>
                            {main !== '' ? 
                            <div className='w-full flex justify-center'>
                                <ProductCardBuild product={main} setStateFn={setMain}></ProductCardBuild>
                            </div>:
                            <div style={{ pointerEvents: 'none' }}>
                                <ProductCardBuildOpen type={'main'} openFn={openModal}></ProductCardBuildOpen>
                            </div>
                            }
                        </div>
                        {
                            showModal === 'main' &&                
                            <div className='flex justify-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='relative' style={{width: '300px'}}>
                                        <Search fnSearch={handleSearchProductMain} fnChange={handleInputChangeMain} fnClickSearch={handleClickSearchProductMain}/>
                                    </div>
                                    <button onClick={closeModal} className='font-bold text-lg text-red-600'>X</button>
                                </div>

                                {showMenu === 'main' && (
                                    <div className='menu absolute bg-slate-50 rounded p-3 mt-12' style={{ zIndex: 9999 }}>
                                        <div>
                                            {
                                                searchResultsMain && searchResultsMain.length > 0 ? (searchResultsMain.slice(0, 5).map((item, index)=>(
                                                    <div key={index} className='mt-2 hover:bg-slate-200 flex items-center p-2'>
                                                        <ResultProductSearchItem fnAddBuild={handleAddProductBuild} type={'main'} item={item}></ResultProductSearchItem>
                                                        <hr />
                                                    </div>
                                                ))) : (
                                                    <div className='mt-2 p-2 flex items-center'>
                                                        <span>Không có kết quả tìm kiếm</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                        }
        
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center h-full w-1/3 gap-36 mt-48'>
                <div className='w-full flex justify-center'>
                    <div className='p-2 w-fit' style={{backgroundColor: "#f5f5f5"}}>
                        <div className='flex flex-col w-full justify-center'>
                            {source !== '' ? 
                            <div className='w-full flex justify-center'>
                                <ProductCardBuild product={source} setStateFn={setSource}></ProductCardBuild>
                            </div>:
                            <div style={{ pointerEvents: 'none' }}>
                                <ProductCardBuildOpen type={'source'} openFn={openModal}></ProductCardBuildOpen>
                            </div>
                           }
                        </div>
                        {
                            showModal === 'source' &&                
                            <div className='flex justify-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='relative' style={{width: '300px'}}>
                                        <Search fnSearch={handleSearchProductSource} fnChange={handleInputChangeSource} fnClickSearch={handleClickSearchProductSource}/>
                                    </div>
                                    <button onClick={closeModal} className='font-bold text-lg text-red-600'>X</button>
                                </div>

                                {showMenu === 'source' && (
                                    <div className='menu absolute bg-slate-50 rounded p-3 mt-12' style={{ zIndex: 9999 }}>
                                        <div>
                                            {
                                                searchResultsSource && searchResultsSource.length > 0 ? (searchResultsSource.slice(0, 5).map((item, index)=>(
                                                    <div key={index} className='mt-2 hover:bg-slate-200 flex items-center p-2'>
                                                        <ResultProductSearchItem fnAddBuild={handleAddProductBuild} type={'source'} item={item}></ResultProductSearchItem>
                                                        <hr />
                                                    </div>
                                                ))) : (
                                                    <div className='mt-2 p-2 flex items-center'>
                                                        <span>Không có kết quả tìm kiếm</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                        }
        
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <div className='p-2 w-fit' style={{backgroundColor: "#f5f5f5"}}>
                        <div className='flex flex-col w-full justify-center'>
                            {disk !== '' ? 
                            <div className='w-full flex justify-center'>
                                <ProductCardBuild product={disk} setStateFn={setDisk}></ProductCardBuild>
                            </div>:
                            <div style={{ pointerEvents: 'none' }}>
                                <ProductCardBuildOpen type={'disk'} openFn={openModal}></ProductCardBuildOpen>
                            </div>
                            }
                        </div>
                        {
                            showModal === 'disk' &&                
                            <div className='flex justify-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='relative' style={{width: '300px'}}>
                                        <Search fnSearch={handleSearchProductDisk} fnChange={handleInputChangeDisk} fnClickSearch={handleClickSearchProductDisk}/>
                                    </div>
                                    <button onClick={closeModal} className='font-bold text-lg text-red-600'>X</button>
                                </div>

                                {showMenu === 'disk' && (
                                    <div className='menu absolute bg-slate-50 rounded p-3 mt-12' style={{ zIndex: 9999 }}>
                                        <div>
                                            {
                                                searchResultsDisk && searchResultsDisk.length > 0 ? (searchResultsDisk.slice(0, 5).map((item, index)=>(
                                                    <div key={index} className='mt-2 hover:bg-slate-200 flex items-center p-2'>
                                                        <ResultProductSearchItem fnAddBuild={handleAddProductBuild} type={'disk'} item={item}></ResultProductSearchItem>
                                                        <hr />
                                                    </div>
                                                ))) : (
                                                    <div className='mt-2 p-2 flex items-center'>
                                                        <span>Không có kết quả tìm kiếm</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                        }
        
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='flex justify-center'>
            <div className='mt-5 mb-5 bg-blue-500 text-white text-bold p-2 rounded cursor-pointer' onClick={handleClickSendRequest}>
                Gửi yêu cầu
            </div>
        </div> */}
    </div>
  )
}
