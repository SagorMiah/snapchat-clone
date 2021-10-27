import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import cameraRducer from "../features/cameraSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    camera: cameraRducer,
  },
});
