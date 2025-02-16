import React from "react";

const CrewCard = ({ name, agency, image, wikipedia, status }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all p-2">
      <div className="w-full h-46 flex justify-center">
        <img
          src={image}
          alt={name}
          className="w-auto h-full object-contain rounded-lg"
          loading="lazy" // Improves performance
        />
      </div>
      <div className="p-2 text-center">
        <h3 className="text-white text-xl font-bold">{name}</h3>
        <p className="text-gray-300">{agency}</p>
        <p className="text-gray-400">Status: {status}</p>
        <a
          href={wikipedia}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 mt-2 inline-block"
        >
          Wikipedia
        </a>
      </div>
    </div>
  );
};

export default CrewCard;
