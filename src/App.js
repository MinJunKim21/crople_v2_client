// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/Profile';
import Messenger from './pages/Messenger';
import { ProfileEdit } from './pages/ProfileEdit';
import { Chat } from './pages/Chat';
import { PlayGround } from './pages/PlayGround';

function App() {
  const userObject = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={userObject._id ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={userObject._id ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/profile/:_id"
          element={userObject._id ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/messenger"
          element={userObject._id ? <Messenger /> : <Navigate to="/login" />}
        />
        <Route
          path="/profileedit/:_id"
          element={userObject._id ? <ProfileEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat/:_id"
          element={userObject._id ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          path="/playground"
          element={userObject._id ? <PlayGround /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
