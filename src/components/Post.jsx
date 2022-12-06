import { useState, useEffect } from 'react';
import axios from 'axios';

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5001/api/users/${post.userId}`
      );
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, []);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div>
      <div>
        <div>
          <div>
            <img
              src={user.profilePicture || PF + 'person/noAvatar.png'}
              alt=""
              className="w-6"
            />
            <span>{user.username}</span>
            <span>{post.date}</span>
          </div>
          <div>
            <span>threedoticon</span>
          </div>
        </div>
        <div>
          <span>{post?.desc}</span>
          <img src={PF + post.img} alt="" className="w-20" />
        </div>
        <div>
          <div>
            <img
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
              className="w-6"
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              onClick={likeHandler}
              className="w-6"
            />
            <span>{like} people liked it</span>
          </div>
          <div>
            <span>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
