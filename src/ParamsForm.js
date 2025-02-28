import React from 'react';

function ParamsForm({ params, setParams }) {
  const addParam = () => {
    setParams([...params, { key: '', value: '', checked: false }]);
  };

  const updateParam = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  return (
    <div>
      {params.map((param, index) => (
        <div key={index}>
          <input type="checkbox" checked={param.checked} onChange={(e) => updateParam(index, 'checked', e.target.checked)} />
          <input type="text" value={param.key} placeholder="Key" onChange={(e) => updateParam(index, 'key', e.target.value)} />
          <input type="text" value={param.value} placeholder="Value" onChange={(e) => updateParam(index, 'value', e.target.value)} />
        </div>
      ))}
      <button onClick={addParam}>+</button>
    </div>
  );
}

export default ParamsForm;