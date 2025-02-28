import React from 'react';

function RequestResult({ result }) {
  if (!result) return null;

  return (
    <div>
      <p>Status: {result.status}</p>
      <pre>{JSON.stringify(result.data, null, 2)}</pre>
    </div>
  );
}

export default RequestResult;