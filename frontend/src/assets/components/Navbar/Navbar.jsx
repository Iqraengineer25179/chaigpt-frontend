import React, { useEffect, useState, useRef } from 'react';
import { GiChefToque, GiForkKnifeSpoon } from 'react-icons/gi';
import { FiHome, FiBook, FiInfo, FiPhone, FiShoppingCart, FiLogOut, FiKey, FiPackage, FiSearch, FiX } from 'react-icons/fi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../../context/StoreContext';
import Login from '../Login/Login';

const navItems = [
  { name: 'Home',    to: '/',        icon: FiHome  },
  { name: 'Menu',    to: '/menu',    icon: FiBook  },
  { name: 'About',   to: '/about',   icon: FiInfo  },
  { name: 'Contact', to: '/contact', icon: FiPhone },
];

const Navbar = () => {
  const { token, logout, cartItems, food_list, url } = useStore();
  const totalIcons = cartItems?.reduce((t, i) => t + (i.quantity || 1), 0) || 0;

  const [isOpen, setIsOpen]               = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery]      = useState('');
  const [searchResults, setSearchResults]  = useState([]);
  const [showResults, setShowResults]      = useState(false);
  const searchRef                          = useRef(null);

  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    setShowLoginModal(location.pathname === '/login');
  }, [location.pathname]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search — filter food_list on every keystroke
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const q = query.toLowerCase();
    const matches = food_list.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    ).slice(0, 6); // max 6 results in dropdown
    setSearchResults(matches);
    setShowResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  // Navigate to menu page with the search term when user picks a result
  const handleResultClick = (item) => {
    clearSearch();
    navigate('/menu');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Helper: get correct image src
  const getImgSrc = (item) =>
    item.isStatic ? item.image : `${url}/images/${item.image}`;

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
      {/* Decorative top line */}
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

          {/* ── Logo ── */}
          <div className='flex-shrink-0 flex items-center space-x-2 group relative md:translate-x-4 lg:-translate-x-4 ml-0 md:ml-2'>
            <div className='absolute inset-0 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300' />
            <div className='flex items-center space-x-3 relative z-10'>
              <GiChefToque className='text-3xl md:text-4xl lg:text-5xl text-amber-400 transition-all group-hover:rotate-12 group-hover:text-amber-300' />
              <NavLink to='/' className='text-amber-400 text-lg md:text-xl lg:text-2xl font-bold transition-all group-hover:text-amber-300'>
                Chai-Gpt
              </NavLink>
            </div>
          </div>

          {/* ── Desktop nav links ── */}
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

          {/* ── Right side: Search + Auth + Cart ── */}
          <div className='flex items-center gap-2 md:gap-3'>

            {/* ── Live Search Bar ── */}
            <div ref={searchRef} className='relative'>
              <div className='flex items-center gap-1 bg-amber-900/30 border border-amber-700/40 rounded-xl px-2 py-1.5 focus-within:border-amber-400 transition-all'>
                <FiSearch className='text-amber-400 text-sm flex-shrink-0' />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => searchQuery && setShowResults(true)}
                  placeholder='Search food...'
                  className='bg-transparent text-amber-100 placeholder-amber-500/60 text-xs md:text-sm outline-none w-24 md:w-36 lg:w-48'
                />
                {searchQuery && (
                  <button onClick={clearSearch} className='text-amber-500 hover:text-amber-300'>
                    <FiX size={14} />
                  </button>
                )}
              </div>

              {/* ── Search Results Dropdown ── */}
              {showResults && (
                <div className='absolute top-full mt-2 left-0 right-0 min-w-[280px] bg-[#2D180E] border border-amber-700/40 rounded-xl shadow-2xl shadow-amber-900/50 overflow-hidden z-50'>
                  {searchResults.length === 0 ? (
                    <p className='px-4 py-3 text-amber-400/60 text-sm font-cinzel'>
                      No items found for "{searchQuery}"
                    </p>
                  ) : (
                    <>
                      <p className='px-4 py-2 text-amber-500/60 text-xs font-cinzel uppercase tracking-wider border-b border-amber-800/30'>
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </p>
                      {searchResults.map(item => (
                        <button
                          key={item._id}
                          onClick={() => handleResultClick(item)}
                          className='w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-900/30 transition-colors text-left border-b border-amber-900/20 last:border-0'
                        >
                          <img
                            src={getImgSrc(item)}
                            alt={item.name}
                            className='w-10 h-10 rounded-lg object-contain bg-amber-900/20 flex-shrink-0'
                            onError={e => { e.target.style.opacity = '0.3'; }}
                          />
                          <div className='min-w-0'>
                            <p className='text-amber-100 text-sm font-semibold truncate'>{item.name}</p>
                            <p className='text-amber-400/60 text-xs font-cinzel'>
                              {item.category} · ₹{item.price}
                            </p>
                          </div>
                        </button>
                      ))}
                      <button
                        onClick={() => { navigate('/menu'); clearSearch(); }}
                        className='w-full px-4 py-2.5 text-center text-amber-400 text-xs font-cinzel uppercase tracking-wider hover:bg-amber-900/20 transition-colors border-t border-amber-800/30'
                      >
                        View full menu →
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

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

            {/* ── Mobile hamburger ── */}
            <div className='md:hidden flex items-center ml-1'>
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

      {/* ── Mobile menu ── */}
      {isOpen && (
        <div className='md:hidden bg-[#2D180E] border-t-4 border-amber-900/40 shadow-lg shadow-amber-900/30 w-full'>
          <div className='px-4 py-4 space-y-2'>
            {/* Mobile search */}
            <div className='flex items-center gap-2 bg-amber-900/30 border border-amber-700/40 rounded-xl px-3 py-2 mb-3'>
              <FiSearch className='text-amber-400 flex-shrink-0' />
              <input
                type='text'
                value={searchQuery}
                onChange={handleSearch}
                placeholder='Search food...'
                className='bg-transparent text-amber-100 placeholder-amber-500/60 text-sm outline-none flex-1'
              />
              {searchQuery && (
                <button onClick={clearSearch}><FiX className='text-amber-500' size={14} /></button>
              )}
            </div>
            {/* Mobile search results */}
            {showResults && searchResults.length > 0 && (
              <div className='bg-amber-900/20 rounded-xl border border-amber-800/30 mb-2 overflow-hidden'>
                {searchResults.map(item => (
                  <button key={item._id}
                    onClick={() => { handleResultClick(item); setIsOpen(false); }}
                    className='w-full flex items-center gap-3 px-3 py-2 hover:bg-amber-900/40 text-left border-b border-amber-900/20 last:border-0'
                  >
                    <img src={getImgSrc(item)} alt={item.name}
                      className='w-8 h-8 rounded object-contain bg-amber-900/20'
                      onError={e => { e.target.style.opacity = '0.3'; }}
                    />
                    <div>
                      <p className='text-amber-100 text-sm'>{item.name}</p>
                      <p className='text-amber-400/60 text-xs'>{item.category} · ₹{item.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
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

      {/* ── Login modal ── */}
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
