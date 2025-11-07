import { useState, useEffect } from 'react';
import { isToday, isYesterday, parseISO } from 'date-fns';

interface StreakData {
    count: number;
    lastCompletedDate: string | null;
}

export const useStreak = () => {
    const [streak, setStreak] = useState<StreakData>(() => {
        const savedUser = localStorage.getItem('skillforge-user');
        if (!savedUser) return { count: 0, lastCompletedDate: null };

        const user = JSON.parse(savedUser);
        const saved = localStorage.getItem(`skillforge-streak-${user.id}`);
        return saved ? JSON.parse(saved) : { count: 0, lastCompletedDate: null };
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('skillforge-user');
        if (!savedUser) return;

        const user = JSON.parse(savedUser);
        localStorage.setItem(`skillforge-streak-${user.id}`, JSON.stringify(streak));
    }, [streak]);

    const updateStreak = () => {
        const today = new Date().toISOString();
        setStreak(prev => {
            if (!prev.lastCompletedDate) {
                // First time completing a topic
                return { count: 1, lastCompletedDate: today };
            }

            const lastDate = parseISO(prev.lastCompletedDate);
            if (isToday(lastDate)) {
                // Already completed something today, don't increment
                return prev;
            } else if (isYesterday(lastDate)) {
                // Completed something yesterday, increment streak
                return { count: prev.count + 1, lastCompletedDate: today };
            } else {
                // Broken streak, reset to 1
                return { count: 1, lastCompletedDate: today };
            }
        });
    };

    // Optional: Check streak on load to see if it was broken by missing a day
    useEffect(() => {
        if (streak.lastCompletedDate) {
            const lastDate = parseISO(streak.lastCompletedDate);
            if (!isToday(lastDate) && !isYesterday(lastDate) && streak.count > 0) {
                 setStreak({ count: 0, lastCompletedDate: null }); // Or keep last date but reset count
            }
        }
    }, []);

    return { streak: streak.count, updateStreak };
};