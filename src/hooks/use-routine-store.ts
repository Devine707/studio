'use client';

import { useState, useEffect, useCallback } from 'react';

export type RoutineItem = {
  id: string;
  name: string;
  addedAt: string;
  logs: string[];
};

const STORE_KEY = 'devine-routine-store';

export function useRoutineStore() {
  const [routine, setRoutine] = useState<RoutineItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedRoutine = localStorage.getItem(STORE_KEY);
      if (storedRoutine) {
        setRoutine(JSON.parse(storedRoutine));
      }
    } catch (error) {
      console.error('Failed to load routine from localStorage', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(routine));
      } catch (error) {
        console.error('Failed to save routine to localStorage', error);
      }
    }
  }, [routine, isLoaded]);

  const addTreatment = useCallback((name: string) => {
    setRoutine((prev) => {
      if (prev.some((item) => item.name === name)) {
        return prev;
      }
      const newItem: RoutineItem = {
        id: crypto.randomUUID(),
        name,
        addedAt: new Date().toISOString(),
        logs: [],
      };
      return [...prev, newItem];
    });
  }, []);

  const removeTreatment = useCallback((id: string) => {
    setRoutine((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const logApplication = useCallback((id: string) => {
    setRoutine((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, logs: [...item.logs, new Date().toISOString()] }
          : item
      )
    );
  }, []);

  return { routine, addTreatment, removeTreatment, logApplication, isLoaded };
}
