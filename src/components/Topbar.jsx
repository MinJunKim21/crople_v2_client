import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

function Topbar() {
  const userObject = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="bg-yellow-200">
      <div>
        <Link to="/">
          <span>Crople</span>
        </Link>
      </div>
      <div>
        <Link to={`/profile/${userObject.username}`}>
          <img
            src={
              userObject.profilePicture
                ? userObject.profilePicture
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
