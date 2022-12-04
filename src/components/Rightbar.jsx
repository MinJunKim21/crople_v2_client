import { Users } from '../dummyData';
import Online from './Online';
function Rightbar() {
  return (
    <div>
      <div>
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
    </div>
  );
}

export default Rightbar;
