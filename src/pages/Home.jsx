import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Rightbar from '../components/Rightbar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const userObject = useContext(AuthContext);
  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get(`http://localhost:5001/api/users/all`);
      setAllUsers(res.data);
      // console.log(allUsers);
    };
    fetchAll();
  }, []);

  return (
    <div>
      <Topbar />
      <div>
        <div>
          {allUsers.map((user) => (
            <Link to={`/profile/${user.username}`}>
              <div key={user._id}>{user.username || user.email}</div>
            </Link>
          ))}
        </div>
        {/* <Sidebar /> */}
        {/* <Rightbar /> */}
      </div>
    </div>
  );
}

export default Home;
