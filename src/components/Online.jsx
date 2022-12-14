function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li>
      <div>
        <img src={PF + user.profilePicture} alt="" className="w-6" />
        <span>onlinecircle</span>
      </div>
      <span>{user.username}</span>
    </li>
  );
}

export default Online;
