import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyCMrP22fwlOeQratQPEJGm59SvWjLiVyCM",
//     authDomain: "argishop-cab9c.firebaseapp.com",
//     projectId: "argishop-cab9c",
//     storageBucket: "argishop-cab9c.appspot.com",
//     messagingSenderId: "295423283087",
//     appId: "1:295423283087:web:addc0d9ae8338b125fc5fa",
//     measurementId: "G-LPT3D2WEHE"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyAZc_7B7TJodm2IhQ1Z4635s3XVEM5W2mg",
    authDomain: "pc-shop-9d595.firebaseapp.com",
    projectId: "pc-shop-9d595",
    storageBucket: "pc-shop-9d595.appspot.com",
    messagingSenderId: "348100259156",
    appId: "1:348100259156:web:a7befce23d73e9d3bcacc1",
    measurementId: "G-TPT0GQR8DF"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
export const storage = getStorage(app);