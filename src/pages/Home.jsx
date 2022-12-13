import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { useContext } from 'react';
import { myContext } from '../context/Context';

function Home() {
  const userObject = useContext(myContext);
  console.log(userObject, 'hi');
  return (
    <div>
      <Topbar />
      <div>
        {/* <Sidebar /> */}
        {/* <Feed /> */}
        {/* <Rightbar /> */}
      </div>
    </div>
  );
}

export default Home;
