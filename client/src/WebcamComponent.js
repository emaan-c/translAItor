import React, { useRef, useState, useEffect } from 'react';
import { Col, Row, Typography } from 'antd';
import Webcam from 'react-webcam';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider } from 'antd';
const { Title, Paragraph, Text } = Typography;

const WebcamComponent = ({ handleResponse }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const handleStartCaptureClick = () => {
    setCapturing(true);
  
    // Get a copy of the stream
    let stream = webcamRef.current.stream.clone();
  
    // Remove audio tracks from the stream
    stream.getAudioTracks().forEach(track => track.stop());
  
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: 'video/webm'
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  };

  useEffect(() => {
    if (!capturing && recordedChunks.length > 0) {
      handleUpload();
    }
  }, [capturing, recordedChunks]);

  const handleUpload = async () => {
    console.log('Recorded Chunks:', recordedChunks)
    if (recordedChunks.length) {
      console.log('Uploading video...');
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });
  
      const formData = new FormData();
      formData.append("file", blob, "video.webm");
  
      // Call the function to send data to server
      await uploadVideo(formData);

      // Reset recordedChunks state
      setRecordedChunks([]);
    }
  };

  const uploadVideo = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });
      console.log('Response:', response);
      const data = await response.json();
      console.log('File successfully uploaded:', data.result);
      handleResponse(data.result); 
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <Row>
        <Col flex="auto">
          <Webcam audio={false} mirrored={true} ref={webcamRef} width="93%" style={{marginLeft: '25px'}}/>
        </Col>
        <Col flex="300px" >
          {capturing ? (
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button type="primary" size="large" onClick={handleStopCaptureClick} style={{width: '300px', marginTop: '20px', marginLeft: '22px'}}>
                Finish Translation
              </Button>
            </ConfigProvider>
          ) : (
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button type="primary" size="large" onClick={handleStartCaptureClick} style={{width: '300px', marginTop: '20px', marginLeft: '22px'}}>
                Start Translation
              </Button>
            </ConfigProvider>
          )}
        </Col>
      </Row>
    </>
  );
};

export default WebcamComponent;