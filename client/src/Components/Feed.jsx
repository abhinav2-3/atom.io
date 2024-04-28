import Card from "../Components/Card";
import { useSelector } from "react-redux";
import Error from "./Error";
import Loader from "./Loader";

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
        <div className="pt-20 pb-16 px-8 h-screen overflow-y-auto feed">
          {sortedFeed?.map((data) => (
            <Card key={data._id} {...data} />
          ))}
        </div>
      )}
    </>
  );
};

export default Feed;
