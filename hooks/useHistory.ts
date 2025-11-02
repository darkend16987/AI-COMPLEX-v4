import { useState, useEffect } from 'react';
import type { HistoryItem } from '../types';

export const useHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    // Load history from localStorage on initial render
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('aicomplex-history');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (error) {
            console.error("Failed to load history from localStorage:", error);
            localStorage.removeItem('aicomplex-history');
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        try {
            if (history.length > 0) {
                localStorage.setItem('aicomplex-history', JSON.stringify(history));
            } else {
                localStorage.removeItem('aicomplex-history');
            }
        } catch (error) {
            console.error("Failed to save history to localStorage:", error);
        }
    }, [history]);
    
    const addHistoryItem = (item: Omit<HistoryItem, 'id'>) => {
        const newHistoryItem: HistoryItem = { ...item, id: Date.now().toString() };
        setHistory(prev => [newHistoryItem, ...prev].slice(0, 50));
    };

    const clearHistory = () => {
        setHistory([]);
    };
    
    return { history, addHistoryItem, clearHistory, setHistory };
};