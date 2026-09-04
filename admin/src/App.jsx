import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { GiChefToque } from 'react-icons/gi';
import { FiPlusSquare, FiList, FiShoppingBag } from 'react-icons/fi';
import AddItem    from './pages/AddItem';
import ListItems  from './pages/ListItems';
import Orders     from './pages/Orders';

const navLinks = [
  { to: '/add',    label: 'Add Item',  icon: FiPlusSquare  },
  { to: '/list',   label: 'Food List', icon: FiList        },
  { to: '/orders', label: 'Orders',    icon: FiShoppingBag },
];

const App = () => (
  <div className='min-h-screen flex flex-col'>
    {/* Top bar */}
    <header className='bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center gap-3 sticky top-0 z-10'>
      <GiChefToque className='text-amber-400 text-3xl' />
      <h1 className='text-xl font-bold text-amber-300 tracking-wide'>Chai-Gpt Admin</h1>
    </header>

    <div className='flex flex-1'>
      {/* Sidebar */}
      <aside className='w-56 bg-slate-900 border-r border-slate-700 flex flex-col gap-1 p-4 shrink-0'>
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`
            }
          >
            <Icon size={18} />{label}
          </NavLink>
        ))}
      </aside>

      {/* Main content */}
      <main className='flex-1 p-6 bg-slate-950 overflow-y-auto'>
        <Routes>
          <Route path='/'       element={<Navigate to='/add' replace />} />
          <Route path='/add'    element={<AddItem />} />
          <Route path='/list'   element={<ListItems />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default App;
