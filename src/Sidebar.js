import React, { useRef, useEffect } from 'react';
import { useAppContext } from './Context';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { savedRequests, handleRequestSelect, selectedRequest, isSidebarOpen, setIsSidebarOpen } = useAppContext();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <div ref={sidebarRef} className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
      <div className={styles.sidebarHeader}>
        {isSidebarOpen && <h3>Saved Requests</h3>}
      </div>

      {isSidebarOpen && (
        <div className={styles.sidebarContent}>
          {savedRequests.length === 0 ? (
            <p>No saved requests</p>
          ) : (
            <ul className={styles.requestList}>
              {savedRequests.map((request, index) => (
                <li
                  key={index}
                  className={`${styles.requestItem} ${selectedRequest === request.name ? styles.active : ''}`}
                  onClick={() => handleRequestSelect(request)}
                >
                  {request.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;