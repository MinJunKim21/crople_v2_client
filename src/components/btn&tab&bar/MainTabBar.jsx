import React from 'react';
import { Link } from 'react-router-dom';

function MainTabBar({ reload }) {
  return (
    <div className="space-x-8">
      <button>큐레이션</button>
      <Link to="/">
        <button
          onClick={
            reload === 'true'
              ? () => {
                  window.location.reload();
                }
              : null
          }
        >
          홈
        </button>
      </Link>
      <Link to="/messenger">
        <button>챗</button>
      </Link>
    </div>
  );
}

export default MainTabBar;
