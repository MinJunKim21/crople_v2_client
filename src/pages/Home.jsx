import Card from '../components/Card';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { posts } from '../data';

function Home() {
  return (
    <div>
      <div>home page</div>
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
      <Topbar />
      <div>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}

export default Home;
