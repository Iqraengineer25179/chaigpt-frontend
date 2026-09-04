import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useStore } from '../../../context/StoreContext';
import './OurMenu.css';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

// Resolve the correct image src for both static (imported PNG) and
// backend (filename string served via /images/) items
const getImageSrc = (item, url) =>
    item.isStatic ? item.image : `${url}/images/${item.image}`;

const OurMenu = () => {
    const { url, food_list, loadingFood, fetchFoodList, cartItems, addToCart, removeFromCart } = useStore();
    const [activeCategory, setActiveCategory] = useState('All');

    // Always pull fresh backend items when this page mounts
    useEffect(() => { fetchFoodList(); }, [fetchFoodList]);

    // "All" shows everything; otherwise case-insensitive category match
    const displayed = activeCategory === 'All'
        ? food_list
        : food_list.filter(item =>
            item.category.toLowerCase() === activeCategory.toLowerCase()
          );

    const getQuantity = (id) => cartItems.find(i => i._id === id)?.quantity || 0;

    return (
        <div className='bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] min-h-screen py-16 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200'>
                    <span className='font-dancingscript block text-5xl md:text-7xl sm:text-6xl mb-2'>Our Exquisite Menu</span>
                    <span className='block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-amber-100/80'>A Symphony of Flavours</span>
                </h2>

                {/* ── Category filter ── */}
                <div className='flex flex-wrap justify-center gap-4 mb-16'>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                            className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-lg tracking-widest backdrop-blur-sm ${
                                activeCategory === cat
                                    ? 'bg-gradient-to-r from-amber-900/80 to-amber-700/80 border-amber-500 scale-105 shadow-lg shadow-amber-950/50 text-amber-100'
                                    : 'bg-amber-950/20 border-amber-800/30 text-amber-200/80 hover:bg-amber-900/40 hover:border-amber-700/50 hover:text-amber-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── Loading overlay (only on first load when list is empty) ── */}
                {loadingFood && food_list.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 py-20'>
                        <span className='w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin' />
                        <p className='text-amber-300 font-cinzel tracking-widest text-sm'>Loading menu...</p>
                    </div>
                ) : displayed.length === 0 ? (
                    <p className='text-center text-amber-300/60 font-cinzel text-lg'>
                        No items found in this category.
                    </p>
                ) : (
                    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                        {displayed.map((item, i) => {
                            const qty    = getQuantity(item._id);
                            const imgSrc = getImageSrc(item, url);
                            return (
                                <div key={item._id}
                                    className='relative bg-amber-900/20 rounded-2xl overflow-hidden border border-amber-800/30 backdrop-blur-sm flex flex-col transition-all duration-500'
                                    style={{ '--index': i }}
                                >
                                    <div className='relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10'>
                                        <img
                                            src={imgSrc}
                                            alt={item.name}
                                            className='max-h-full max-w-full object-contain transition-all duration-700'
                                            onError={e => { e.target.style.opacity = '0.3'; }}
                                        />
                                    </div>

                                    <div className='p-4 sm:p-6 flex flex-col flex-grow relative'>
                                        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent opacity-50' />
                                        <h3 className='text-xl sm:text-2xl mb-2 font-dancingscript text-amber-100'>{item.name}</h3>
                                        <p className='text-amber-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed'>{item.description}</p>

                                        <div className='mt-auto flex items-center gap-4 justify-between'>
                                            <div className='bg-amber-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg'>
                                                <span className='text-xl font-bold text-amber-300 font-dancingscript'>₹{item.price}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                {qty > 0 ? (
                                                    <>
                                                        <button onClick={() => removeFromCart(item._id)}
                                                            className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors'>
                                                            <FaMinus className='text-amber-100' />
                                                        </button>
                                                        <span className='w-8 text-center text-amber-100'>{qty}</span>
                                                        <button onClick={() => addToCart(item)}
                                                            className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors'>
                                                            <FaPlus className='text-amber-100' />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => addToCart(item, 1)}
                                                        className='bg-amber-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs uppercase sm:text-sm tracking-wider transition-transform duration-300 hover:scale-110 hover:shadow-lg border border-amber-800/50'>
                                                        <span className='text-xs text-amber-100'>Add to Cart</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OurMenu;
