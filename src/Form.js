import React from 'react';
import { useAppContext } from './Context'
import styles from './Form.module.css'

export default function DynamicForm({ type }) {
  const { headers, setHeaders, params, setParams } = useAppContext();
  const infoList = type === 'headers' ? headers : params;
  const setInfoList = type === 'headers' ? setHeaders : setParams;

  const addEmptyInfo = () => {
    setInfoList([...infoList, { checked: false, key: '', value: '' }]);
  };

  const updateInfo = (index, field, value) => {
    const newInfoList = [...infoList];
    newInfoList[index][field] = value;
    setInfoList(newInfoList);
  };

  return (
    <>
      {infoList.map((info, index) => (
        <div className={styles.formRow} key={index}>
          <input className={styles.formRowSelect} type="checkbox" checked={info.checked} onChange={(e) => updateInfo(index, 'checked', e.target.checked)} />
          <input className={styles.formRowInput} type="text" value={info.key} placeholder="Key" onChange={(e) => updateInfo(index, 'key', e.target.value)} />
          <input className={styles.formRowInput} type="text" value={info.value} placeholder="Value" onChange={(e) => updateInfo(index, 'value', e.target.value)} />
        </div>
      ))}
      <button className={styles.buttonNewInputRow} onClick={addEmptyInfo}>+</button>
    </>
  );
};