import React, { useRef, useEffect } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ savedRequests, onSelectRequest, selectedRequest, isOpen, setIsOpen }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.sidebarHeader}>
        {isOpen && <h3>Saved Requests</h3>}
      </div>

      {isOpen && (
        <div className={styles.sidebarContent}>
          {savedRequests.length === 0 ? (
            <p>No saved requests</p>
          ) : (
            <ul className={styles.requestList}>
              {savedRequests.map((request, index) => (
                <li
                  key={index}
                  className={`${styles.requestItem} ${selectedRequest === request.name ? styles.active : ''}`}
                  onClick={() => onSelectRequest(request)}
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