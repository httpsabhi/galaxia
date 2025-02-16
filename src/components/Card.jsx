import React, { useState } from 'react';

const Card = ({ title, image, description, link, extra, youtubeVideo }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="max-w-[90vw] mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-102">
      {/* Display image if available and not errored; otherwise show YouTube embed if provided */}
      {image && !imageError ? (
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover"
          onError={() => setImageError(true)}
        />
      ) : youtubeVideo ? (
        <div className="w-full h-64">
          <iframe
            title="YouTube video"
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeVideo}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-gray-300 mt-2">{description}</p>
        {extra && <div className="mt-4 text-gray-400 text-sm">{extra}</div>}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-400 font-semibold hover:underline"
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
