import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { useContext } from 'react';
import { myContext } from '../context/Context';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get(`http://localhost:5001/api/users/all`);
      setAllUsers(res.data);
      // console.log(allUsers);
    };
    fetchAll();
  }, []);
  const userObject = useContext(myContext);
  console.log(userObject);
  console.log(allUsers);
  return (
    <div>
      <Topbar />
      <div>
        <div>
          {allUsers.map((user) => (
            <div>{user.username}</div>
          ))}
        </div>
        {/* <Sidebar /> */}
        {/* <Feed /> */}
        {/* <Rightbar /> */}
      </div>
    </div>
  );
}

export default Home;
