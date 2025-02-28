import React, { useEffect, useRef } from 'react';

function RequestForm({ metadata, setMetadata, onSubmit }) {
  const updateMetadata = (field, value) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }));
  }
  const selectRef = useRef(null);

  useEffect(() => {
    const selectedOption = selectRef.current.options[selectRef.current.selectedIndex];
    selectRef.current.style.color = window.getComputedStyle(selectedOption).color;
  }, [metadata.method]);

  return (
    <div className="request-form">
      <select className="request-method" ref={selectRef} value={metadata.method} onChange={(e) => updateMetadata('method', e.target.value)}>
        <option className="opt-green" value="GET">GET</option>
        <option className="opt-orange" value="POST">POST</option>
        <option className="opt-blue" value="PUT">PUT</option>
        <option className="opt-purple" value="PATCH"> PATCH </option>
        <option className="opt-red" value="DELETE">DELETE</option>
      </select>
      <input type="text" className="request-url" value={metadata.url} onChange={(e) => updateMetadata('url', e.target.value)} placeholder="Enter URL" />
      <button onClick={onSubmit}>Send</button>
    </div>
  );
}

export default RequestForm;