import React, { useState } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, User, Home, Wallet, CheckCircle, Twitter, X, Camera, BadgeCheck, LogOut } from 'lucide-react';
// নিচে .js যোগ করা হয়েছে যাতে ভার্সেল সহজেই ফাইলটি খুঁজে পায়
import { auth, db } from './firebase.js'; 

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Dusty",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Nala",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Milo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Buster",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow"
];

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white bg-[#0f172a]">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-[2.5rem] border border-gray-700 shadow-2xl text-center">
        <h2 className="text-4xl font-black text-blue-500 italic mb-8">EARNING X</h2>
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-4 outline-none focus:border-blue-500" placeholder="Email" />
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-6 outline-none focus:border-blue-500" type="password" placeholder="Password" />
        <button onClick={() => navigate('/main')} className="w-full bg-blue-600 py-4 rounded-2xl font-bold">LOGIN</button>
        <p className="mt-4 text-gray-400 cursor-pointer" onClick={() => navigate('/register')}>New here? <span className="text-blue-400">Register</span></p>
      </div>
    </div>
  );
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get('invitationCode') || '';
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white bg-[#0f172a]">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-[2.5rem] border border-gray-700 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Register</h2>
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-4" placeholder="Full Name" />
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-4" placeholder="Email" />
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-4" defaultValue={inviteCode} placeholder="Invitation Code" />
        <button onClick={() => navigate('/main')} className="w-full bg-green-600 py-4 rounded-2xl font-bold">CREATE ACCOUNT</button>
        <p className="mt-4 text-center text-gray-400 cursor-pointer" onClick={() => navigate('/login')}>Back to Login</p>
      </div>
    </div>
  );
};

const Main = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({ name: 'User Name', email: 'user@mail.com', avatar: avatars[0], verified: true });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <nav className="flex items-center justify-between p-4 bg-[#1e293b] border-b border-gray-800 sticky top-0 z-30">
        <Menu onClick={() => setMenuOpen(true)} className="text-blue-400 cursor-pointer" />
        <div className="text-xl font-black italic">EARNING X</div>
        <div onClick={() => setProfileOpen(true)} className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden cursor-pointer">
          <img src={user.avatar} alt="user" />
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-[#1e293b] h-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-10 text-blue-400">
              <span className="font-bold text-xl uppercase tracking-widest">Menu</span>
              <X onClick={() => setMenuOpen(false)} className="cursor-pointer" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-lg hover:text-blue-400 cursor-pointer"><Home size={20}/> Tasks</div>
              <div className="flex items-center gap-4 text-lg hover:text-blue-400 cursor-pointer"><Wallet size={20}/> Withdraw</div>
              <div className="flex items-center gap-4 text-lg hover:text-blue-400 cursor-pointer"><User size={20}/> Profile</div>
              <div className="flex items-center gap-4 text-lg text-red-400 cursor-pointer"><LogOut size={20}/> Logout</div>
            </div>
          </div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>
        </div>
      )}

      {profileOpen && (
        <div className="fixed inset-0 bg-[#0f172a] z-50 overflow-y-auto p-6 animate-in fade-in duration-300">
          <div className="flex justify-between mb-6 items-center"><h2 className="text-2xl font-bold">Profile Settings</h2><X onClick={() => setProfileOpen(false)} className="cursor-pointer" /></div>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img src={user.avatar} className="w-28 h-28 rounded-full border-4 border-blue-600 bg-gray-800 shadow-xl" alt="avatar" />
              <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer shadow-lg"><Camera size={16}/></div>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold mb-8">
              {user.name} {user.verified && <BadgeCheck className="text-blue-400 fill-blue-400/20" />}
            </div>
            <div className="w-full max-w-md space-y-4">
              <div><label className="text-xs text-gray-500 ml-1">Email</label><input className="w-full bg-[#1e293b] p-4 rounded-xl mt-1 border border-gray-700" value={user.email} readOnly /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-gray-500 ml-1">Birthday</label><input type="date" className="w-full bg-[#1e293b] p-4 rounded-xl mt-1 border border-gray-700" /></div>
                <div><label className="text-xs text-gray-500 ml-1">Gender</label><select className="w-full bg-[#1e293b] p-4 rounded-xl mt-1 border border-gray-700"><option>Male</option><option>Female</option></select></div>
              </div>
            </div>
            <div className="mt-8 w-full max-w-md">
              <p className="mb-3 text-[10px] uppercase text-gray-500 font-bold tracking-widest">Select Your Avatar</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {avatars.map((av, i) => (
                  <img key={i} src={av} onClick={() => setUser({...user, avatar: av})} className={`w-14 h-14 rounded-full border-2 transition-all cursor-pointer ${user.avatar === av ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent opacity-40'}`} alt="avatar-option" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[2.5rem] mb-8 shadow-xl">
          <p className="text-blue-100 text-sm">Main Balance</p>
          <h1 className="text-4xl font-black mt-1">$0.00</h1>
          <button className="mt-4 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Withdrawal</button>
        </div>

        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Twitter className="text-blue-400" size={20} /> Social Tasks</h3>
        <div className="bg-[#1e293b] p-6 rounded-[2rem] border border-gray-800 shadow-lg mb-4">
          <p className="text-sm text-gray-400 mb-4">You must bind your X (Twitter) account before starting tasks.</p>
          <button className="w-full bg-blue-500 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 mb-3">Repost to Bind Account</button>
          <button className="w-full border border-blue-500/30 py-4 rounded-2xl font-bold text-blue-400 text-sm">Check Verification</button>
        </div>

        <div className="space-y-4">
          {['Follow @EarningX', 'Like Pinned Post', 'Join TG Channel'].map((task, idx) => (
            <div key={idx} className="flex justify-between items-center bg-[#1e293b] p-5 rounded-2xl border border-gray-800">
              <span className="font-semibold text-gray-200">{task}</span>
              <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase">Start</button>
            </div>
          ))}
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
