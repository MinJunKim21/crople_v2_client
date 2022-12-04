import { useState } from 'react';
import { Users } from '../dummyData';

function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

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
              src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
              alt=""
              className="w-6"
            />
            <span>{Users.filter((u) => u.id === post.userId)[0].username}</span>
            <span>{post.date}</span>
          </div>
          <div>
            <span>threedoticon</span>
          </div>
        </div>
        <div>
          <span>{post?.desc}</span>
          <img src={post.photo} alt="" className="w-20" />
        </div>
        <div>
          <div>
            <img
              src="assets/like.png"
              alt=""
              onClick={likeHandler}
              className="w-6"
            />
            <img
              src="assets/heart.png"
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
