import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './components/Post';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { myContext } from './context/Context';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';

function App() {
  const userObject = useContext(myContext);
  // const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={userObject ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={userObject ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={userObject ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={userObject ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/post/:id"
          element={userObject ? <Post /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
