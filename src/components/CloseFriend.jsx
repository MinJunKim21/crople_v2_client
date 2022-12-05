function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li>
      <img src={PF + user.profilePicture} alt="" className="w-6" />
      <span>{user.username}</span>
    </li>
  );
}

export default CloseFriend;
