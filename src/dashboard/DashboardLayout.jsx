import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarDash from './SidebarDash'

const DashboardLayout = () => {
  return (
    <div className='flex gap-6'>
        <SidebarDash/>
        <Outlet/>
    </div>
  )
}

export default DashboardLayout