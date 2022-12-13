import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, redirect } from 'react-router-dom';
import { myContext } from '../context/Context';

function Topbar() {
  const userObject = useContext(myContext);
  const [user, setUser] = useState(userObject);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(userObject, 'hi');

  return (
    <div className="bg-yellow-200">
      <div>
        <Link to="/">
          <span>Crople</span>
        </Link>
      </div>
      <div>
        <Link to={'/profile/' + user.username}>
          <img
            src={
              user.profilePicture
                ? user.profilePicture
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
