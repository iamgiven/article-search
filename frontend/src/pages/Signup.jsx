import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', { username, email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setError('Signup failed. Please try again.');
            console.error('Signup failed:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className="w-full h-screen grid place-items-center bg-[#f5f5f5]">
            <form onSubmit={handleSignup} className="w-[85%] h-[50%] xl:w-[350px] xl:h-[500px] relative pt-8 px-12 flex flex-col items-center shadow rounded-[25px] bg-white">
                <a className="absolute -left-16 top-4" href="/">
                    <div className="w-12 h-12 grid place-items-center shadow rounded-full bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </div>
                </a>
                <p className="text-2xl font-semibold">Sign Up</p>
                <div className="w-full mt-12">
                    <p className="text-[#222]">Username</p>
                    <div className="w-full flex items-end gap-2 mt-[1px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user text-[#888]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <input className="w-full text-[#555]" type="text" placeholder="Type your username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off"/>
                    </div>
                    <div className="w-full h-[1px] mt-2 bg-[#ccc]"></div>
                </div>
                <div className="w-full mt-4">
                    <p className="text-[#222]">Email</p>
                    <div className="w-full flex items-end gap-2 mt-[1px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail text-[#888]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <input className="w-full text-[#555]" type="email" placeholder="Type your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
                    </div>
                    <div className="w-full h-[.5px] mt-2 bg-[#ccc]"></div>
                </div>
                <div className="w-full mt-4">
                    <p className="text-[#222]">Password</p>
                    <div className="w-full flex items-end gap-2 mt-[1px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock text-[#888]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        <input 
                            className="w-full text-[#555]" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Type your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off text-[#888]"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye text-[#888]"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </button>
                    </div>
                    <div className="w-full h-[.5px] mt-2 bg-[#ccc]"></div>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="w-full absolute bottom-8 px-6 flex flex-col items-center">
                    <input className="w-full h-[40px] mt-20 bg-cyan-200 rounded-[25px] cursor-pointer" type="submit" value="Sign Up" />
                    <a className="mt-3 text-xs underline" href="/login">Log in</a>
                </div>
            </form>
        </main>
    );
};

export default Signup;