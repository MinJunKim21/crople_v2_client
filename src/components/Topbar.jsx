import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

function Topbar() {
  const userObject = useContext(AuthContext);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_ROOT}/googleauth/logout`, '_self');
  };

  return (
    <div className="bg-yellow-200 flex">
      <span>탭바역할</span>
      <div>
        <Link to="/">
          <span>Crople 홈페이지로가짐</span>
        </Link>
      </div>
      <div>
        <Link to={`/profile/${userObject.nickName}`}>
          <div className="flex">
            {/* <img
              src={
                userObject.profilePicture === ''
                  ? `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`
                  : `${process.env.REACT_APP_PUBLIC_FOLDER}/${userObject.profilePicture}`
              }
              alt=""
              className="w-6"
            /> */}

            <span>
              {userObject.nickName ? userObject.nickName : userObject.email}
            </span>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/messenger">
          <div>messenger</div>
        </Link>
      </div>
      <span>
        <button onClick={logout}>logout</button>
      </span>
    </div>
  );
}

export default Topbar;
