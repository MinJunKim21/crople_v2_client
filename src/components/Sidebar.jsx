import { Users } from '../dummyData';
import CloseFriend from './CloseFriend';
function Sidebar() {
  return (
    <div>
      <div>
        <ul>
          <li>feedicon</li>
          <span>Feed</span>
        </ul>
        <ul>
          <li>feedicon</li>
          <span>Feed</span>
          <li>chaticon</li>
          <span>Chats</span>
        </ul>
        <button>Show More</button>
        <hr />
        <ul>
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
