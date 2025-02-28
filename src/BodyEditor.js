import React from 'react';
import 'prismjs/themes/prism.css';

function BodyEditor({ body, setBody }) {
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