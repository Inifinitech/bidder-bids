import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  LogOut,
  ShoppingBasket,
} from 'lucide-react';


function Sidebar({}) {
    const navigate = useNavigate()

    const navItems = [
            {icon: LayoutDashboard, label: 'Dashboard', path: '/admin'},
            {icon: ShoppingBasket, label: 'Products', path: '/'},
        ]

        return (
            <div className='text-white w-64 p-4'>
                <h1 className='text-2xl font-semibold py-3 px-2'>Bidders-bid</h1>
            <div>
                <nav className='space-y-2'>
                    {navItems.map((navItem) => (
                        <NavLink 
                            key={navItem.path}
                            to={navItem.path}
                            className={({isActive}) => 
                            `flex items-center px-4 gap-3 py-2 mb-4 rounded-lg transition-colors ${isActive ? 'bg-red-500 text-gray-900 ' : 'hover: bg-gray-600'}`}
                        >
                            <navItem.icon className='w-5 h-5' />
                            <span>{navItem.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
        )
}

export default Sidebar;