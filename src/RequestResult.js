import React from 'react';
import { useAppContext } from './Context';
import styles from './RequestResult.module.css'

function RequestResult() {
  const { result } = useAppContext();
  if (!result) return null;

  return (
    <div className={styles.requestResult}>
      <p>Status: {result.status}</p>
      <pre>{JSON.stringify(result.data, null, 2)}</pre>
    </div>
  );
}

export default RequestResult;