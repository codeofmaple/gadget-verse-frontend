'use client';
import { createContext, useContext, useMemo } from 'react';
import { useSession, signOut, SessionProvider } from 'next-auth/react';

const AuthContext = createContext();

// Client component wrapper for SessionProvider
function AuthSessionProvider({ children }) {
    return (
        <SessionProvider>
            <AuthProviderContent>
                {children}
            </AuthProviderContent>
        </SessionProvider>
    );
}

// Separate the auth logic into a client component
function AuthProviderContent({ children }) {
    const { data: session, status } = useSession();

    const register = async (name, email, password) => {
        try {
            const response = await fetch('https://gadget-verse-backend.vercel.app/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, error: error.error };
            }
        } catch (error) {
            return { success: false, error: 'Registration failed' };
        }
    };

    const logout = async () => {
        await signOut({ redirect: false });
    };

    const value = useMemo(() => ({
        user: session?.user || null,
        register,
        logout,
        loading: status === 'loading'
    }), [session, status]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Main AuthProvider that wraps with SessionProvider
export function AuthProvider({ children }) {
    return (
        <AuthSessionProvider>
            {children}
        </AuthSessionProvider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}