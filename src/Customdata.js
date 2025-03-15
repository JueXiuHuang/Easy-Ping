import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from './Context'
import styles from './Customdata.module.css'

function CustomdataBar() {
  const { customdata, setCustomdata, saveRequest, toggleSidebar } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button onClick={toggleSidebar}></button>
      </div>
      <div className={styles.center}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={customdata}
            onChange={(e) => setCustomdata(e.target.value === '' ? 'New Request' : e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={handleKeyPress}
            className={styles.editInput}
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            style={{ cursor: 'pointer' }}
            className={styles.displayText}
          >
            {customdata}
          </span>
        )}
      </div>
      <div className={styles.right}>
        <button onClick={saveRequest}>save</button>
        <button>config</button>
      </div>
    </div>
  );
}

export default CustomdataBar;