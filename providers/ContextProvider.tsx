"use client"
import React, { createContext, useContext } from 'react'

const globalContext = createContext(null)
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <globalContext.Provider value={null}>
      {children}
    </globalContext.Provider>
  )
}

export default ContextProvider
export const useGlobalContext = () => useContext(globalContext)
