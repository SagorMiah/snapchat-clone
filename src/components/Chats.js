import { Avatar } from "@material-ui/core";
import { ChatBubble, RadioButtonChecked, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/chats.css";
import { selectApp } from "../features/appSlice";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { restCameraImage } from "../features/cameraSlice";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectApp);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeSnap = () => {
    dispatch(restCameraImage());
    history.push("/");
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <Search className="chats__search" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubble className="chats__icon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonChecked
        className="chats__takepicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
