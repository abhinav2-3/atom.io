import { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const YourPosts = () => {
  const [feed, setFeed] = useState([]);
  const data = useSelector((state) => state.user.userFeed);

  useEffect(() => {
    setFeed(data);
  }, [data]);

  return (
    <section className="p-4 flex flex-col border-t">
      <h1 className="text-xl font-bold text-center pb-4">
        Your Posts: {feed.length}
      </h1>
      <div className="w-full">
        {feed?.map((data) => {
          return <Card key={data._id} {...data} />;
        })}
      </div>
    </section>
  );
};

export default YourPosts;
