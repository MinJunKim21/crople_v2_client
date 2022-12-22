// import axios from 'axios';
// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';

// export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
//   const [friends, setFriends] = useState([]);
//   const [onlineFriends, setOnlineFriends] = useState([]);

//   useEffect(() => {
//     const getFriends = async () => {
//       const res = await axios.get(
//         'http://localhost:5001/api/users/friends/' + currentId
//       );
//       setFriends(res.data);
//     };
//     getFriends();
//   }, [currentId]);
//   console.log(onlineUsers);

//   useEffect(() => {
//     setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
//   }, [friends, onlineUsers]);

//   console.log(onlineFriends, 'hi');
//   return (
//     <div>
//       {onlineFriends.map((o) => (
//         <div>
//           <div>
//             <img
//               src="https://img.mbn.co.kr/filewww/news/other/2022/04/21/060014221410.jpg"
//               alt=""
//               className="w-6"
//             />
//             <div className="bg-green-400 w-2 h-2"></div>
//           </div>
//           <span>{o.username}</span>
//         </div>
//       ))}
//     </div>
//   );
// }
