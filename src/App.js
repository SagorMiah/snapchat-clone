import React, { useEffect } from "react";
import WebcamCapture from "./components/WebcamCapture";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";
import { useSelector } from "react-redux";
import { login, logout, selectApp } from "./features/appSlice";
import { useDispatch } from "react-redux";
import Login from "./components/Login";
import { auth } from "./firebase";

const App = () => {
  const user = useSelector(selectApp);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout);
      }
    });
  }, []);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
              alt=""
            />
            <div className="app__body">
              <div className="app__background">
                <Switch>
                  <Route exact path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                  <Route exact path="/preview">
                    <Preview />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
