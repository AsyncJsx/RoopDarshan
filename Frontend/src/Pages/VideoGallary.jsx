import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { LanguageContext } from "../context/LanguageContext";

/* 🔒 Secure Video Component */
const SecureVideo = ({ src, className }) => {
  return (
    <video
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
  );
};

function VideoGallary() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="min-h-screen w-screen relative">
      <Navbar />

      {/* Title */}
      <div className="title">
        <h3 className="text-2xl gallary-1 w-screen text-center mt-[200px]">
          Video Gallary
        </h3>
      </div>

      {/* Videos */}
      <div className="containt md:px-24 px-4 mt-4">
        <div className="flex flex-wrap gap-[5vh] justify-evenly w-full my-12">
          <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033058/aghori_kbntvz.mp4" className="max-h-screen w-auto" />
          <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033127/gorila_wz4ofd.mp4" className="max-h-screen w-auto" />
          <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033493/monkey_rajpda.mp4" className="max-h-screen w-auto" />
          <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033443/nandi_jmhpwi.mp4" className="max-h-screen w-auto" />
          <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033193/mahadev_rqrzuq.mp4" className="max-h-screen w-auto" />
          <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033363/hanuman_orange_g7guph.mp4" className="max-h-screen w-auto" />
          <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768032946/lion_irbdbm.mp4" className="max-h-screen w-auto" />
          <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033476/One_piece_oyd0ic.mp4" className="max-h-screen w-auto" />
        </div>

        {/* Jewellery Section */}
        <h3 className="text-center text-xl my-6">Jewellery</h3>
        <SecureVideo src="https://res.cloudinary.com/dm1lsindg/video/upload/v1768033975/jewellery_ayv1er.mp4" className="w-screen h-auto" />
      </div>

      {/* Footer */}
      <div className="mt-[40vh] md:mt-[20vh]">
        <Footer language={language} />
      </div>
    </div>
  );
}

export default VideoGallary;
