import Card from "../Components/Card";
import { useSelector } from "react-redux";
import Error from "./Error";
import Loader from "./Loader";
import CreatePost from "./CreatePost";

const Feed = () => {
  const feeds = useSelector((state) => state.feed.feeds);
  const status = useSelector((state) => state.feed.status);

  const sortedFeed = [...feeds].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <Error />
      ) : (
        <div className="pt-20 pb-16 px-8 border h-screen overflow-y-auto md:w-1/2 feed">
          <CreatePost />
          <h1 className="mb-5 text-slate-400 text-lg">Recent Posts</h1>
          {sortedFeed?.map((data) => (
            <Card key={data._id} {...data} />
          ))}
        </div>
      )}
    </>
  );
};

export default Feed;
