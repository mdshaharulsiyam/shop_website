import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import ContextProvider from './providers/ContextProvider.tsx'
import store from './Redux/store.ts'
import { router } from './routes/Routes.tsx'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </ContextProvider>
    </Provider>
  </StrictMode>,
)


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCMtslSk_Dezxa6knjEMCSxKZYm2iQ39Zk",
//   authDomain: "multivendor-shop-8c79d.firebaseapp.com",
//   projectId: "multivendor-shop-8c79d",
//   storageBucket: "multivendor-shop-8c79d.firebasestorage.app",
//   messagingSenderId: "912381620809",
//   appId: "1:912381620809:web:344b08f00d64386619c598"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);