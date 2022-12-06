import { Users } from '../dummyData';
import Online from './Online';

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightbar = () => {
    return (
      <div className="bg-red-200">
        <div>
          <img src="assets/gift.png" alt="" className="w-6" />
          <span>happy bday my friends</span>
        </div>
        <img src="assets/ad.png" alt="" className="w-6" />
        <h4>online friends</h4>
        <ul>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div className="bg-orange-200">
        <h4>user information</h4>
        <div>
          <div>
            <span>city : </span>
            <span>{user.city}</span>
          </div>
          <div>
            <span>From : </span>
            <span>{user.from}</span>
          </div>
          <div>
            <span>Relationship : </span>
            <span>
              {user.relationship === 1
                ? 'Single'
                : user.relationship === 2
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <h4>user friends</h4>
        <div>
          <div>
            <img src={`${PF}person/1.jpeg`} alt="" className="w-6" />
            <span>juholee</span>
          </div>
          <div>
            <img src={`${PF}person/2.jpeg`} alt="" className="w-6" />
            <span>sunzo</span>
          </div>
          <div>
            <img src={`${PF}person/3.jpeg`} alt="" className="w-6" />
            <span>sunnysun</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {/* <div>{user ? <HomeRightbar /> : <ProfileRightbar />}</div> */}
      <HomeRightbar />
      <ProfileRightbar />
    </div>
  );
}

export default Rightbar;
