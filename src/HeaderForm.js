import React from 'react';

function HeaderForm({ headers, setHeaders }) {
  const addHeader = () => {
    setHeaders([...headers, { checked: false, key: '', value: '' }]);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <div>
      {headers.map((header, index) => (
        <div key={index}>
          <input type="checkbox" checked={header.checked} onChange={(e) => updateHeader(index, 'checked', e.target.checked)} />
          <input type="text" value={header.key} placeholder="Key" onChange={(e) => updateHeader(index, 'key', e.target.value)} />
          <input type="text" value={header.value} placeholder="Value" onChange={(e) => updateHeader(index, 'value', e.target.value)} />
        </div>
      ))}
      <button className="button-new-input-row" onClick={addHeader}>+</button>
    </div>
  );
}

export default HeaderForm;