import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />

      <div className='flex-1 ml-0 md:ml-64 bg-gray-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />

      <div className='flex-1 ml-0 md:ml-64 bg-gray-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
