import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useStore } from '../../../context/StoreContext';

const SignUp = () => {
    const { url } = useStore();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading]           = useState(false);
    const [formData, setFormData]         = useState({ username: '', email: '', password: '' });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters.');
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post(`${url}/api/user/register`, formData);
            if (data.success) {
                toast.success('Account created! Please log in.');
                navigate('/login');
            } else {
                toast.error(data.message || 'Registration failed.');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-[#1a120b] p-4'>
            <div className='w-full max-w-md bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] p-8 rounded-xl shadow-lg border-4 border-amber-700/30 transition-all duration-300 hover:shadow-2xl'>
                <h1 className='text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-6'>
                    Create Account
                </h1>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        type='text' name='username' placeholder='Username'
                        value={formData.username} onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all hover:scale-[1.02]'
                        required
                    />
                    <input
                        type='email' name='email' placeholder='Email'
                        value={formData.email} onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all hover:scale-[1.02]'
                        required
                    />
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password' placeholder='Password (min 8 characters)'
                            value={formData.password} onChange={handleChange}
                            className='w-full px-4 py-3 pr-12 rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all hover:scale-[1.02]'
                            required
                        />
                        <button type='button' onClick={() => setShowPassword(p => !p)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300'>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type='submit' disabled={loading}
                        className='w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2D1B0E] font-bold rounded-lg shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        {loading
                            ? <span className='w-5 h-5 border-2 border-[#2D1B0E] border-t-transparent rounded-full animate-spin' />
                            : 'Sign Up'
                        }
                    </button>
                </form>

                <p className='text-center text-amber-300/70 text-sm mt-4'>
                    Already have an account?{' '}
                    <Link to='/login' className='text-amber-400 hover:text-amber-300 font-semibold'>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
