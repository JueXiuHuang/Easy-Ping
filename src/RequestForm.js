import React, { useState, useEffect, useRef } from 'react';

function RequestForm({ onSubmit }) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const selectRef = useRef(null);

  const handleSubmit = () => {
    onSubmit({ method, url });
  };

  useEffect(() => {
    const selectedOption = selectRef.current.options[selectRef.current.selectedIndex];
    selectRef.current.style.color = window.getComputedStyle(selectedOption).color;
  }, [method]);

  return (
    <div className="request-form">
      <select className="request-method" ref={selectRef} value={method} onChange={(e) => setMethod(e.target.value)}>
        <option className="opt-green" value="GET">GET</option>
        <option className="opt-orange" value="POST">POST</option>
        <option className="opt-blue" value="PUT">PUT</option>
        <option className="opt-purple" value="PATCH"> PATCH </option>
        <option className="opt-red" value="DELETE">DELETE</option>
      </select>
      <input type="text" className="request-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default RequestForm;