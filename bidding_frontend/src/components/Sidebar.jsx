import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  ShoppingBasket, 
} from 'lucide-react';

const navigate = useNavigate()
const navItems = [
    {icon: LayoutDashboard, label: 'Dashboard', path: '/admin'},
    {icon: ShoppingBasket, label: 'Products', path: '/'}
]


function Sidebar() {
    <div>
        <div>
            {navItems.map(() => {
                <NavLink 
                    to={path}
                />
            })}
        </div>
    </div>
}

export default Sidebar;