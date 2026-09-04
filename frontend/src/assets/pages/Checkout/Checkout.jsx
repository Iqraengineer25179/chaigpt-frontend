import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useStore } from '../../../context/StoreContext';

const EMPTY_ADDRESS = {
    firstName: '', lastName: '', street: '',
    city: '', state: '', zipCode: '', phone: '',
};

const Checkout = () => {
    const { url, token, cartItems, cartTotal, clearCart } = useStore();
    const navigate = useNavigate();

    const [address, setAddress]             = useState(EMPTY_ADDRESS);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading]             = useState(false);

    const handleChange = ({ target: { name, value } }) =>
        setAddress(prev => ({ ...prev, [name]: value }));

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error('Please log in to place an order.');
            navigate('/login');
            return;
        }
        if (cartItems.length === 0) {
            toast.error('Your cart is empty!');
            return;
        }

        setLoading(true);
        try {
            // Build items array.
            // Static items (_id starts with "static-") have no real MongoDB productId
            // and their image is a Vite-resolved import URL (already a string).
            const items = cartItems.map(i => {
                const isStatic = i._id && String(i._id).startsWith('static-');
                return {
                    ...(!isStatic && i._id ? { productId: i._id } : {}),
                    name:     i.name,
                    price:    Number(i.price),
                    quantity: Number(i.quantity),
                    // image may be an imported PNG module — convert to empty string if not a plain string
                    image:    typeof i.image === 'string' ? i.image : '',
                };
            });

            const { data } = await axios.post(
                `${url}/api/order/place`,
                { items, amount: cartTotal, address, paymentMethod },
                { headers: { token } }   // custom token header as per spec
            );

            if (data.success) {
                clearCart();
                toast.success('Order placed successfully!');
                navigate('/myorders');
            } else {
                toast.error(data.message || 'Failed to place order.');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Server error while placing order.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const inputCls = 'w-full px-4 py-3 rounded-lg bg-amber-900/20 border border-amber-700/40 text-amber-100 placeholder-amber-400/50 focus:outline-none focus:border-amber-400 transition-all';

    return (
        <>
            <Navbar />
            <div className='min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1a0e] to-[#3e2b1d] py-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-5xl mx-auto'>
                    <h1 className='text-4xl sm:text-5xl font-bold text-center mb-12'>
                        <span className='font-dancingscript bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent'>
                            Checkout
                        </span>
                    </h1>

                    <form onSubmit={handlePlaceOrder} className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

                        {/* ── Delivery Address ── */}
                        <div className='space-y-5'>
                            <h2 className='text-xl font-cinzel text-amber-300 uppercase tracking-wider border-b border-amber-800/40 pb-3'>
                                Delivery Address
                            </h2>

                            <div className='grid grid-cols-2 gap-4'>
                                <input name='firstName' placeholder='First Name' value={address.firstName} onChange={handleChange} className={inputCls} required />
                                <input name='lastName'  placeholder='Last Name'  value={address.lastName}  onChange={handleChange} className={inputCls} required />
                            </div>
                            <input name='street' placeholder='Street Address' value={address.street} onChange={handleChange} className={inputCls} required />
                            <div className='grid grid-cols-2 gap-4'>
                                <input name='city'  placeholder='City'  value={address.city}  onChange={handleChange} className={inputCls} required />
                                <input name='state' placeholder='State' value={address.state} onChange={handleChange} className={inputCls} required />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <input name='zipCode' placeholder='Zip Code'     value={address.zipCode} onChange={handleChange} className={inputCls} required />
                                <input name='phone'   placeholder='Phone Number' value={address.phone}   onChange={handleChange} className={inputCls} required />
                            </div>

                            {/* ── Payment Method ── */}
                            <h2 className='text-xl font-cinzel text-amber-300 uppercase tracking-wider border-b border-amber-800/40 pb-3 pt-4'>
                                Payment Method
                            </h2>
                            <div className='flex gap-4'>
                                {['COD', 'Online'].map(method => (
                                    <button key={method} type='button'
                                        onClick={() => setPaymentMethod(method)}
                                        className={`flex-1 py-3 rounded-xl font-cinzel text-sm uppercase tracking-wider border-2 transition-all ${
                                            paymentMethod === method
                                                ? 'bg-amber-600/40 border-amber-500 text-amber-100'
                                                : 'bg-amber-900/20 border-amber-800/30 text-amber-300 hover:border-amber-600/50'
                                        }`}
                                    >
                                        {method === 'COD' ? '💵 Cash on Delivery' : '💳 Online Payment'}
                                    </button>
                                ))}
                            </div>
                            {paymentMethod === 'Online' && (
                                <p className='text-amber-400/70 text-xs font-cinzel'>
                                    * Online payment is simulated — your order will be marked as paid immediately.
                                </p>
                            )}
                        </div>

                        {/* ── Order Summary ── */}
                        <div className='bg-amber-900/20 rounded-2xl border border-amber-800/30 p-6 flex flex-col gap-4 h-fit'>
                            <h2 className='text-xl font-cinzel text-amber-300 uppercase tracking-wider border-b border-amber-800/40 pb-3'>
                                Order Summary
                            </h2>

                            <div className='space-y-3 max-h-72 overflow-y-auto pr-1'>
                                {cartItems.map(item => (
                                    <div key={item._id} className='flex items-center justify-between gap-3'>
                                        <div className='flex items-center gap-3'>
                                            <span className='w-6 h-6 rounded-full bg-amber-600/40 text-amber-100 text-xs flex items-center justify-center font-bold flex-shrink-0'>
                                                {item.quantity}
                                            </span>
                                            <span className='text-amber-100 text-sm font-cinzel truncate max-w-[140px]'>{item.name}</span>
                                        </div>
                                        <span className='text-amber-300 text-sm font-cinzel flex-shrink-0'>
                                            ₹{item.price * item.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className='border-t border-amber-800/30 pt-4 space-y-2'>
                                <div className='flex justify-between text-amber-200 font-cinzel text-sm'>
                                    <span>Subtotal</span><span>₹{cartTotal}</span>
                                </div>
                                <div className='flex justify-between text-amber-200 font-cinzel text-sm'>
                                    <span>Delivery</span><span className='text-green-400'>Free</span>
                                </div>
                                <div className='flex justify-between text-amber-100 font-bold font-cinzel text-lg pt-2 border-t border-amber-800/30'>
                                    <span>Total</span><span>₹{cartTotal}</span>
                                </div>
                            </div>

                            <button type='submit' disabled={loading}
                                className='w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-[#2D1B0E] font-bold font-cinzel uppercase tracking-wider rounded-xl hover:from-amber-400 hover:to-amber-600 transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2'>
                                {loading
                                    ? <span className='w-5 h-5 border-2 border-[#2D1B0E] border-t-transparent rounded-full animate-spin' />
                                    : `Place Order — ₹${cartTotal}`
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
