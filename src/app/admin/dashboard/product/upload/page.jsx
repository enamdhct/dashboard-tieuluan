// 'use client'
// import React, { useState, useTransition } from 'react'
// import {ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 } from 'uuid';
// import {storage} from './config'


// export default function page() {
//     const [imgUp,setImgUp] = useState(null);
//     const [isPenđing, startTransition] = useTransition();
//     const [linkIMG,setLinkIMG] = useState('');
//     const handleImageUpload = (e) => {
//       startTransition(()=>{
//         if(e.target.files[0] == null) return;
//         // console.log(e.target.files[0]);
//         const imgRef = ref(storage, `images/${e.target.files[0].name + v4()}`)
//         uploadBytes(imgRef, e.target.files[0]).then( async ()=>{
//           const downloadURL = await getDownloadURL(imgRef);
//           setLinkIMG(downloadURL)
//           alert(downloadURL)
//         })
//       })
//     }
//   return (
//     <div>
//         {/* <input type="file" accept="image/*" onChange={(e)=>{setImgUp(e.target.files[0])}}/>
//         <button onClick={handleImageUpload}>hehe</button> */}
//         <input type="file" accept="image/*" onChange={(e)=>{handleImageUpload(e)}}/>
//     </div>
//   )
// }
