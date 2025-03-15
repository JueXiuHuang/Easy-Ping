import React from 'react';
import { useAppContext } from './Context';
import 'prismjs/themes/prism.css';

function BodyEditor() {
  const { body, setBody } = useAppContext();
  return (
    <div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter JSON body"
        style={{ width: '100%', height: '150px' }}
      />
    </div>
  );
}

export default BodyEditor;