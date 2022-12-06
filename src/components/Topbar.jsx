import { Link } from 'react-router-dom';
function Topbar() {
  return (
    <div className="bg-yellow-200">
      <div>
        <Link to="/">
          <span>Crople</span>
        </Link>
      </div>
      <div>
        <div>
          <span>searchicon</span>
          <input placeholder="Search friend, post or video" />
        </div>
      </div>

      <div>
        <div>
          <span>Homepage</span>
          <span>TimeLine</span>
        </div>
        <div>
          <div>
            <span>personicon</span>
            <span>1</span>
          </div>
          <div>
            <span>chaticon</span>
            <span>2</span>
          </div>
          <div>
            <span>notificationicon</span>
            <span>1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="w-6" />
      </div>
    </div>
  );
}

export default Topbar;
