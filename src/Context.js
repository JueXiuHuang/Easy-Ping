import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { sendHttpRequest } from './utils/httpRequest';

const context = createContext();

export const Context = ({ children }) => {
  const [headers, setHeaders] = useState([{ key: '', value: '', checked: false }]);
  const [params, setParams] = useState([{ key: '', value: '', checked: false }]);
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [metadata, setMetadata] = useState({ method: 'GET', url: '' });

  const [currentTab, setCurrentTab] = useState('header');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [customdata, setCustomdata] = useState('New Request');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [savedRequests, setSavedRequests] = useState([]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const storedRequests = localStorage.getItem('savedRequests');
    if (storedRequests) setSavedRequests(JSON.parse(storedRequests));
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (savedRequests.length > 0) {
      localStorage.setItem('savedRequests', JSON.stringify(savedRequests));
    }
  }, [savedRequests]);

  const onSubmit = useCallback(async () => {
    const response = await sendHttpRequest(metadata, headers, params, body);
    setResult(response);
  }, [metadata, headers, params, body]);

  const saveRequest = useCallback(() => {
    const newRequest = { name: customdata, metadata, headers, params, body };
    setSavedRequests(prev => {
      return prev.map(req => req.name === newRequest.name ? newRequest : req)
        .concat(prev.some(req => req.name === newRequest.name) ? [] : [newRequest]);
    });
  }, [customdata, metadata, headers, params, body]);

  const handleRequestSelect = useCallback((request) => {
    setSelectedRequest(request.name);
    setCustomdata(request.name);
    setMetadata(request.metadata);
    setHeaders(request.headers);
    setParams(request.params);
    setBody(request.body);
  }, []);

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);

  return (
    <context.Provider value={{
      headers, setHeaders,
      params, setParams,
      body, setBody,
      result,
      metadata, setMetadata,

      currentTab, setCurrentTab,
      isSidebarOpen, setIsSidebarOpen,

      customdata, setCustomdata,
      savedRequests, setSavedRequests,
      selectedRequest, handleRequestSelect,

      onSubmit,
      saveRequest,
      toggleSidebar
    }}>
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => useContext(context);