import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, User, Home, Wallet, CheckCircle, Twitter, X, Camera, BadgeCheck, LogOut } from 'lucide-react';

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

// --- Components ---

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white bg-[#0f172a]">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-[2.5rem] border border-gray-700 shadow-2xl">
        <h2 className="text-4xl font-black text-blue-500 italic text-center mb-8">EARNING X</h2>
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-4 outline-none focus:border-blue-500" placeholder="Email" />
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-6 outline-none focus:border-blue-500" type="password" placeholder="Password" />
        <button onClick={() => navigate('/main')} className="w-full bg-blue-600 py-4 rounded-2xl font-bold">LOGIN</button>
        <p className="mt-4 text-center text-gray-400" onClick={() => navigate('/register')}>New here? <span className="text-blue-400">Register</span></p>
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
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-[2.5rem] border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-4" placeholder="Full Name" />
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-4" placeholder="Email" />
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 mb-4" defaultValue={inviteCode} placeholder="Invitation Code" />
        <button onClick={() => navigate('/main')} className="w-full bg-green-600 py-4 rounded-2xl font-bold">REGISTER</button>
      </div>
    </div>
  );
};

const Main = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Sabbir Ahmed', email: 'sabbir@mail.com', avatar: avatars[0], verified: true });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-[#1e293b] border-b border-gray-800 sticky top-0 z-30">
        <Menu onClick={() => setMenuOpen(true)} className="text-blue-400 cursor-pointer" />
        <div className="text-xl font-black italic">EARNING X</div>
        <div onClick={() => setProfileOpen(true)} className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden cursor-pointer">
          <img src={user.avatar} alt="user" />
        </div>
      </nav>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-[#1e293b] h-full p-6 shadow-2xl transition-all">
            <div className="flex justify-between items-center mb-10 text-blue-400">
              <span className="font-bold text-xl">Menu</span>
              <X onClick={() => setMenuOpen(false)} />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-lg"><Home size={20}/> Tasks</div>
              <div className="flex items-center gap-4 text-lg"><Wallet size={20}/> Withdraw</div>
              <div className="flex items-center gap-4 text-lg"><User size={20}/> Profile</div>
              <div className="flex items-center gap-4 text-lg text-red-400"><LogOut size={20}/> Logout</div>
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMenuOpen(false)}></div>
        </div>
      )}

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 bg-[#0f172a] z-50 overflow-y-auto p-6">
          <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold">Profile</h2><X onClick={() => setProfileOpen(false)} /></div>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img src={user.avatar} className="w-28 h-28 rounded-full border-4 border-blue-600 bg-gray-800" />
              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
                <Camera size={16}/><input type="file" className="hidden" />
              </label>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold mb-8">
              {user.name} {user.verified && <BadgeCheck className="text-blue-400 fill-blue-400/20" />}
            </div>
            <div className="w-full max-w-md space-y-4 text-sm text-gray-300">
              <div><label>Email</label><input className="w-full bg-[#1e293b] p-4 rounded-xl mt-1" value={user.email} readOnly /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label>Birthday</label><input type="date" className="w-full bg-[#1e293b] p-4 rounded-xl mt-1" /></div>
                <div><label>Gender</label><select className="w-full bg-[#1e293b] p-4 rounded-xl mt-1"><option>Male</option><option>Female</option></select></div>
              </div>
            </div>
            <div className="mt-8 w-full max-w-md">
              <p className="mb-3 text-xs uppercase text-gray-500 font-bold">Select Avatar</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {avatars.map((av, i) => (
                  <img key={i} src={av} onClick={() => setUser({...user, avatar: av})} className={`w-12 h-12 rounded-full border-2 cursor-pointer ${user.avatar === av ? 'border-blue-500' : 'border-transparent opacity-50'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Section */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-[2rem] mb-8">
          <p className="text-blue-100">Total Assets</p>
          <h1 className="text-4xl font-black">$0.00</h1>
        </div>

        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Twitter className="text-blue-400" /> Twitter Tasks</h3>
        <div className="bg-[#1e293b] p-5 rounded-3xl border border-gray-700 mb-4">
          <p className="text-sm text-gray-400 mb-4">First, bind your X account by reposting our post.</p>
          <button className="w-full bg-blue-500 py-3 rounded-xl font-bold mb-2">Repost & Bind Account</button>
          <button className="w-full border border-blue-500 py-3 rounded-xl font-bold text-blue-400">Auto Verify</button>
        </div>

        <div className="space-y-3">
          {['Follow Twitter', 'Like & Repost', 'Join Telegram'].map((task, idx) => (
            <div key={idx} className="flex justify-between items-center bg-[#1e293b] p-4 rounded-2xl border border-gray-800">
              <span className="font-medium">{task}</span>
              <button className="bg-white text-black px-5 py-1.5 rounded-full text-sm font-bold">Start</button>
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
