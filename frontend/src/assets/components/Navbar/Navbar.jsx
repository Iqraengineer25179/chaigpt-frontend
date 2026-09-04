import React, { useEffect, useState } from 'react';
import { GiChefToque, GiForkKnifeSpoon } from 'react-icons/gi';
import { FiHome, FiBook, FiInfo, FiPhone, FiShoppingCart, FiLogOut, FiKey, FiPackage } from 'react-icons/fi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../../context/StoreContext';
import Login from '../Login/Login';

const navItems = [
  { name: 'Home',    to: '/',       icon: FiHome },
  { name: 'Menu',    to: '/menu',   icon: FiBook },
  { name: 'About',   to: '/about',  icon: FiInfo },
  { name: 'Contact', to: '/contact',icon: FiPhone },
];

const Navbar = () => {
  const { token, logout, cartItems } = useStore();
  const totalIcons = cartItems?.reduce((t, i) => t + (i.quantity || 1), 0) || 0;

  const [isOpen, setIsOpen] = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setShowLoginModal(location.pathname === '/login');
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const AuthButtonDesktop = () =>
    token ? (
      <div className='hidden md:flex items-center gap-2'>
        <button
          onClick={() => navigate('/myorders')}
          className='p-3 md:px-3 lg:px-4 py-1.5 bg-amber-900/40 border border-amber-700/40 text-amber-100 rounded-2xl font-bold hover:bg-amber-800/50 transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer'
        >
          <FiPackage className='text-base' />
          <span>My Orders</span>
        </button>
        <button
          onClick={handleLogout}
          className='p-3 md:px-3 lg:px-6 py-1.5 bg-gradient-to-r from-amber-500 to-amber-700 text-[#2D180E] rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-600/40 transition-all transform hover:scale-[1.02] border-2 border-amber-600/20 flex items-center gap-2 text-xs md:text-sm cursor-pointer'
        >
          <FiLogOut className='text-base md:text-lg' />
          <span>Logout</span>
        </button>
      </div>
    ) : (
      <button
        onClick={() => navigate('/login')}
        className='hidden md:flex p-3 md:px-3 lg:px-6 py-1.5 bg-gradient-to-r from-amber-500 to-amber-700 text-[#2D180E] rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-600/40 transition-all transform hover:scale-[1.02] border-2 border-amber-600/20 items-center gap-2 text-xs md:text-sm cursor-pointer'
      >
        <FiKey className='text-base md:text-lg' />
        <span>Login</span>
      </button>
    );

  const AuthButtonMobile = () =>
    token ? (
      <>
        <button
          onClick={() => { navigate('/myorders'); setIsOpen(false); }}
          className='w-full px-4 py-3 bg-amber-900/40 border border-amber-700/40 text-amber-100 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm cursor-pointer'
        >
          <FiPackage /><span>My Orders</span>
        </button>
        <button
          onClick={() => { handleLogout(); setIsOpen(false); }}
          className='w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D180E] rounded-xl font-semibold flex items-center justify-center gap-2 text-sm cursor-pointer'
        >
          <FiLogOut /><span>Logout</span>
        </button>
      </>
    ) : (
      <button
        onClick={() => { navigate('/login'); setIsOpen(false); }}
        className='w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D180E] rounded-xl font-semibold flex items-center justify-center gap-2 text-sm cursor-pointer'
      >
        <FiKey /><span>Login</span>
      </button>
    );

  return (
    <nav className='bg-[#2D180E] border-b-8 border-amber-900/30 shadow-amber-900/30 sticky top-0 z-50 shadow-[0_25px_50px_-12px] font-vibes group/nav overflow-x-hidden'>
      <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4'>
        <div className='h-[6px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent shadow-[0_0_20px] shadow-amber-500/30'>
          <div className='flex justify-between px-6'>
            <GiForkKnifeSpoon className='text-amber-400 -mt-4 -ml-2 rotate-45' size={32} />
            <GiForkKnifeSpoon className='text-amber-400 -mt-4 -mr-2 rotate-45' size={32} />
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 relative'>
        <div className='flex justify-between items-center h-16 md:h-20 lg:h-24'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center space-x-2 group relative md:translate-x-4 lg:-translate-x-4 ml-0 md:ml-2'>
            <div className='absolute inset-0 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300' />
            <div className='flex items-center space-x-3 relative z-10'>
              <GiChefToque className='text-3xl md:text-4xl lg:text-5xl text-amber-400 transition-all group-hover:rotate-12 group-hover:text-amber-300' />
              <NavLink to='/' className='text-amber-400 text-lg md:text-xl lg:text-2xl font-bold transition-all group-hover:text-amber-300'>
                Chai-Gpt
              </NavLink>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className='hidden md:flex items-center gap-3 md:gap-4'>
            {navItems.map(({ name, to, icon: Icon }) => (
              <NavLink key={name} to={to}
                className={({ isActive }) =>
                  `group relative flex items-center gap-2 rounded-full border border-amber-600/60 px-3 py-2 text-xs md:text-sm font-medium text-amber-200 transition-all duration-300 hover:border-amber-300 hover:text-amber-100 ${isActive ? 'border-amber-300 bg-amber-900/20' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className='text-sm md:text-base' />
                    <span>{name}</span>
                    <span className={`absolute -bottom-1 left-2 right-2 h-[2px] rounded-full bg-amber-300 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className='flex items-center gap-3'>
            <AuthButtonDesktop />

            <NavLink to='/cart'
              className='relative p-2 md:p-2.5 lg:p-3 rounded-xl text-amber-100 transition-all border-2 border-amber-900/30 hover:border-amber-600/50 hover:bg-amber-900/20 hover:shadow-lg hover:shadow-amber-500/30 shadow-md shadow-amber-900/20'
            >
              <FiShoppingCart className='text-base md:text-lg' />
              {totalIcons > 0 && (
                <span className='absolute -top-2 -right-2 bg-amber-500 text-amber-100 text-xs w-5 h-5 font-bold rounded-full flex items-center justify-center'>
                  {totalIcons}
                </span>
              )}
            </NavLink>

            {/* Mobile hamburger */}
            <div className='md:hidden flex items-center ml-2'>
              <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className='text-amber-500 hover:text-amber-300 focus:outline-none transition-all p-2 rounded-xl border-2 border-amber-900/30 hover:border-amber-600/50 shadow-md shadow-amber-900/20 cursor-pointer'
              >
                <div className='space-y-2 relative'>
                  <span className={`block w-6 h-[2px] bg-current transition-all ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block w-6 h-[2px] bg-current ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-6 h-[2px] bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden bg-[#2D180E] border-t-4 border-amber-900/40 shadow-lg shadow-amber-900/30 w-full'>
          <div className='px-4 py-4 space-y-2'>
            {navItems.map(({ name, to, icon: Icon }) => (
              <NavLink key={name} to={to} onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${isActive ? 'bg-amber-600/30 text-amber-400 border border-amber-600/50' : 'text-amber-100 hover:bg-amber-600/20 border border-amber-900/30'}`
                }
              >
                <Icon className='text-base' /><span>{name}</span>
              </NavLink>
            ))}
            <div className='pt-2 space-y-2'><AuthButtonMobile /></div>
          </div>
        </div>
      )}

      {/* Login modal (triggered by /login route) */}
      {showLoginModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4'>
          <div className='bg-gradient-to-br from-[#2D180E] to-[#4a372a] p-6 rounded-xl w-full max-w-[480px] relative border-4 border-amber-700/30 shadow-[0_0_30px] shadow-amber-500/30'>
            <button onClick={() => navigate('/')} className='absolute top-2 right-2 text-amber-500 hover:text-amber-300 text-2xl cursor-pointer'>
              &times;
            </button>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4 text-center'>
              Chai-Gpt
            </h2>
            <Login onClose={() => navigate('/')} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
