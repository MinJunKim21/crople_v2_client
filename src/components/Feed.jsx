import Post from './Post';
import Share from './Share';
import { Posts } from '../dummyData';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        'http://localhost:5001/api/posts/timeline/638e2f70ce6a2cd6f87d1007'
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-blue-200">
      <div>
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
