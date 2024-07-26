import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signup = (email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = storedUsers.some(u => u.email === email);

        if (userExists) {
            alert('User already exists');
            return Promise.reject('User already exists');
        } else {
            storedUsers.push({ email, password });
            localStorage.setItem('users', JSON.stringify(storedUsers));
            alert('Registration successful. Please log in.');
            return Promise.resolve();
        }
    };

    const login = (email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(u => u.email === email && u.password === password);

        if (user) {
            setUser(email);
            localStorage.setItem('user', JSON.stringify(email));
            return Promise.resolve();
        } else {
            alert('Invalid email or password');
            return Promise.reject('Invalid email or password');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        alert('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
