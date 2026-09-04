import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { useStore } from '../../../context/StoreContext';

const CartPage = () => {
    const { url, cartItems, removeFromCart, updateQuantity, cartTotal } = useStore();
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    // Build image URL: backend items use a filename, local/dummy items may already have a full path
    const getImage = (item) => {
        if (!item.image) return '';
        if (item.image.startsWith('http') || item.image.startsWith('/') || item.image.startsWith('data:')) {
            return item.image;
        }
        return `${url}/images/${item.image}`;
    };

    // Use _id (backend) falling back to id (legacy local items)
    const getId = (item) => item._id || item.id;

    return (
        <div className='min-h-screen overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a120b] via-[#2a1a0e] to-[#3e2b1d]'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 animate-fade-in-down'>
                    <span className='font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent'>
                        Your Cart
                    </span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className='text-center animate-fade-in'>
                        <p className='text-amber-100/80 text-xl mb-4'>Your cart is empty</p>
                        <Link to='/menu'
                            className='transition-all duration-300 text-amber-100 inline-flex items-center gap-2 hover:gap-3 hover:bg-amber-800/50 bg-amber-900/40 px-6 py-2 rounded-full font-cinzel text-sm uppercase'>
                            Browse All Items
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {cartItems.map((item) => (
                                <div key={getId(item)}
                                    className='group bg-amber-900/20 p-4 rounded-2xl border-4 border-dashed border-amber-500 backdrop-blur-sm flex flex-col items-center gap-4 transition-all duration-300 hover:border-solid hover:shadow-xl hover:shadow-amber-900/10 transform hover:-translate-y-1 animate-fade-in'>
                                    <div className='w-24 h-24 flex-shrink-0 cursor-pointer relative overflow-hidden rounded-lg'
                                        onClick={() => setSelectedImage(getImage(item))}>
                                        <img src={getImage(item)} alt={item.name} className='w-full h-full object-contain' />
                                    </div>

                                    <div className='w-full text-center'>
                                        <h3 className='text-xl font-dancingscript text-amber-100'>{item.name}</h3>
                                        <p className='text-amber-100/80 font-cinzel mt-1'>₹{item.price}</p>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <button onClick={() => updateQuantity(getId(item), Math.max(1, item.quantity - 1))}
                                            className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center transition-all active:scale-95'>
                                            <FaMinus className='w-4 h-4 text-amber-100' />
                                        </button>
                                        <span className='w-8 text-center text-amber-100 font-cinzel'>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(getId(item), item.quantity + 1)}
                                            className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center transition-all active:scale-95'>
                                            <FaPlus className='w-4 h-4 text-amber-100' />
                                        </button>
                                    </div>

                                    <div className='flex items-center justify-between w-full'>
                                        <button onClick={() => removeFromCart(getId(item))}
                                            className='bg-amber-900/40 px-3 py-1 rounded-full font-cinzel text-xs uppercase transition-all hover:bg-amber-800/50 flex items-center gap-1 active:scale-95'>
                                            <FaTrash className='w-4 h-4 text-amber-100' />
                                            <span className='text-amber-100'>Remove</span>
                                        </button>
                                        <p className='text-sm font-dancingscript text-amber-300'>₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='mt-12 pt-8 border-t border-amber-800/30 animate-fade-in-up'>
                            <div className='flex flex-col sm:flex-row justify-between items-center gap-8'>
                                <Link to='/menu'
                                    className='bg-amber-900/40 px-8 py-3 rounded-full font-cinzel uppercase tracking-wider hover:bg-amber-800/50 transition-all text-amber-100 inline-flex items-center gap-2 hover:gap-3 active:scale-95'>
                                    Continue Shopping
                                </Link>

                                <div className='flex items-center gap-8'>
                                    <h2 className='text-3xl font-dancingscript text-amber-100'>Total: ₹{cartTotal}</h2>
                                    <button
                                        onClick={() => navigate('/checkout')}
                                        className='bg-gradient-to-r from-amber-500 to-amber-700 text-[#2D1B0E] px-8 py-3 rounded-full font-cinzel uppercase tracking-wider hover:from-amber-400 hover:to-amber-600 transition-all flex items-center gap-2 active:scale-95 font-bold shadow-lg shadow-amber-900/30'>
                                        Checkout Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {selectedImage && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-amber-900/40 backdrop-blur-sm p-4'
                    onClick={() => setSelectedImage(null)}>
                    <div className='relative max-w-full max-h-full'>
                        <img src={selectedImage} alt='Full View' className='max-w-[90vw] max-h-[90vh] rounded-lg object-contain' />
                        <button onClick={() => setSelectedImage(null)}
                            className='absolute top-1 right-1 bg-amber-900/80 rounded-full p-2 text-black hover:bg-amber-800 transition-colors active:scale-90'>
                            <FaTimes className='w-6 h-6' />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
