import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ savedRequests, onSelectRequest, selectedRequest, isOpen, toggleSidebar }, ref) => {
  return (
    <div ref={ref} className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.sidebarHeader}>
        {isOpen && <h3>Saved Requests</h3>}
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {'☰'}
        </button>
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