// src/App.tsx
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/header'
import RoomList from './pages/RoomList'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative w-full h-screen">
        <div className="absolute top-0 left-0 w-full z-10">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room_list" element={<RoomList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}