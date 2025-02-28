import React, { useState } from 'react';
import RequestForm from './RequestForm';
import DynamicForm from './Form';
import BodyEditor from './BodyEditor';
import RequestResult from './RequestResult';
import { sendHttpRequest } from './httpRequest';

function App() {
  const [headers, setHeaders] = useState([{ key: '', value: '', checked: false }]);
  const [params, setParams] = useState([{ key: '', value: '', checked: false }]);
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [currentTab, setCurrentTab] = useState('header');

  const handleSubmit = async (requestConfig) => {
    const response = await sendHttpRequest(requestConfig, headers, params, body);
    setResult(response);
  };

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

  const isTabActive = (x, y) => {
    if (x === y) return 'active'
    return ''
  };

  return (
    <div>
      <RequestForm onSubmit={handleSubmit} />

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
  );
}

export default App;
