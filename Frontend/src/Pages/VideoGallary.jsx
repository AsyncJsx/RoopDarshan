import React, { useContext, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { LanguageContext } from "../context/LanguageContext";

const SecureVideo = ({ src, className, id, currentUnmuted, setCurrentUnmuted, videoRefs }) => {
  const handleUnmuteClick = () => {
    const video = videoRefs.current[id];
    if (!video) return;

    // Mute all other videos
    videoRefs.current.forEach((v, idx) => {
      if (v && idx !== id) v.muted = true;
    });

    // Unmute this video
    video.muted = false;
    setCurrentUnmuted(id);
  };

  return (
    <div className="relative group">
      <video
        ref={(el) => (videoRefs.current[id] = el)}
        src={src}
        controls
        autoPlay
        muted
        loop
        controlsList="nodownload"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        className={className}
      />
      {currentUnmuted !== id && (
        <button
          onClick={handleUnmuteClick}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-lg font-bold opacity-100 hover:bg-opacity-50 transition"
        >
          Click to Unmute
        </button>
      )}
    </div>
  );
};

function VideoGallary() {
  const { language } = useContext(LanguageContext);
  const [currentUnmuted, setCurrentUnmuted] = useState(null);
  const videoRefs = useRef([]);

  const videos = [
    "https://res.cloudinary.com/dm1lsindg/video/upload/v1768033058/aghori_kbntvz.mp4",
    "https://res.cloudinary.com/dm1lsindg/video/upload/v1768033127/gorila_wz4ofd.mp4",
    "https://res.cloudinary.com/dm1lsindg/video/upload/v1768033493/monkey_rajpda.mp4",
    "https://res.cloudinary.com/dm1lsindg/video/upload/v1768033443/nandi_jmhpwi.mp4",
    "https://res.cloudinary.com/dm1lsindg/video/upload/v1768033193/mahadev_rqrzuq.mp4",
    "https://res.cloudinary.com/dm1lsindg/video/upload/v1768033363/hanuman_orange_g7guph.mp4",
    "https://res.cloudinary.com/dm1lsindg/video/upload/v1768032946/lion_irbdbm.mp4",
    "https://res.cloudinary.com/dm1lsindg/video/upload/v1768033476/One_piece_oyd0ic.mp4",
  ];

  return (
    <div className="min-h-screen w-screen relative">
      <Navbar />

      <div className="title">
        <h3 className="text-2xl gallary-1 w-screen text-center mt-[200px]">
          Video Gallary
        </h3>
      </div>

      <div className="containt md:px-24 px-4 mt-4">
        <div className="flex flex-wrap gap-[5vh] justify-evenly w-full my-12">
          {videos.map((src, idx) => (
            <SecureVideo
              key={idx}
              id={idx}
              src={src}
              className="max-h-screen w-auto"
              currentUnmuted={currentUnmuted}
              setCurrentUnmuted={setCurrentUnmuted}
              videoRefs={videoRefs}
            />
          ))}
        </div>

        <h3 className="text-center text-xl my-6">Jewellery</h3>
        <SecureVideo
          id={videos.length}
          src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033975/jewellery_ayv1er.mp4"
          className="w-screen h-auto"
          currentUnmuted={currentUnmuted}
          setCurrentUnmuted={setCurrentUnmuted}
          videoRefs={videoRefs}
        />
      </div>

      <div className="mt-[40vh] md:mt-[20vh]">
        <Footer language={language} />
      </div>
    </div>
  );
}

export default VideoGallary;
