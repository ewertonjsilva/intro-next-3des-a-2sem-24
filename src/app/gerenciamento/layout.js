// import Navbar from './navbar'
// import Footer from './footer'

import MenuGerenciamento from "@/componentes/menuGerenciamento"
 
export default function Layout({ children }) {
  return (
    <div className="containerMenuLateral">
      <MenuGerenciamento />
      <main>{children}</main>
      
    </div>
  )
}