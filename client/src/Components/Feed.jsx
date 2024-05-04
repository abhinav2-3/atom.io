import Card from "../Components/Card";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const feedData = useSelector((state) => state.feed.feeds);
  useEffect(() => {
    setFeeds(feedData);
  }, [feedData]);
  const sortedFeed = [...feeds].sort((a, b) => b.createdAt - a.createdAt);
  return (
    <>
      <div className="pt-20 pb-16 md:pb-4 lg:px-16 px-8 h-screen w-full overflow-y-auto feed">
        <CreatePost />
        <h1 className="mb-5 text-slate-400 text-lg">Recent Posts</h1>
        {!sortedFeed ? (
          <Loader />
        ) : (
          sortedFeed?.map((data) => <Card key={data._id} {...data} />)
        )}
      </div>
    </>
  );
};

export default Feed;
