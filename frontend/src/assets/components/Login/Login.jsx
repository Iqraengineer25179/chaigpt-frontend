import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useStore } from '../../../context/StoreContext';

const Login = ({ onClose }) => {
    const { url, login } = useStore();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const inputBase = 'w-full bg-amber-900/20 border border-amber-500/30 rounded-lg text-white placeholder-amber-300/50 outline-none focus:border-amber-400 transition-all';
    const iconClass  = 'absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/70';

    const handleChange = ({ target: { name, value } }) =>
        setFormData(prev => ({ ...prev, [name]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields.');
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post(`${url}/api/user/login`, {
                email:    formData.email,
                password: formData.password,
            });

            if (data.success) {
                login(data.token);
                toast.success('Login successful! Welcome back.');
                onClose?.();
                navigate('/');
            } else {
                toast.error(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Server error. Please try again.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='space-y-6 relative'>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Email */}
                <div className='relative'>
                    <FaUser className={iconClass} />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email address'
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputBase} pl-10 pr-4 py-3`}
                        required
                    />
                </div>

                {/* Password */}
                <div className='relative'>
                    <FaLock className={iconClass} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        className={`${inputBase} pl-10 pr-12 py-3`}
                        required
                    />
                    <button
                        type='button'
                        onClick={() => setShowPassword(p => !p)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-amber-400'
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100'
                >
                    {loading ? (
                        <span className='w-5 h-5 border-2 border-[#2D1B0E] border-t-transparent rounded-full animate-spin' />
                    ) : (
                        <><span>Sign In</span><FaArrowRight /></>
                    )}
                </button>
            </form>

            <div className='text-center'>
                <Link
                    to='/signup'
                    onClick={onClose}
                    className='inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors'
                >
                    <FaUserPlus />
                    <span>Create new account</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;
