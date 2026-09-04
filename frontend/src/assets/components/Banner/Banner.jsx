import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaDownload, FaPlay, FaTimes } from "react-icons/fa";

// Yahan images ko import kiya gaya hai
import bannerImage from "../../BannerImage.png";
import img1 from "../../Image1.png";
import img2 from "../../Image2.png";
import img3 from "../../Image3.png";
import img4 from "../../Image4.png";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  // Orbiting images ki array
  const orbitImages = [img1, img2, img3, img4];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searching for:", searchQuery);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-700/10" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          
          {/* Left Text & Search Section */}
          <div className="flex-1 space-y-8 relative md:pr-8 lg:pr-16 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-bold leading-tight font-serif drop-shadow-md">
              We are Here <br />
              <span className="text-amber-300 inline-block">For Food & Delivery</span>
            </h1>

            <p className="text-lg md:text-lg lg:text-xl font-serif italic sm:text-xl text-amber-100 max-w-xl opacity-90 mx-auto md:mx-0">
              Best cooks and best delivery guys all at your service. Hot tasty food will reach you in limited time.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto md:mx-0 group">
              <div className="relative flex items-center bg-amber-900/30 rounded-xl border-2 border-amber-500/30 shadow-2xl hover:bg-amber-400/50 transition-all duration-300">
                <div className="pl-6 pr-3 py-4">
                  <FiSearch className="text-xl text-amber-400/50" />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Discover your next favourite meal..."
                  className="w-full py-4 pr-6 bg-transparent outline-none placeholder-amber-200/70 text-lg font-medium tracking-wide"
                />

                <button
                  type="submit"
                  className="mr-4 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-300 rounded-lg font-semibold text-amber-900 hover:from-amber-300 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-amber-300/20"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
              <button className="group flex items-center gap-3 bg-amber-800/30 hover:bg-amber-800/50 px-6 py-3 rounded-xl transition-all duration-300 border-2 border-amber-700/50 hover:border-amber-400 backdrop-blur-sm">
                <FaDownload className="text-xl text-amber-400 group-hover:animate-bounce" />
                <span className="text-lg">Download App</span>
              </button>
              <button 
                onClick={() => setShowVideo(true)} 
                className="group flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-300/30 cursor-pointer"
              >
                <FaPlay className="text-xl text-amber-900" />
                <span className="text-lg text-amber-900 font-semibold">Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Orbiting Images Section */}
          <div className="flex-1 relative group mt-8 md:mt-0 min-h-[300px] sm:min-h-[400px]">
            <div className="relative w-[250px] sm:w-[360px] h-[250px] sm:h-[360px] mx-auto flex items-center justify-center">
              
              {/* Orbiting Food Images */}
              {orbitImages.map((img, index) => (
                <div
                  key={index}
                  className="orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ animationDelay: `${index * -3.75}s` }}
                >
                  <img
                    src={img}
                    alt={`Food ${index + 1}`}
                    className="w-[72px] h-[72px] sm:w-[100px] sm:h-[100px] rounded-full border-4 border-amber-200/65 object-cover shadow-xl shadow-amber-900/30 bg-white"
                  />
                </div>
              ))}

              {/* Main Center Banner Image */}
              <div className="relative rounded-full p-1 bg-[#ef6941] shadow-[0_0_40px_rgba(255,123,50,0.45)] z-10 w-[220px] sm:w-[320px] h-[220px] sm:h-[320px]">
                <img
                  src={bannerImage}
                  alt="Delicious food"
                  className="rounded-full border-4 border-amber-100/40 w-full h-full object-cover object-top bg-[#f9d7b5]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg p-4">
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-amber-400 hover:text-amber-300 text-3xl z-10 transition-all cursor-pointer"
          >
            <FaTimes />
          </button>
          
          <div className="w-full max-w-4xl mx-auto aspect-video">
            <iframe 
              className="w-full h-full rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/m3_DwrAgX9M?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;