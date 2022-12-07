import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../context/Context';

function Topbar() {
  const userobject = useContext(myContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="bg-yellow-200">
      <div>
        <Link to="/">
          <span>Crople</span>
        </Link>
      </div>
      {/* <div>
        <div>
          <span>searchicon</span>
          <input placeholder="Search friend, post or video" />
        </div>
      </div> */}

      <div>
        {/* <div>
          <span>Homepage</span>
          <span>TimeLine</span>
        </div> */}
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
        <Link to={`/profile/${userobject.username}`}>
          <img
            src={
              userobject.profilePicture
                ? userobject.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt=""
            className="w-6"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
