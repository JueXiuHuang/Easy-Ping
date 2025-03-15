import React, { useState, useCallback, useEffect, useRef } from 'react';
import RequestMeta from './RequestMeta';
import DynamicForm from './Form';
import BodyEditor from './BodyEditor';
import RequestResult from './RequestResult';
import CustomdataBar from './Customdata'
import Sidebar from './Sidebar';
import { sendHttpRequest } from './utils/httpRequest';
import styles from './App.module.css';

function App() {
  const [headers, setHeaders] = useState([{ key: '', value: '', checked: false }]);
  const [params, setParams] = useState([{ key: '', value: '', checked: false }]);
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [currentTab, setCurrentTab] = useState('header');
  const [metadata, setMetadata] = useState({ method: 'GET', url: '' });
  const [customdata, setCustomdata] = useState('New Request');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [savedRequests, setSavedRequests] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedRequests = localStorage.getItem('savedRequests');
    if (storedRequests) {
      setSavedRequests(JSON.parse(storedRequests));
    }
  }, []);

  const onSubmit = useCallback(async () => {
    const response = await sendHttpRequest(metadata, headers, params, body);
    setResult(response);
  }, [metadata, headers, params, body])

  const onSave = useCallback(async () => {
    console.log('try to save request')
    console.log(customdata)
    console.log(metadata)
    console.log(headers)
    console.log(params)
    console.log(body)
    console.log('==================')
  }, [customdata, metadata, headers, params, body])

  const handleRequestSelect = useCallback((request) => {
    setSelectedRequest(request.name);
    setCustomdata(request.name);
    setMetadata(request.metadata);
    setHeaders(request.headers);
    setParams(request.params);
    setBody(request.body);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const renderFormContent = () => {
    switch (currentTab) {
      case 'header':
        return <DynamicForm infoList={headers} setInfoList={setHeaders} />;
      case 'params':
        return <DynamicForm infoList={params} setInfoList={setParams} />;
      case 'body':
        return <BodyEditor body={body} setBody={setBody} />;
      default:
        return null;
    }
  };

  const isTabActive = (x, y) => (x === y ? 'active' : '');

  return (
    <div className={`${styles.appContainer}`}>
      <Sidebar
        savedRequests={savedRequests}
        onSelectRequest={handleRequestSelect}
        selectedRequest={selectedRequest}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className={`${styles.mainContent}`}>
        <CustomdataBar customdata={customdata} setCustomdata={setCustomdata} onSave={onSave} toggleSidebar={toggleSidebar} />
        <RequestMeta metadata={metadata} setMetadata={setMetadata} onSubmit={onSubmit} />

        <nav>
          <button className={`tab-button ${isTabActive('header', currentTab)}`} onClick={() => setCurrentTab('header')}>Headers</button>
          <button className={`tab-button ${isTabActive('params', currentTab)}`} onClick={() => setCurrentTab('params')}>Params</button>
          <button className={`tab-button ${isTabActive('body', currentTab)}`} onClick={() => setCurrentTab('body')}>Body</button>
        </nav>

        <div className="tab-wrapper">
          {renderFormContent()}
        </div>

        <RequestResult result={result} />
      </div>
    </div>
  );
}

export default App;


