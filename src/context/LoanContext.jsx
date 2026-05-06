import { createContext, useContext, useState } from 'react'

const LoanContext = createContext()

export function LoanProvider({ children }) {
  const [amount, setAmount] = useState(5200000)
  const [term, setTerm] = useState(12)

  const value = {
    amount,
    setAmount,
    term,
    setTerm,
  }

  return (
    <LoanContext.Provider value={value}>
      {children}
    </LoanContext.Provider>
  )
}

export function useLoan() {
  return useContext(LoanContext)
}