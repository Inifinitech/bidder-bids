import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className='flex min-h-screen'>
    <div className='className="w-64 fixed top-0 left-0 h-full bg-gray-800'>
      <Sidebar />
    </div>
      <div className='flex-1 ml-0 md:ml-64 bg-gray-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
