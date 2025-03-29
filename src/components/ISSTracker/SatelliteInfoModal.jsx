import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { FaArrowAltCircleRight } from "react-icons/fa";

// ISS Components Data
const issParts = [
  {
    name: "Zarya (Functional Cargo Block)",
    description:
      "Launched in 1998, Zarya was the first module of the ISS, providing propulsion and power before more modules were added.",
    image: "/zarya.png",
    link: "https://www.nasa.gov/international-space-station/zarya-module/",
  },
  {
    name: "Unity Node",
    description:
      "The Unity module connects different parts of the ISS and acts as a passage between different research labs and living areas.",
    image: "/unity.png",
    link: "https://www.nasa.gov/international-space-station/unity-module/",
  },
  {
    name: "Destiny Laboratory",
    description:
      "The primary research facility for US science experiments aboard the ISS. It includes workstations and controls for experiments.",
    image: "/destiny_laboratory.png",
    link: "https://www.nasa.gov/international-space-station/destiny-laboratory-module/",
  },
  {
    name: "External Stowage Platform-1",
    description:
      "The External Stowage Platforms, or ESPs, are like big shelves attached to the outside of the International Space Station (ISS). They were sent into space on March 8, 2001, and installed on March 13, 2001. These shelves hold spare parts for the ISS. Since they are outside and not pressurized, they need electricity to keep some of the stored equipment warm using heaters.",
    image: "/esp1.png",
    link: "https://www.nasa.gov/international-space-station/external-stowage-platforms-1-3/",
  },
  {
    name: "Columbus Module",
    description:
      "This European module serves as a laboratory for scientific research in microgravity, focusing on life sciences and material sciences.",
    image: "/columbus.png",
    link: "https://www.nasa.gov/international-space-station/columbus-laboratory-module/",
  },
  {
    name: "Japanese Logistics Module",
    description:
      "The Logistics Module is like a storage room in space. It was sent to the International Space Station (ISS) on March 11, 2008, and set up on March 14, 2008. This module stores experiments, tools, and supplies needed on the ISS. It is attached to the top part of Kibo's main pressurized section.",
    image: "/japneese_logistics.png",
    link: "https://www.nasa.gov/international-space-station/kibo-laboratory-module/",
  },
  {
    name: "Canadarm2",
    description:
      "A robotic arm used for docking spacecraft, moving supplies, and assisting astronauts during spacewalks.",
    image: "/canadarm2.png",
    link: "https://www.nasa.gov/international-space-station/mobile-servicing-system/",
  },
  {
    name: "P6 (Port) Truss and Solar Arrays",
    description:
      "The Integrated Truss Structure is like the backbone of the International Space Station (ISS). It was sent to space on November 30, 2000, and installed on December 2, 2000. It has 11 parts and an extra piece called Zenith-1 (Z1). These parts serve as connection points for the station's solar panels, cooling systems, and equipment stored outside the ISS.",
    image: "/p6.png",
    link: "https://www.nasa.gov/international-space-station/integrated-truss-structure/",
  },
];

Modal.setAppElement("#root"); // Prevents accessibility errors

export default function SatelliteInfoModal({ isOpen, onRequestClose }) {
  const [selectedPart, setSelectedPart] = useState(issParts[0]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center w-[80vw] z-10"
      overlayClassName="fixed inset-0 bg-black/30"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900/40 text-white p-6 rounded-lg shadow-lg w-[90vw] max-w-4xl relative"
      >
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full cursor-pointer"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          🛰️ ISS Components & Assembly
        </h2>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar: ISS Parts */}
          <div className="w-full md:w-1/3 space-y-2">
            {issParts.map((part, index) => (
              <button
                key={index}
                onClick={() => setSelectedPart(part)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  selectedPart.name === part.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {part.name}
              </button>
            ))}
          </div>

          {/* Main Content: ISS Part Details */}
          <motion.div
            key={selectedPart.name}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-2/3 p-4 flex gap-y-2.5"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {selectedPart.name}
              </h3>
              <p className="text-gray-300">{selectedPart.description}</p>

              <a
                href={selectedPart.link}
                className="mt-0.5 hover:text-[1.01rem] transition-all hover:text-blue-200 flex items-center gap-1 duration-150"
              >
                Learn More <FaArrowAltCircleRight className="mt-1" />
              </a>
            </div>
            <img
              src={selectedPart.image}
              alt={selectedPart.name}
              className="w-[250px] h-[250px] rounded-lg shadow-md ml-1"
            />
          </motion.div>
        </div>
      </motion.div>
    </Modal>
  );
}
