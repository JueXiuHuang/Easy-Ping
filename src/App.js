import React from 'react';
import styles from './App.module.css';
import { Context, useAppContext } from './Context';
import Sidebar from './Sidebar';
import CustomdataBar from './Customdata';
import RequestMeta from './RequestMeta';
import DynamicForm from './Form';
import BodyEditor from './BodyEditor';
import RequestResult from './RequestResult';

function App() {
  return (
    <Context>
      <div className={styles.appContainer}>
        <Sidebar />
        <MainContent />
      </div>
    </Context>
  );
}

const isTabActive = (x, y) => (x === y ? `${styles.active}` : '');

const MainContent = () => {
  const { currentTab, setCurrentTab } = useAppContext();

  const renderFormContent = () => {
    switch (currentTab) {
      case 'header': return <DynamicForm type="headers" />;
      case 'params': return <DynamicForm type="params" />;
      case 'body': return <BodyEditor />;
      default: return null;
    }
  };

  return (
    <div className={styles.mainContent}>
      <CustomdataBar />
      <RequestMeta />
      <nav>
        <button className={`${styles.tabSwitchBtn} ${isTabActive('header', currentTab)}`} onClick={() => setCurrentTab('header')}>Headers</button>
        <button className={`${styles.tabSwitchBtn} ${isTabActive('params', currentTab)}`} onClick={() => setCurrentTab('params')}>Params</button>
        <button className={`${styles.tabSwitchBtn} ${isTabActive('body', currentTab)}`} onClick={() => setCurrentTab('body')}>Body</button>
      </nav>
      <div className={styles.tabWrapper}>{renderFormContent()}</div>
      <RequestResult />
    </div>
  );
};

export default App;