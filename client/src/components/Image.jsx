import React, { useState, useEffect } from 'react';

const DisplayImage = ({ imageName }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fetch the image data from the backend
    fetch(`/images/${imageName}`) // Adjust the route according to your backend setup
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        return response.blob();
      })
      .then(blob => {
        // Convert the blob to a data URL
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      })
      .catch(error => console.error('Error fetching image:', error));
  }, [imageName]);

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="Image" /> :<p></p>}
    </div>
  );
};

export default DisplayImage;
