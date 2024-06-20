// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Admincontrolhomepagess.css';

// const Admincontrolhomepage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [uploadedFileId, setUploadedFileId] = useState(null);
//   const [fileUrl, setFileUrl] = useState(null);
//   const [fileType, setFileType] = useState(null);

//   useEffect(() => {
   
//       fetchFileDetails();

//   }, [uploadedFileId]);

//   const fetchFileDetails = () => { 
//     axios.get(`http://127.0.0.1:8000/api/upload-image/`)
//     .then((response)=>{
//       setFileUrl(response.data[0]['file']);
//       console.log("C:/Users/Acer/Desktop/ecommerce images/"+response.data[0]['file'].split("/media/uploaded_files/")[1]);
//       setFileType(response.data[0]['file']);
//     })
//     .catch (error=>{
//       console.error("Error fetching file details:", error);
//     });
//   }

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/upload-image/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setUploadStatus('success');
//       setUploadedFileId(response.data.id);
//       alert("File uploaded successfully!");
//     } catch (error) {
//       setUploadStatus('error');
//       console.error("There was an error uploading the file!", error);
//       alert("Failed to upload file.");
//     }
//   };

//   const handleDelete = async () => {
//     if (!uploadedFileId) {
//       alert("No file to delete!");
//       return;
//     }

//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/uploaded-files/${uploadedFileId}/`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       setUploadStatus('success');
//       setUploadedFileId(null);
//       setSelectedFile(null);
//       setFileUrl(null);
//       setFileType(null);
//       alert("File deleted successfully!");
//     } catch (error) {
//       setUploadStatus('error');
//       console.error("There was an error deleting the file!", error);
//       alert("Failed to delete file.");
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="upload-box">
//         <h1>Upload File</h1>
//         <form onSubmit={handleSubmit}>
//           <input 
//             type="file" 
//             accept="image/*, video/*, image/gif" 
//             onChange={handleFileUpload} 
//           />
//           <div className="buttons">
//             <button type="submit">Upload</button>
//             <button type="button" onClick={handleDelete}>Delete</button>
//           </div>
//         </form>
//         {uploadStatus && (
//           <div className={`status ${uploadStatus}`}>
//             {uploadStatus === 'success' ? 'Operation successful!' : 'Operation failed.'}
//           </div>
//         )}
//       </div>
//       <div className="preview-box">
//         {fileUrl && (
//           <>
//             <h2>Preview:</h2>
//             {fileType && fileType.startsWith('image') && (
//               <img src={fileUrl} alt="Uploaded File" className="preview-image" />
//             )}
//             {fileType && fileType.startsWith('video') && (
//               <video controls className="preview-video">
//                 <source src={fileUrl} type={fileType} />
//                 Your browser does not support the video tag.
//               </video>
//             )}
            
//               <img src={`${process.env.PUBLIC_URL}/assets/`+fileUrl.split("/media/uploaded_files/")[1]} alt="Uploaded GIF" className="preview-image" />
            
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Admincontrolhomepage;
















// import React, { useState } from 'react';
// import axios from 'axios';

// const Admincontrolhomepage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadedBannerUrl, setUploadedBannerUrl] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleFileUpload = () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     axios.post('http://localhost:8000/api/upload/', formData, {
//       onUploadProgress: (progressEvent) => {
//         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         setUploadProgress(progress);
//       }
//     })
//     .then((response) => {
//       setUploadedBannerUrl(response.data.file_url); // Adjust based on your API response
//       setUploadProgress(0);
//     })
//     .catch((error) => {
//       console.error('There was an error uploading the file!', error);
//     });
//   };

//   return (
//     <div>
//       <div className="upload-container">
//         <h2>Upload Banner</h2>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={handleFileUpload}>Upload</button>
//         {uploadProgress > 0 && (
//           <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
//         )}
//       </div>

//       <div className="banner-view-container">
//         <h2>Banner View</h2>
//         {uploadedBannerUrl ? (
//           <img src={uploadedBannerUrl} alt="Uploaded Banner" />
//         ) : (
//           <p>No banner uploaded yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Admincontrolhomepage;






















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admincontrolhomepagess.css';

const Admincontrolhomepage = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [currentBannerImage, setCurrentBannerImage] = useState(null);

  useEffect(() => {
    const fetchCurrentBannerImage = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/upload-image/');
        setCurrentBannerImage(response.data.image); // Assuming your API response contains the image URL
      } catch (error) {
        console.error('Error fetching current banner image:', error);
      }
    };

    fetchCurrentBannerImage();
  }, []);

  const handleImageChange = (event) => {
    setBannerImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', bannerImage);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded successfully:', response.data);
      setCurrentBannerImage(response.data.image);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://127.0.0.1:8000/api/upload-image/');
      console.log('Image deleted successfully');
      setCurrentBannerImage(null);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="admin-control-homepage">
      <div className="container">
        <div className="box">
          <h2>Upload Banner Image</h2>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <div className="box">
          <h2>Current Banner Image</h2>
          {currentBannerImage ? (
            <img src={`http://127.0.0.1:8000${currentBannerImage}`} alt="Current Banner" />
          ) : (
            <p>No banner image uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admincontrolhomepage;
