function Online({ user }) {
  return (
    <li>
      <div>
        <img src={user.profilePicture} alt="" className="w-6" />
        <span>onlinecircle</span>
      </div>
      <span>{user.username}</span>
    </li>
  );
}

export default Online;
