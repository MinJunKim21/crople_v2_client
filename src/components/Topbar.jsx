function Topbar() {
  return (
    <div>
      <div>
        <span>Crople</span>
      </div>
      <div>
        <div>
          <span>searchicon</span>
          <input placeholder="Search friend, post or video" />
        </div>
      </div>

      <div>
        <div>
          <span>Homepage</span>
          <span>TimeLine</span>
        </div>
        <div>
          <div>
            <span>personicon</span>
            <span>1</span>
          </div>
          <div>
            <span>chaticon</span>
            <span>2</span>
          </div>
          <div>
            <span>notificationicon</span>
            <span>1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="w-6" />
      </div>
    </div>
  );
}

export default Topbar;
