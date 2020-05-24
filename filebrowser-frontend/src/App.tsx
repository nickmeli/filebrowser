import React from 'react';
import './App.css';
import { Layout } from './views/layouts/master_layout';
import { HomeContainer } from './views/home/containers/home';
import { store } from "./state";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <HomeContainer />
      </Layout>
    </Provider>
  );
};
export default App;
