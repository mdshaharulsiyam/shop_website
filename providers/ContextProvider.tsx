"use client"
import { valid_theme } from '@/constant/variable'
import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useContext } from 'react'

const globalContext = createContext(null)
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  const router = useRouter()
  if (!valid_theme.includes(pathName?.split('/')[1])) {
    return router.push('/light')
  }
  return (
    <globalContext.Provider value={null}>
      {children}
    </globalContext.Provider>
  )
}

export default ContextProvider
export const useGlobalContext = () => useContext(globalContext)
