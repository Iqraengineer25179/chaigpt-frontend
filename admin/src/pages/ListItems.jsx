import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiTrash2, FiRefreshCw } from 'react-icons/fi';

const URL = 'http://localhost:4000';

const ListItems = () => {
    const [items, setItems]     = useState([]);
    const [loading, setLoading] = useState(false);
    const [removing, setRemoving] = useState(null); // stores id being removed

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${URL}/api/food/list`);
            if (data.success) setItems(data.data);
            else toast.error(data.message || 'Failed to fetch items.');
        } catch {
            toast.error('Error fetching food list.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    const handleRemove = async (id) => {
        if (!window.confirm('Delete this food item?')) return;
        setRemoving(id);
        try {
            const { data } = await axios.post(`${URL}/api/food/remove`, { id });
            if (data.success) {
                toast.success('Item removed.');
                setItems(prev => prev.filter(i => i._id !== id));
            } else {
                toast.error(data.message || 'Failed to remove item.');
            }
        } catch {
            toast.error('Server error while removing item.');
        } finally {
            setRemoving(null);
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-2xl font-bold text-amber-300'>Food List</h2>
                <button onClick={fetchItems} disabled={loading}
                    className='flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm hover:bg-slate-700 transition-all disabled:opacity-50'>
                    <FiRefreshCw className={loading ? 'animate-spin' : ''} size={15} />
                    Refresh
                </button>
            </div>

            {loading && items.length === 0 ? (
                <div className='flex justify-center py-20'>
                    <span className='w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin' />
                </div>
            ) : items.length === 0 ? (
                <p className='text-slate-500 text-center py-20'>No food items found. Add some!</p>
            ) : (
                <div className='overflow-x-auto rounded-xl border border-slate-700'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='bg-slate-800 text-slate-400 uppercase text-xs tracking-wider'>
                                <th className='px-4 py-3 text-left'>Image</th>
                                <th className='px-4 py-3 text-left'>Name</th>
                                <th className='px-4 py-3 text-left hidden md:table-cell'>Category</th>
                                <th className='px-4 py-3 text-left'>Price</th>
                                <th className='px-4 py-3 text-left hidden lg:table-cell'>Description</th>
                                <th className='px-4 py-3 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-800'>
                            {items.map(item => (
                                <tr key={item._id} className='hover:bg-slate-800/50 transition-colors'>
                                    <td className='px-4 py-3'>
                                        <img
                                            src={`${URL}/images/${item.image}`}
                                            alt={item.name}
                                            className='w-14 h-14 object-contain rounded-lg bg-slate-800'
                                            onError={e => { e.target.style.opacity = '0.3'; }}
                                        />
                                    </td>
                                    <td className='px-4 py-3 font-medium text-slate-100'>{item.name}</td>
                                    <td className='px-4 py-3 hidden md:table-cell'>
                                        <span className='px-2.5 py-1 rounded-full bg-amber-600/20 text-amber-400 text-xs border border-amber-600/30'>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 text-amber-300 font-semibold'>₹{item.price}</td>
                                    <td className='px-4 py-3 text-slate-400 hidden lg:table-cell max-w-xs'>
                                        <span className='line-clamp-2'>{item.description}</span>
                                    </td>
                                    <td className='px-4 py-3 text-center'>
                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            disabled={removing === item._id}
                                            className='p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all disabled:opacity-50'
                                            title='Delete item'
                                        >
                                            {removing === item._id
                                                ? <span className='w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin inline-block' />
                                                : <FiTrash2 size={16} />
                                            }
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListItems;
