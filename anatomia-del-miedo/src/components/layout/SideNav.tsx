import { useState } from 'react'
import { useNav } from '../../context/NavigationContext'
import styles from './SideNav.module.css'

const NAV_ITEMS = [
  { label: 'Inicio' },
  { label: 'Cap. I' },
  { label: 'Cap. II' },
  { label: 'Cap. III' },
  { label: 'Cap. IV' },
  { label: 'Cap. V' },
  { label: 'Cierre' },
]

export function SideNav() {
  const { currentPage, goTo } = useNav()
  const [open, setOpen] = useState(false)

  const handleNav = (index: number) => {
    goTo(index)
    setOpen(false)
  }

  return (
    <>
      <button
        className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`${styles.nav} ${open ? styles.navOpen : ''}`}
        aria-label="Navegación principal"
      >
        <span className={styles.logo} aria-hidden="true">A·M</span>
        <ul className={styles.links} role="list">
          {NAV_ITEMS.map(({ label }, index) => (
            <li key={index}>
              <button
                className={`${styles.link} ${currentPage === index ? styles.linkActive : ''}`}
                onClick={() => handleNav(index)}
                aria-current={currentPage === index ? 'page' : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
