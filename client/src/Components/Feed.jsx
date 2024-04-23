import Card from "../Components/Card";
import { useSelector } from "react-redux";
import Error from "./Error";
import Loader from "./Loader";

const Feed = () => {
  const feeds = useSelector((state) => state.feed.feeds);
  const status = useSelector((state) => state.feed.status);

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <Error />
      ) : (
        <div className="p-4 px-8 h-[84vh] overflow-y-auto feed">
          {feeds?.map((data) => (
            <Card key={data._id} {...data} />
          ))}
        </div>
      )}
    </>
  );
};

export default Feed;
