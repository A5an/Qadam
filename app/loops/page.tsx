// 'use client';

// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

// const VideoPage = () => {
//   const { id } = useParams();
  
//   return (
//     <div>
//       <h1>Watching Video {id}</h1>
//       <video src={`/video${id}.mp4`} controls />
//     </div>
//   );
// };

// const SearchPage = () => {
//   useEffect(() => {
//     if (typeof window !== 'undefined' && typeof document !== 'undefined' ) {
//     // Redirect to /loops/1 as soon as the component mounts
//     window.location.replace('/loops/1');
//     }
//   }, []);

//   return null; // You can return null since the redirection happens immediately
// };

const App = () => {
  return 
  // (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<SearchPage />} />
  //       <Route path="/loops/:id" element={<VideoPage />} />
  //     </Routes>
  //   </Router>
  // );
};

export default App;