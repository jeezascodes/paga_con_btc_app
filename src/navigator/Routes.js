import React from "react";
import { store } from "_store/";
import { Provider } from "react-redux";
import LoadingView from "../components/LoadingView/LoadingView";

export default function Routes() {
  return (
    <Provider store={store}>
      <LoadingView />
    </Provider>
  );
}
