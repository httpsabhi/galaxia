import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiExternalLink, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SpaceNewsSlider = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.spaceflightnewsapi.net/v4/articles/?limit=6"
        );
        setNews(response.data.results);
      } catch (error) {
        console.error("Error fetching space news:", error);
        setError("Failed to load space news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Latest Space News</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Stay updated with the most recent discoveries and developments in space exploration
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-32 bg-gray-800 rounded col-span-2"></div>
                  <div className="h-32 bg-gray-800 rounded col-span-1"></div>
                </div>
                <div className="h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className} bg-gray-600 hover:bg-blue-500 transition-all duration-300"></span>`;
            },
          }}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          effect="fade"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative"
        >
          {news.map((article) => (
            <SwiperSlide key={article.id}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-blue-500 h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image_url || '/placeholder-space.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/placeholder-space.jpg';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16"></div>
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {article.news_site}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <FiCalendar className="mr-1" />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                    {article.summary || "No summary available..."}
                  </p>
                  <div className="mt-auto">
                    <button
                      onClick={() => window.open(article.url, "_blank")}
                      className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition group cursor-pointer"
                    >
                      Read Article
                      <FiExternalLink className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}

          {/* Custom navigation buttons */}
          <div className="swiper-button-prev after:text-blue-500 hover:after:text-blue-400"></div>
          <div className="swiper-button-next after:text-blue-500 hover:after:text-blue-400"></div>
        </Swiper>
      )}
    </div>
  );
};

export default SpaceNewsSlider;