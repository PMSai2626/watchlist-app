import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import MovieDetails from './components/Movie/Moviedetails';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

const AppContent = () => {
    const { user } = useAuth();

    return (
        <>
            {user && <Navbar />}
            <Routes>
                {user ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
