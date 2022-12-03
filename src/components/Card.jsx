import React from 'react';
import { Link } from 'react-router-dom';

function Card({ post }) {
  return (
    <div>
      <Link to={`/post/${post.id}`}>
        <div>{post.title}</div>
        <div>{post.desc}</div>
      </Link>
    </div>
  );
}

export default Card;
