'use client'
import React, { createContext, useState} from 'react';
import { set } from 'zod';


export const LoadingContext = createContext({
    loading: false,
    setLoading: (loading: boolean) => {}
});

export const LoadingProvider = (
    { children }: { children: React.ReactNode }
) => {
    const [loading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}