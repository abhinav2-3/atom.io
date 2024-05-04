import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../Components/CreatePost";
import Card from "../Components/Card";
const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const user = useSelector((state) => state.user.userProfile);
  const allPost = useSelector((state) => state.feed.feeds);

  useEffect(() => {
    const _bookmarks = user?.saved.flatMap((postId) => {
      return [...allPost].filter((post) => post._id === postId);
    });
    setBookmarks(_bookmarks);
  }, [user?.saved, allPost]);

  return (
    <div className="pt-20 pb-16 md:pb-4 lg:px-16 px-8 h-screen w-full overflow-y-auto feed">
      <CreatePost />
      <h1 className="mb-5 text-slate-400 text-lg">Saved Posts</h1>
      {bookmarks?.map((data) => (
        <Card key={data._id} {...data} />
      ))}
    </div>
  );
};

export default Bookmarks;
