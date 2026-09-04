import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiRefreshCw, FiPackage } from 'react-icons/fi';

const URL = 'http://localhost:4000';
const STATUSES = ['Processing', 'Out for Delivery', 'Delivered'];

const STATUS_STYLE = {
    'Processing':       'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
    'Out for Delivery': 'bg-blue-500/15  text-blue-300  border-blue-500/30',
    'Delivered':        'bg-green-500/15 text-green-300 border-green-500/30',
};

const Orders = () => {
    const [orders, setOrders]     = useState([]);
    const [loading, setLoading]   = useState(false);
    const [updating, setUpdating] = useState(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${URL}/api/order/list`);
            if (data.success) setOrders(data.data);
            else toast.error(data.message || 'Failed to fetch orders.');
        } catch {
            toast.error('Error fetching orders.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const handleStatusChange = async (orderId, status) => {
        setUpdating(orderId);
        try {
            const { data } = await axios.post(`${URL}/api/order/status`, { orderId, status });
            if (data.success) {
                toast.success(`Status updated to "${status}"`);
                setOrders(prev =>
                    prev.map(o => o._id === orderId ? { ...o, status, payment: data.data.payment } : o)
                );
            } else {
                toast.error(data.message || 'Failed to update status.');
            }
        } catch {
            toast.error('Server error while updating status.');
        } finally {
            setUpdating(null);
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-2xl font-bold text-amber-300'>All Orders</h2>
                <button onClick={fetchOrders} disabled={loading}
                    className='flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm hover:bg-slate-700 transition-all disabled:opacity-50'>
                    <FiRefreshCw className={loading ? 'animate-spin' : ''} size={15} />
                    Refresh
                </button>
            </div>

            {loading && orders.length === 0 ? (
                <div className='flex justify-center py-20'>
                    <span className='w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin' />
                </div>
            ) : orders.length === 0 ? (
                <div className='text-center py-20'>
                    <FiPackage className='text-slate-600 mx-auto mb-4' size={48} />
                    <p className='text-slate-500'>No orders yet.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {orders.map(order => (
                        <div key={order._id} className='bg-slate-900 border border-slate-700 rounded-xl p-5'>
                            <div className='flex flex-wrap gap-4 justify-between items-start mb-4'>
                                {/* Customer info */}
                                <div className='min-w-0'>
                                    <p className='text-slate-400 text-xs uppercase tracking-wider mb-1'>Customer</p>
                                    {order.userId ? (
                                        <p className='text-slate-100 text-sm font-medium'>
                                            {order.userId.username || '—'}
                                            <span className='text-slate-500 ml-2 text-xs'>{order.userId.email}</span>
                                        </p>
                                    ) : (
                                        <p className='text-slate-500 text-sm'>Unknown</p>
                                    )}
                                    <p className='text-slate-500 text-xs mt-1 font-mono truncate max-w-[220px]'>{order._id}</p>
                                </div>

                                {/* Date + amount */}
                                <div className='text-right shrink-0'>
                                    <p className='text-amber-300 font-bold text-lg'>₹{order.amount}</p>
                                    <p className='text-slate-500 text-xs'>
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border mt-1 inline-block ${order.payment ? 'bg-green-500/15 text-green-300 border-green-500/30' : 'bg-red-500/15 text-red-300 border-red-500/30'}`}>
                                        {order.payment ? 'Paid' : 'Unpaid'} · {order.paymentMethod}
                                    </span>
                                </div>
                            </div>

                            {/* Items */}
                            <div className='flex flex-wrap gap-2 mb-4'>
                                {order.items.map((item, idx) => (
                                    <span key={idx} className='text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-full'>
                                        {item.name} ×{item.quantity}
                                    </span>
                                ))}
                            </div>

                            {/* Status selector */}
                            <div className='flex flex-wrap items-center gap-3'>
                                <span className={`text-xs px-3 py-1 rounded-full border font-medium ${STATUS_STYLE[order.status] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                                    {order.status}
                                </span>

                                <select
                                    value={order.status}
                                    disabled={updating === order._id}
                                    onChange={e => handleStatusChange(order._id, e.target.value)}
                                    className='px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-xs focus:outline-none focus:border-amber-500 disabled:opacity-50 cursor-pointer'
                                >
                                    {STATUSES.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>

                                {updating === order._id && (
                                    <span className='w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin' />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
