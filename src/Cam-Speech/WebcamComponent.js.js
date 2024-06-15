import React from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <Webcam
        audio={false}
        width={400}
        height={300}
        style={{ borderRadius: '10px', border: '2px solid #ccc' }}
      />
    </div>
  );
};

export default WebcamComponent;
