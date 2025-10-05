"use client"
import { colors } from '@/constant/colors'
import { useGetProfileQuery } from '@/Redux/apis/authSlice'
import type { IContextData } from '@/types/propsTypes'
import React, { createContext, useContext, useEffect, useState } from 'react'

const globalContext = createContext<IContextData | null>(null)
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {data}=useGetProfileQuery(undefined)
  const [values, setValues] = useState<IContextData>({
    theme: "",
    themeColor: colors.light,
    width: 0,
    height: 0,
    user:data?.data
  })
  useEffect(() => {
    if (typeof window != 'undefined') {

      const userTheme: string = localStorage.getItem('theme') ?? "light"

      setValues((prev) => ({
        ...prev,
        themeColor: colors[userTheme as keyof typeof colors],
        width: window.innerWidth,
        height: window.innerHeight
      }))
    }
  }, [])
useEffect(()=>{
  setValues((prev)=>({
    ...prev,
    user:data?.data
  }))
},[data])
  return (
    <globalContext.Provider value={values}>
      {children}
    </globalContext.Provider>
  )
}

export default ContextProvider

export const useGlobalContext = (): IContextData => {
  const context = useContext(globalContext);
  if (!context)
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  return context;
};
