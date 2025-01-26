import { NavLink } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { IoWalletOutline } from 'react-icons/io5';

export default function AdminSidebar() {
  return (
    <div className="hidden lg:flex flex-col w-64 h-screen bg-[#424242b7] fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold text-white">
            <img src="/Vivstock_logo__1_-removebg-preview 1 197.png" className='w-[38px]' /> 
            Vivstock Admin
          </h1>
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-[#7F3DFF] text-white' : 'text-gray-400 hover:bg-[#1E1E1E] hover:text-white'
              }`
            }
          >
            <FaUsers size={20} />
            <span className="font-medium">Users</span>
          </NavLink>
          <NavLink
            to="/admin/payments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-[#7F3DFF] text-white' : 'text-gray-400 hover:bg-[#1E1E1E] hover:text-white'
              }`
            }
          >
            <MdPayment size={20} />
            <span className="font-medium">Payments</span>
          </NavLink>
          <NavLink
            to="/admin/stocks"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-[#7F3DFF] text-white' : 'text-gray-400 hover:bg-[#1E1E1E] hover:text-white'
              }`
            }
          >
            <BiTransfer size={20} />
            <span className="font-medium">Stocks</span>
          </NavLink>
          <NavLink
            to="/admin/wallet"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-[#7F3DFF] text-white' : 'text-gray-400 hover:bg-[#1E1E1E] hover:text-white'
              }`
            }
          >
            <IoWalletOutline size={20} />
            <span className="font-medium">Wallet</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}