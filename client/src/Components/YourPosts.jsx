import { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const YourPosts = ({ userId }) => {
  const [userFeed, setUserFeed] = useState([]);
  const allPost = useSelector((state) => state.feed.feeds);

  useEffect(() => {
    const feed = [...allPost]?.filter(
      (post) => post.postedBy.toString() === userId
    );
    setUserFeed(feed);
  }, [userId, allPost]);

  return (
    <section className="flex flex-col pb-16">
      <h1 className="text-xl font-bold text-center pb-4">
        Your Posts: {userFeed.length}
      </h1>
      <div className="w-full">
        {userFeed?.map((data) => {
          return <Card key={data._id} {...data} />;
        })}
      </div>
    </section>
  );
};

YourPosts.propTypes = {
  userId: PropTypes.string,
};

export default YourPosts;
