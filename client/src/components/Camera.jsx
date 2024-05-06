import React, { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function Camera() {
  const history = useNavigate();
  const [startCameraButtonText, setStartCameraButtonText] = useState('Start Camera');
  const [captureButtonText, setCaptureButtonText] = useState('Capture');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleStartCamera = async () => {
    if(setIsCapturing(false)){
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
        // setIsCapturing(false);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
    else{
      setIsCapturing(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
        // setIsCapturing(false);
    }

    setStartCameraButtonText(`Re-take`);
    // setCounter(counter + 1);
  };

  // const handleContinue = () => {
  //   setIsCapturing(true);
  // };  

  const handleCapture = () => { 
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/jpeg');
      setMediaStream(null); // Stop video stream
      setIsCapturing(true);
      setPhotoData(dataURL);      
      setCaptureButtonText(`Continue`);

      // Send the captured image data to the backend
  fetch('/capture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageData: dataURL }),
  })
    .then(response => {
      if (response.ok) {
        setIsCapturing(true);
        setPhotoData(dataURL);
        setCaptureButtonText('Continue');
      } else {
        console.error('Failed to save image');
      }
    })
    .catch(error => {
      console.error('Error saving image:', error);
    });
      
  };

  useEffect(() => {
    if (isCapturing) {
      history("/hospital-registration");
    }
  }, [isCapturing]);

  // const captureButtonText = isCapturing ? 'Reset Camera' : 'Start Camera';

  return (
    <div className='cap-window'>

    {isCapturing ? (
      <img src={photoData} alt="Captured" />
      ) : (
        <video ref={videoRef} autoPlay />
        )}
    <canvas ref={canvasRef} style={{ display: 'none' }} />

        <button onClick={handleStartCamera}>{startCameraButtonText}</button>
        <button onClick={handleCapture}>{captureButtonText}</button>

    {/* {isCapturing ? (
      <button onClick={handleCapture}>Capture</button>
    ) : (
      <button onClick={handleStartCamera}>{buttonText}</button>
    )}
    { <button onClick={handleCapture}>Capture</button>} */}
    
    </div>
    );
  }

export default Camera;
