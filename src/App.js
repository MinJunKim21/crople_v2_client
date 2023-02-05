// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Messenger from './pages/Messenger';
import Test from './pages/Test';
// import NeedProfile from './components/NeedProfile';

function App() {
  const userObject = useContext(AuthContext);
  // console.log(userObject, 'userob');

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
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route
          path="/profile/:_id"
          element={userObject._id ? <Profile /> : null}
        />

        <Route
          path="/messenger"
          element={userObject._id ? <Messenger /> : null}
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
