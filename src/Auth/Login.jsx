import { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Enter the details");
            return;
        }

        login(email, password)
            .then(() => {
                alert("Login Successful")
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="login-container">
            <div className='first-container'>
                <div>
                    <h1 className='log-heading'>Welcome to the <span className='head'>Watchlist </span> </h1> 
                    <p>Please Login with your personal details to use all of site features</p>
                    </div>
            </div>
            <div className='second-container'>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1 className="login-heading">Login</h1>
                    <label htmlFor="email" className="signup-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="signup-input"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password" className="signup-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="signup-input"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="signup-button">Login</button>
                    <p>If you don't have an account <Link to="/signup" style={{ textDecoration: "underline" }}>Signup</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
