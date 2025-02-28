import React, { useState, useCallback } from 'react';
import RequestForm from './RequestForm';
import DynamicForm from './Form';
import BodyEditor from './BodyEditor';
import RequestResult from './RequestResult';
import CustomdataBar from './Customdata'
import { sendHttpRequest } from './utils/httpRequest';

function App() {
  const [headers, setHeaders] = useState([{ key: '', value: '', checked: false }]);
  const [params, setParams] = useState([{ key: '', value: '', checked: false }]);
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [currentTab, setCurrentTab] = useState('header');
  const [metadata, setMetadata] = useState({ method: 'GET', url: '' })
  const [customdata, setCustomdata] = useState('New Request')

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
      <CustomdataBar customdata={customdata} setCustomdata={setCustomdata} onSave={onSave}/>
      <RequestForm metadata={metadata} setMetadata={setMetadata} onSubmit={onSubmit}/>

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
