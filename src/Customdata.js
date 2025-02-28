import React, { useState, useEffect, useRef } from 'react';

function CustomdataBar({ customdata, setCustomdata, onSave }) {
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

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={customdata}
      onChange={(e) => setCustomdata(e.target.value === '' ? 'New Request' : e.target.value)}
      onBlur={() => setIsEditing(false)}
      onKeyDown={handleKeyPress}
      className="edit-input"
    />
  ) : (
    <span
      onClick={() => setIsEditing(true)}
      style={{ cursor: "pointer" }}
      className="display-text"
    >
      {customdata}
    </span>
  );
}

export default CustomdataBar;