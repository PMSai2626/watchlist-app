import { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Enter the details");
            return;
        }

        signup(email, password)
            .then(() => {
                
                navigate('/login'); 
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="signup-container">
            <div className='first-container-signup'>
            <div>
                    <h1 className='log-heading-sign'>Welcome to the <span className='head-sign'>Watchlist </span> </h1> 
                    <p>Please signup with your personal details to use all of site features</p>
                    </div>
                    </div>
            <div className='second-container-signup'>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="signup-heading">Signup</h1>
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
                <button type="submit" className="signup-button">Sign Up</button>
                <p>If you have an account <Link to='/login' style={{ textDecoration: "underline" }}>Login</Link></p>
            </form>
            </div>
        </div>
    );
};

export default Signup;
