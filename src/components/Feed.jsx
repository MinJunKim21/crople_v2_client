import Post from './Post';
import Share from './Share';
import { Posts } from '../dummyData';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { myContext } from '../context/Context';

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const userObject = useContext(myContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get('http://localhost:5001/api/posts/profile/' + username)
        : await axios.get(
            'http://localhost:5001/api/posts/timeline/' + userObject._id
          );
      setPosts(res.data);
    };
    fetchPosts();
  }, [username, userObject._id]);

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
