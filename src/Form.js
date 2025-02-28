import React from 'react';
import styles from './Form.module.css'

export default function DynamicForm({ infoList, setInfoList }) {
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