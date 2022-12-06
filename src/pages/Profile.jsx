import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="bg-purple-200">
      <Topbar />
      <div>
        <Sidebar />
        <div>
          <div>
            <div>
              <img src={`${PF}post/3.jpeg`} alt="" className="w-20" />
              <img src={`${PF}person/7.jpeg`} alt="" className="w-6" />
            </div>
            <div>
              <h4>mjkim</h4>
              <span>hi my friends</span>
            </div>
          </div>
          <div>
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </div>
  );
}
