import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './components/Post';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Messenger from './components/Messenger';

function App() {
  const userObject = useContext(AuthContext);
  console.log(userObject, '11f');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={userObject._id ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={userObject._id ? <Home /> : <Login />} />
        <Route
          path="/register"
          element={userObject._id ? <Navigate to="/" /> : <Register />}
        />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/profile/:username" element={<Profile />} />
        {/* <Route
          path="/post/:id"
          element={userObject ? <Post /> : <Navigate to="/login" />}
        /> */}
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
