import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

function Topbar() {
  const userObject = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="bg-yellow-200 flex">
      <span>탭바역할</span>
      <div>
        <Link to="/">
          <span>Crople 홈페이지로가짐</span>
        </Link>
      </div>
      <div>
        <Link to={`/profile/${userObject.username}`}>
          <div className="flex">
            <img
              src={
                userObject.profilePicture === ''
                  ? PF + 'person/noAvatar.png'
                  : PF + userObject.profilePicture
              }
              alt=""
              className="w-6"
            />
            <span>{userObject.username}</span>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/messenger">
          <div>messenger</div>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
