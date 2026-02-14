import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="w-full max-w-sm bg-[#1e293b] p-10 rounded-[30px] shadow-2xl border border-gray-700 text-center">
        <h1 className="text-4xl font-black text-blue-500 mb-8 italic">EARNING X</h1>
        <input className="w-full p-4 bg-gray-900 border border-gray-700 rounded-2xl mb-4 text-white outline-none" placeholder="Email" />
        <input className="w-full p-4 bg-gray-900 border border-gray-700 rounded-2xl mb-6 text-white outline-none" type="password" placeholder="Password" />
        <button onClick={() => navigate('/main')} className="w-full bg-blue-600 py-4 rounded-2xl font-bold">SIGN IN</button>
        <p className="mt-5 text-gray-400 cursor-pointer" onClick={() => navigate('/register')}>New account? <span className="text-blue-400">Register</span></p>
      </div>
    </div>
  );
};

const Main = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <nav className="p-5 bg-[#1e293b] flex justify-between items-center border-b border-gray-800">
        <div className="text-xl font-bold text-blue-500 italic">EARNING X</div>
        <div className="w-10 h-10 bg-gray-700 rounded-full border-2 border-blue-500 flex items-center justify-center">👤</div>
      </nav>
      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-[30px] shadow-lg mb-8">
          <p className="opacity-80">Total Balance</p>
          <h2 className="text-4xl font-black mt-2">$0.00</h2>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-3xl border border-gray-700">
          <h3 className="font-bold mb-4">Twitter Tasks</h3>
          <button className="w-full bg-blue-500 py-3 rounded-xl font-bold mb-3">Bind Account</button>
          <div className="p-4 bg-gray-900 rounded-xl flex justify-between items-center border border-gray-800">
            <span>Follow Earning X</span>
            <button className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold">START</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="w-full max-w-sm bg-[#1e293b] p-10 rounded-[30px] border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <input className="w-full p-4 bg-gray-900 border border-gray-700 rounded-2xl mb-4" placeholder="Name" />
        <input className="w-full p-4 bg-gray-900 border border-gray-700 rounded-2xl mb-4" placeholder="Email" />
        <button onClick={() => navigate('/main')} className="w-full bg-blue-600 py-4 rounded-2xl font-bold">CREATE</button>
        <p className="mt-4 text-center text-gray-400 cursor-pointer" onClick={() => navigate('/login')}>Login instead</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}
