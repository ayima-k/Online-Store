import React from "react";
import cls from './Layout.module.scss'

const Layout = ({children}) => {
  return (
    <div className={cls.layout}>
      {children}
    </div>
  )
}
export default Layout