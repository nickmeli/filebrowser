import React from 'react';
import './App.css';
import { Layout } from './views/layouts/master_layout';
import { HomeContainer } from './views/home/containers/home';
import { store } from "./state";
import { Provider } from "react-redux";
import LoaderComponent from './views/shared/components/loader-component';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <HomeContainer />
      </Layout>
      <LoaderComponent />
    </Provider>
  );
};
export default App;
