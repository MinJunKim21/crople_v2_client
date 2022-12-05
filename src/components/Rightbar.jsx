import { Users } from '../dummyData';
import Online from './Online';
function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
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
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4>user information</h4>
        <div>
          <div>
            <span>city</span>
            <span>NewYork</span>
          </div>
          <div>
            <span>From:</span>
            <span>Madrid</span>
          </div>
          <div>
            <span>Relationship</span>
            <span>Single</span>
          </div>
        </div>
        <h4>user friends</h4>
        <div>
          <div>
            <img src="assets/person/1.jpeg" alt="" className="w-6" />
            <span>juholee</span>
          </div>
          <div>
            <img src="assets/person/2.jpeg" alt="" className="w-6" />
            <span>sunzo</span>
          </div>
          <div>
            <img src="assets/person/3.jpeg" alt="" className="w-6" />
            <span>sunnysun</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      <div>{profile ? <ProfileRightbar /> : <HomeRightbar />}</div>
    </div>
  );
}

export default Rightbar;
