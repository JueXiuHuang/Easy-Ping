import React, { useEffect, useRef } from 'react';
import { useAppContext } from './Context';
import styles from './RequestMeta.module.css'

function RequestMeta() {
  const { metadata, setMetadata, onSubmit } = useAppContext();
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
    <div className={styles.requestMeta}>
      <select className={styles.requestMethod} ref={selectRef} value={metadata.method} onChange={(e) => updateMetadata('method', e.target.value)}>
        <option className={styles.optGreen} value="GET">GET</option>
        <option className={styles.optOrange} value="POST">POST</option>
        <option className={styles.optBlue} value="PUT">PUT</option>
        <option className={styles.optPurple} value="PATCH"> PATCH </option>
        <option className={styles.optRed} value="DELETE">DELETE</option>
      </select>
      <input type="text" className={styles.requestUrl} value={metadata.url} onChange={(e) => updateMetadata('url', e.target.value)} placeholder="Enter URL" />
      <button onClick={onSubmit}>Send</button>
    </div>
  );
}

export default RequestMeta;