import React from 'react';
import styles from './RequestResult.module.css'

function RequestResult({ result }) {
  if (!result) return null;

  return (
    <div className={styles.requestResult}>
      <p>Status: {result.status}</p>
      <pre>{JSON.stringify(result.data, null, 2)}</pre>
    </div>
  );
}

export default RequestResult;