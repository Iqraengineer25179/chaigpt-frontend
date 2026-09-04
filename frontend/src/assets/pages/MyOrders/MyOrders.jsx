import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPackage, FiRefreshCw } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useStore } from '../../../context/StoreContext';

const STATUS_COLOR = {
    'Processing':       'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    'Out for Delivery': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    'Delivered':        'bg-green-500/20 text-green-300 border-green-500/40',
};

const STATUS_LABEL = {
    'Processing':       '🍳 Food Processing',
    'Out for Delivery': '🛵 Out for Delivery',
    'Delivered':        '✅ Delivered',
};

const MyOrders = () => {
    const { url, token } = useStore();

    // `data` state as per spec requirement
    const [data, setData]       = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { token } }   // spec: { headers: { token } }
            );
            if (res.data.success) {
                setData(res.data.data);
            } else {
                toast.error(res.data.message || 'Failed to fetch orders.');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error fetching your orders.');
        } finally {
            setLoading(false);
        }
    }, [url, token]);

    // Re-fetch on mount (and whenever token changes)
    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    return (
        <>
            <Navbar />
            <div className='min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1a0e] to-[#3e2b1d] py-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-4xl mx-auto'>

                    {/* ── Header ── */}
                    <div className='flex items-center justify-between mb-12'>
                        <h1 className='text-4xl sm:text-5xl font-bold'>
                            <span className='font-dancingscript bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent'>
                                My Orders
                            </span>
                        </h1>
                        <button
                            onClick={fetchOrders}
                            disabled={loading}
                            className='flex items-center gap-2 px-4 py-2 bg-amber-900/30 border border-amber-700/40 text-amber-300 rounded-full font-cinzel text-sm uppercase tracking-wider hover:bg-amber-800/40 transition-all disabled:opacity-50'
                        >
                            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                            <span>Refresh</span>
                        </button>
                    </div>

                    {/* ── States ── */}
                    {loading && data.length === 0 ? (
                        <div className='flex justify-center py-20'>
                            <span className='w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin' />
                        </div>
                    ) : data.length === 0 ? (
                        <div className='text-center py-20'>
                            <FiPackage className='text-amber-700/50 mx-auto mb-4' size={64} />
                            <p className='text-amber-300/60 font-cinzel text-lg'>You have no orders yet.</p>
                        </div>
                    ) : (
                        <div className='space-y-6'>
                            {data.map(order => {
                                // Total items count across all lines
                                const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);

                                return (
                                    <div
                                        key={order._id}
                                        className='bg-amber-900/20 border border-amber-800/30 rounded-2xl p-6 backdrop-blur-sm'
                                    >
                                        {/* ── Order meta row ── */}
                                        <div className='flex flex-wrap items-start justify-between gap-3 mb-5'>
                                            {/* Package icon + item count */}
                                            <div className='flex items-center gap-3'>
                                                <FiPackage className='text-amber-400' size={28} />
                                                <div>
                                                    <p className='text-amber-100 font-cinzel text-sm font-semibold'>
                                                        {totalItems} Item{totalItems !== 1 ? 's' : ''}
                                                    </p>
                                                    <p className='text-amber-400/50 text-xs font-mono'>
                                                        {order._id}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Date */}
                                            <div className='text-right'>
                                                <p className='text-amber-400/60 text-xs font-cinzel uppercase tracking-wider'>Date</p>
                                                <p className='text-amber-200 text-sm font-cinzel'>
                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                        day: 'numeric', month: 'short', year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* ── Items list ── */}
                                        <div className='space-y-2 border-t border-amber-800/20 pt-4 mb-5'>
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className='flex justify-between text-sm'>
                                                    <span className='text-amber-100 font-cinzel'>
                                                        {item.name}
                                                        <span className='text-amber-400/60 ml-2'>× {item.quantity}</span>
                                                    </span>
                                                    <span className='text-amber-300 font-cinzel'>
                                                        ₹{item.price * item.quantity}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* ── Footer: total + payment + status ── */}
                                        <div className='flex flex-wrap items-center justify-between gap-3 border-t border-amber-800/20 pt-4'>
                                            {/* Total price */}
                                            <p className='text-amber-100 font-bold font-cinzel text-lg'>
                                                ₹{order.amount}
                                            </p>

                                            {/* Payment badge */}
                                            <div className='flex items-center gap-3 text-xs font-cinzel'>
                                                <span className='text-amber-400/70 uppercase tracking-wider'>
                                                    {order.paymentMethod}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full ${
                                                    order.payment
                                                        ? 'bg-green-500/20 text-green-300'
                                                        : 'bg-red-500/20 text-red-300'
                                                }`}>
                                                    {order.payment ? 'Paid' : 'Pending'}
                                                </span>
                                            </div>

                                            {/* Track status */}
                                            <span className={`text-xs font-cinzel px-3 py-1.5 rounded-full border uppercase tracking-wider ${
                                                STATUS_COLOR[order.status] || 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                            }`}>
                                                {STATUS_LABEL[order.status] || order.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
