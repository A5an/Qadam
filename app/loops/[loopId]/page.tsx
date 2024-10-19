'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';

const videos = [
  { id: 1, src: '/videos/video1.mp4', likes: 0 },
  { id: 2, src: '/videos/video2.mp4', likes: 0 },
  { id: 3, src: '/videos/video3.mp4', likes: 0 },
  // Add more video objects as needed
];

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle the case where id might be undefined
  const videoId = id ? parseInt(id, 10) : null;
  const video = videos.find(v => v.id === videoId);

  const [startY, setStartY] = useState<number | null>(null);

  useEffect(() => {
    if (!video) {
      navigate('/'); // Redirect to home if video is not found
    } else if (videoRef.current) {
      videoRef.current.play(); // Start playing the video when the component mounts
    }
  }, [video, navigate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Load the new video source
      videoRef.current.play(); // Start playing the new video
    }
  }, [id]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartY(touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null && videoId !== null) {
      const touch = e.touches[0];
      const moveY = touch.clientY;
      if (startY - moveY > 50 && videoId < videos.length) {
        navigate(`/loops/${videoId + 1}`);
      } else if (moveY - startY > 50 && videoId > 1) {
        navigate(`/loops/${videoId - 1}`);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startY !== null && videoId !== null) {
      const moveY = e.clientY;
      if (startY - moveY > 50 && videoId < videos.length) {
        navigate(`/loops/${videoId + 1}`);
      } else if (moveY - startY > 50 && videoId > 1) {
        navigate(`/loops/${videoId - 1}`);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined' ) {
    const handleWheel = (e: WheelEvent) => {
      if (videoId !== null && videoId !== undefined) {
        if (e.deltaY > 0 && videoId < videos.length) {
          navigate(`/loops/${videoId + 1}`);
        } else if (e.deltaY < 0 && videoId > 1) {
          navigate(`/loops/${videoId - 1}`);
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }
  }, [videoId]);

  if (!video) {
    return <div>Loading...</div>;
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        onClick={handleVideoClick}
        className="w-full h-full object-cover"
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// const RedirectToFirstVideo = () => {
//   useEffect(() => {
//     // Redirect to /loops/1 as soon as the component mounts
//     if (typeof window !== 'undefined' && typeof document !== 'undefined') {
//     window.location.replace('/loops/1');
//     }
//   }, []);

//   return null; // You can return null since the redirection happens immediately
// };

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/loops/:id" element={<VideoPage />} />
      </Routes>
    </Router>
  );
};

export default App;