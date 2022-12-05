import Post from './Post';
import Share from './Share';
import { Posts } from '../dummyData';

function Feed() {
  return (
    <div>
      <div>
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
