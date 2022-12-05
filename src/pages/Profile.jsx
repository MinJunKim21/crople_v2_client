import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
export default function Profile() {
  return (
    <div>
      <Topbar />
      <div>
        <Sidebar />
        <div>
          <div>
            <div>
              <img src="assets/post/3.jpeg" alt="" />
              <img src="assets/person/7.jpeg" alt="" />
            </div>
            <div>
              <h4>mijaykim</h4>
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
