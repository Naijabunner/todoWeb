import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../SideBar'

const TodoLayout = () => {
  return (
   <section className="Container w-screen  max-w-screen-xl mt-10 mx-auto max-lg:flex-col flex items-start justify-start gap-12 ">
      <SideBar/>
      <Outlet />
   </section>
  )
}

export default TodoLayout