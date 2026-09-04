import React, { createContext, useContext, useEffect, useReducer, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import staticFoodList from '../data/staticFoodList';

export const StoreContext = createContext();

// Falls back to localhost during local development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ── Cart Reducer ──────────────────────────────────────────────────────────────
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { item, quantity } = action.payload;
            const existing = state.find(i => i._id === item._id);
            if (existing) {
                return state.map(i =>
                    i._id === item._id ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            return [...state, { ...item, quantity }];
        }
        case 'REMOVE_ITEM':
            return state.filter(i => i._id !== action.payload.itemId);
        case 'UPDATE_QUANTITY':
            return state.map(i =>
                i._id === action.payload.itemId
                    ? { ...i, quantity: Math.max(1, action.payload.newQuantity) }
                    : i
            );
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

const initCart = () => {
    try {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

// ── Provider ──────────────────────────────────────────────────────────────────
export const StoreProvider = ({ children }) => {
    const [url]                          = useState(API_BASE);
    const [token, setToken]              = useState(localStorage.getItem('token') || '');
    const [backendItems, setBackendItems] = useState([]);   // items from /api/food/list
    const [loadingFood, setLoadingFood]  = useState(false);
    const [cartItems, dispatch]          = useReducer(cartReducer, [], initCart);

    // ── Merged list: static items always shown, backend items appended ───────
    // Backend items whose _id matches a static item's _id are never duplicated
    // (in practice this won't happen since static ids start with "static-").
    const food_list = useMemo(() => {
        const backendIds = new Set(backendItems.map(i => i._id));
        // Keep all static items, then append backend items
        const filtered = staticFoodList.filter(i => !backendIds.has(i._id));
        return [...filtered, ...backendItems];
    }, [backendItems]);

    // ── Persist cart ─────────────────────────────────────────────────────────
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // ── Persist token ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('loginData');
        }
    }, [token]);

    // ── Fetch backend food list ───────────────────────────────────────────────
    const fetchFoodList = useCallback(async () => {
        setLoadingFood(true);
        try {
            const { data } = await axios.get(`${API_BASE}/api/food/list`);
            if (data.success) setBackendItems(data.data);
        } catch (err) {
            console.error('Failed to fetch food list:', err.message);
            // Static items still show even when backend is unreachable
        } finally {
            setLoadingFood(false);
        }
    }, []);

    // Fetch on mount
    useEffect(() => { fetchFoodList(); }, [fetchFoodList]);

    // Re-fetch when the tab regains focus (new admin items appear automatically)
    useEffect(() => {
        const onFocus = () => fetchFoodList();
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, [fetchFoodList]);

    // ── Cart helpers ──────────────────────────────────────────────────────────
    const addToCart = useCallback((item, quantity = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
    }, []);

    const removeFromCart = useCallback((itemId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
    }, []);

    const updateQuantity = useCallback((itemId, newQuantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, newQuantity } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    // ── Derived cart values ───────────────────────────────────────────────────
    const cartTotal       = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItemsCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const totalItems      = totalItemsCount >= 1000
        ? (totalItemsCount / 1000).toFixed(1) + 'k'
        : totalItemsCount;

    // ── Auth helpers ──────────────────────────────────────────────────────────
    const login  = useCallback((newToken) => { setToken(newToken); }, []);
    const logout = useCallback(() => { setToken(''); clearCart(); }, [clearCart]);

    return (
        <StoreContext.Provider value={{
            url,
            token, login, logout,
            food_list, loadingFood, fetchFoodList,
            cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
            cartTotal, totalItems,
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);

// Backwards-compat — existing useCart() calls keep working
export const useCart = () => useContext(StoreContext);
