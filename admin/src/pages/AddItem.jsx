import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';

// NOTE: Must NOT be named "URL" — that shadows the global window.URL used by
// URL.createObjectURL() for image previews.
const API_URL = 'http://localhost:4000';
const CATS    = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];
const EMPTY   = { name: '', description: '', price: '', category: CATS[0] };

const AddItem = () => {
    const [form, setForm]   = useState(EMPTY);
    const [image, setImage] = useState(null);   // File object or null
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();

    const handleChange = ({ target: { name, value } }) =>
        setForm(prev => ({ ...prev, [name]: value }));

    // onChange for the hidden <input type="file">
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image)               { toast.error('Please upload an image.');          return; }
        if (Number(form.price) <= 0) { toast.error('Price must be greater than 0.'); return; }

        setLoading(true);
        try {
            const fd = new FormData();
            fd.append('image',       image);
            fd.append('name',        form.name);
            fd.append('description', form.description);
            fd.append('price',       form.price);
            fd.append('category',    form.category);

            const { data } = await axios.post(`${API_URL}/api/food/add`, fd);
            if (data.success) {
                toast.success('Food item added! It will appear in the menu immediately.');
                setForm(EMPTY);
                setImage(null);
                if (fileRef.current) fileRef.current.value = '';
            } else {
                toast.error(data.message || 'Failed to add item.');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Server error.');
        } finally {
            setLoading(false);
        }
    };

    const inputCls = 'w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all text-sm';

    // Build preview URL only when a file is selected — uses the real window.URL now
    const previewSrc = image ? URL.createObjectURL(image) : null;

    return (
        <div className='max-w-xl'>
            <h2 className='text-2xl font-bold text-amber-300 mb-8'>Add Food Item</h2>

            <form onSubmit={handleSubmit} className='space-y-5'>

                {/* ── Image upload ── */}
                <div>
                    <label className='block text-slate-400 text-sm mb-2 font-medium'>
                        Food Image
                    </label>

                    {/* Clicking anywhere on this box opens the file picker */}
                    <label
                        htmlFor='food-image'
                        className='w-full h-44 rounded-xl border-2 border-dashed border-slate-600 hover:border-amber-500 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all bg-slate-800/40 overflow-hidden block'
                    >
                        {previewSrc ? (
                            <img
                                src={previewSrc}
                                alt='preview'
                                className='h-full w-full object-contain'
                            />
                        ) : (
                            <>
                                <FiUploadCloud size={36} className='text-slate-500' />
                                <span className='text-slate-500 text-sm'>Click to upload image</span>
                            </>
                        )}
                    </label>

                    {/* Hidden file input — id matches the label's htmlFor */}
                    <input
                        id='food-image'
                        ref={fileRef}
                        type='file'
                        accept='image/*'
                        onChange={handleFile}
                        className='hidden'
                    />

                    {/* Show selected filename for confirmation */}
                    {image && (
                        <p className='mt-1.5 text-xs text-slate-500 truncate'>
                            Selected: {image.name}
                        </p>
                    )}
                </div>

                {/* ── Name ── */}
                <div>
                    <label className='block text-slate-400 text-sm mb-2 font-medium'>Name</label>
                    <input
                        name='name'
                        placeholder='e.g. Margherita Pizza'
                        value={form.name}
                        onChange={handleChange}
                        className={inputCls}
                        required
                    />
                </div>

                {/* ── Description ── */}
                <div>
                    <label className='block text-slate-400 text-sm mb-2 font-medium'>Description</label>
                    <textarea
                        name='description'
                        placeholder='Short description...'
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        className={`${inputCls} resize-none`}
                        required
                    />
                </div>

                {/* ── Price + Category ── */}
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-slate-400 text-sm mb-2 font-medium'>Price (₹)</label>
                        <input
                            name='price'
                            type='number'
                            min='1'
                            placeholder='0'
                            value={form.price}
                            onChange={handleChange}
                            className={inputCls}
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-slate-400 text-sm mb-2 font-medium'>Category</label>
                        <select name='category' value={form.category} onChange={handleChange} className={inputCls}>
                            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* ── Submit ── */}
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
                >
                    {loading
                        ? <span className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        : 'Add Food Item'
                    }
                </button>
            </form>
        </div>
    );
};

export default AddItem;
