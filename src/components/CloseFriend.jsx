function CloseFriend({ user }) {
  return (
    <li>
      <img src={user.profilePicture} alt="" className="w-6" />
      <span>{user.username}</span>
    </li>
  );
}

export default CloseFriend;
