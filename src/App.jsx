import React, { useState } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { auth, db } from './firebase.js'; 

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Dusty",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Nala"
];

const Login = () => {
  const navigate = useNavigate();
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', padding: '20px'}}>
      <div style={{width: '100%', maxWidth: '400px', background: '#1e293b', padding: '40px', borderRadius: '30px', textAlign: 'center', border: '1px solid #334155'}}>
        <h2 style={{fontSize: '32px', fontWeight: '900', color: '#3b82f6', marginBottom: '30px'}}>EARNING X</h2>
        <input style={{width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '15px', background: '#0f172a', border: '1px solid #334155', color: 'white'}} placeholder="Email" />
        <input style={{width: '100%', padding: '15px', marginBottom: '25px', borderRadius: '15px', background: '#0f172a', border: '1px solid #334155', color: 'white'}} type="password" placeholder="Password" />
        <button onClick={() => navigate('/main')} style={{width: '100%', padding: '15px', background: '#2563eb', border: 'none', borderRadius: '15px', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>LOGIN</button>
        <p style={{marginTop: '20px', color: '#94a3b8', cursor: 'pointer'}} onClick={() => navigate('/register')}>New account? <span style={{color: '#60a5fa'}}>Register</span></p>
      </div>
    </div>
  );
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get('invitationCode') || '';
  const navigate = useNavigate();
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', padding: '20px'}}>
      <div style={{width: '100%', maxWidth: '400px', background: '#1e293b', padding: '40px', borderRadius: '30px', border: '1px solid #334155'}}>
        <h2 style={{textAlign: 'center', color: '#3b82f6', marginBottom: '20px'}}>Register</h2>
        <input style={{width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: 'white'}} placeholder="Full Name" />
        <input style={{width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: 'white'}} placeholder="Email" />
        <input style={{width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: 'white'}} defaultValue={inviteCode} placeholder="Invite Code" />
        <button onClick={() => navigate('/main')} style={{width: '100%', padding: '15px', background: '#059669', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold'}}>CREATE ACCOUNT</button>
        <p style={{marginTop: '15px', textAlign: 'center', color: '#94a3b8', cursor: 'pointer'}} onClick={() => navigate('/login')}>Back to Login</p>
      </div>
    </div>
  );
};

const Main = () => {
  const [user] = useState({ name: 'User', avatar: avatars[0] });
  return (
    <div style={{minHeight: '100vh', background: '#0f172a', color: 'white'}}>
      <nav style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#1e293b', alignItems: 'center'}}>
        <div style={{fontSize: '20px'}}>☰</div>
        <div style={{fontWeight: 'bold', color: '#3b82f6'}}>EARNING X</div>
        <img src={user.avatar} style={{width: '35px', borderRadius: '50%', border: '2px solid #3b82f6'}} alt="profile" />
      </nav>
      <div style={{padding: '20px', maxWidth: '500px', margin: '0 auto'}}>
        <div style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)', padding: '30px', borderRadius: '25px', marginBottom: '20px'}}>
          <p style={{margin: 0, opacity: 0.8}}>Total Balance</p>
          <h1 style={{fontSize: '40px', margin: '10px 0'}}>$0.00</h1>
        </div>
        <h3>Daily Tasks</h3>
        <div style={{background: '#1e293b', padding: '20px', borderRadius: '20px', border: '1px solid #334155'}}>
          <p>🐦 Twitter Tasks</p>
          <button style={{width: '100%', padding: '12px', background: '#3b82f6', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold'}}>Bind Twitter Account</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
