import { createContext, useContext } from 'react'

export interface NavContextType {
  currentPage: number
  total: number
  goTo: (index: number) => void
  goNext: () => void
  goPrev: () => void
}

export const NavContext = createContext<NavContextType>({
  currentPage: 0,
  total: 0,
  goTo: () => {},
  goNext: () => {},
  goPrev: () => {},
})

export const useNav = () => useContext(NavContext)
