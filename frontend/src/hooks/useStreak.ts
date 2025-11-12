import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { API_URL } from "../config"; // Import the config

interface StreakData {
    count: number;
    lastCompletedDate: string | null;
}

// Helper function to get the token
const getToken = () => localStorage.getItem('edvancea-token');

export const useStreak = () => {
    const [streak, setStreak] = useState<StreakData>({ count: 0, lastCompletedDate: null });
    const { isAuthenticated } = useAuth();

    // 1. Fetch streak data on login
    useEffect(() => {
        const fetchStreak = async () => {
            if (isAuthenticated) {
                try {
                    const token = getToken();
                    const res = await fetch(`${API_URL}/user/streak`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setStreak(data);
                    }
                } catch (error) {
                    console.error("Failed to fetch streak:", error);
                }
            } else {
                setStreak({ count: 0, lastCompletedDate: null }); // Clear on logout
            }
        };
        fetchStreak();
    }, [isAuthenticated]);


    // 2. Create API call to update streak
    const updateStreak = async () => {
        try {
            const token = getToken();
            const res = await fetch('/api/user/streak/update', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const newStreakData = await res.json();
                setStreak(newStreakData); // Update local state with server's response
            }
        } catch (error) {
            console.error("Failed to update streak:", error);
        }
    };
    
    // This hook no longer needs its own logic, it just reports state from backend
    return { streak: streak.count, updateStreak };
};