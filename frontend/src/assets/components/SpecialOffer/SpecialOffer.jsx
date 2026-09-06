import React, { useState } from 'react';
import { FaStar, FaHeart, FaPlus, FaFire } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi';
import FlotingParticle from '../flotingParticle/flotingParticle';
import { useStore } from '../../../context/StoreContext';

// Resolve image src for static (imported PNG) vs backend (filename) items
const getImageSrc = (item, url) =>
    item.isStatic ? item.image : `${url}/images/${item.image}`;

const INITIAL_COUNT = 4;
const STEP          = 5;

const SpecialOffer = () => {
    const { url, food_list, cartItems, addToCart, updateQuantity, removeFromCart } = useStore();
    // visibleCount tracks how many items are currently shown
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const allItems     = food_list;
    const displayItems = allItems.slice(0, visibleCount);
    const hasMore      = visibleCount < allItems.length;
    const isExpanded   = visibleCount > INITIAL_COUNT;

    const handleShowMore = () => setVisibleCount(prev => Math.min(prev + STEP, allItems.length));
    const handleShowLess = () => setVisibleCount(INITIAL_COUNT);

    const addButtonBase    = 'relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white overflow-hidden shadow-lg transition-all duration-300';
    const addButtonHover   = 'hover:scale-105 hover:shadow-amber-500/20';
    const commonTransition = 'transition-all duration-300';

    return (
        <div className='bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4 font-[Poppins]'>
            <div className='max-w-7xl mx-auto'>

                {/* ── Header ── */}
                <div className='text-center mb-14'>
                    <h1 className='text-5xl font-bold mb-4 transform transition-all bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent font-[Playfair_Display] italic'>
                        Today's <span className='text-stroke-gold'>Special</span> Offers
                    </h1>
                    <p className='text-lg text-gray-300 max-w-3xl mx-auto tracking-wide leading-relaxed'>
                        Savor the extraordinary with our culinary masterpieces crafted to perfection.
                    </p>
                </div>

                {/* ── Product Grid (always has static items to show) ── */}
                <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                            {displayItems.map((item, index) => {
                                // Cart uses _id (MongoDB backend)
                                const cartItem = cartItems.find(ci => ci._id === item._id);
                                const quantity = cartItem ? cartItem.quantity : 0;

                                // Image: static items use imported PNG directly, backend items use URL prefix
                                const imgSrc = getImageSrc(item, url);

                                return (
                                    <div
                                        key={item._id}
                                        className='relative group bg-[#4b3b3b] rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500 hover:shadow-red-900/40 border-2 border-transparent hover:border-amber-500/20 before:absolute before:inset-0 hover:before:opacity-20'
                                    >
                                        {/* ── Image ── */}
                                        <div className='relative h-72 overflow-hidden'>
                                            <img
                                                src={imgSrc}
                                                alt={item.name}
                                                className='w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500'
                                                onError={e => { e.target.style.opacity = '0.3'; }}
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90' />

                                            {/* Rating + hearts bar */}
                                            <div className='absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full'>
                                                <span className='flex items-center gap-2 text-amber-400'>
                                                    <FaStar className='text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]' />
                                                    <span className='font-bold'>4.5</span>
                                                </span>
                                                <span className='flex items-center gap-2 text-red-400'>
                                                    <FaHeart className='text-xl animate-heartbeat' />
                                                    <span className='font-bold'>120</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* ── Card body ── */}
                                        <div className='p-6 relative z-10'>
                                            <h3 className='text-2xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent font-[Playfair_Display] italic'>
                                                {item.name}
                                            </h3>
                                            <p className='text-gray-300 mb-5 text-sm leading-relaxed tracking-wide'>
                                                {item.description}
                                            </p>

                                            <div className='flex items-center justify-between gap-4'>
                                                {/* Price */}
                                                <span className='text-2xl font-bold text-amber-400 flex-1'>
                                                    ₹{item.price}
                                                </span>

                                                {/* Add / qty controls */}
                                                {quantity > 0 ? (
                                                    <div className='flex items-center gap-3'>
                                                        <button
                                                            onClick={() =>
                                                                quantity > 1
                                                                    ? updateQuantity(item._id, quantity - 1)
                                                                    : removeFromCart(item._id)
                                                            }
                                                            className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95'
                                                        >
                                                            <HiMinus className='w-4 h-4 text-amber-100' />
                                                        </button>
                                                        <span className='w-8 text-center text-amber-100 font-cinzel'>
                                                            {quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, quantity + 1)}
                                                            className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95'
                                                        >
                                                            <HiPlus className='w-4 h-4 text-amber-100' />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => addToCart(item, 1)}
                                                        className={`${addButtonBase} ${addButtonHover} ${commonTransition} bg-gradient-to-r from-amber-600 to-amber-800`}
                                                    >
                                                        <div className='absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300' />
                                                        <FaPlus className='text-lg transition-transform' />
                                                        <span className='relative z-10'>Add</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Hover border glow */}
                                        <div className='absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-amber-500/30 transition-all duration-500' />
                                        <div className='opacity-0 group-hover:opacity-100'>
                                            <FlotingParticle />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── Show More / Show Less buttons ── */}
                        <div className='mt-12 flex justify-center gap-4'>
                            {/* Show More — only visible when more items exist */}
                            {hasMore && (
                                <button
                                    onClick={handleShowMore}
                                    className='relative flex items-center gap-3 bg-gradient-to-r from-red-700 to-amber-700 text-white px-8 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider hover:gap-4 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 group border-2 border-amber-400/20 overflow-hidden'
                                >
                                    <div className='absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                    <FaFire className='text-xl animate-pulse' />
                                    <span>See More</span>
                                    <div className='h-full w-1 bg-amber-400/30 absolute right-0 top-0' />
                                </button>
                            )}

                            {/* See Less — only visible when expanded beyond initial count */}
                            {isExpanded && (
                                <button
                                    onClick={handleShowLess}
                                    className='relative flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider hover:scale-105 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-300 group border-2 border-slate-500/30 overflow-hidden'
                                >
                                    <div className='absolute inset-0 bg-gradient-to-r from-slate-500/10 via-transparent to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                    <FaFire className='text-xl opacity-50' />
                                    <span>See Less</span>
                                </button>
                            )}
                        </div>
                    </>
            </div>
        </div>
    );
};

export default SpecialOffer;
