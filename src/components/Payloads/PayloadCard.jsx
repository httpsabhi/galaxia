import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSatellite, FaWeightHanging, FaGlobe, 
  FaUsers, FaFlag, FaInfoCircle 
} from "react-icons/fa";
import Modal from "react-modal";

// Modal styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1F2937",
    color: "white",
    border: "1px solid #374151",
    borderRadius: "8px",
    maxWidth: "900px",
    width: "90%",
    zIndex: 850,
    padding: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 840,
  },
};

// Bind modal to the root of the app
Modal.setAppElement("#root");

const PayloadCard = ({ payload, showNationalities = false }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <motion.div 
      className="bg-gray-900 text-white p-5 rounded-lg shadow-lg border border-gray-700 w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold flex items-center gap-2">
        <FaSatellite className="text-yellow-400" /> {payload.name || "Unknown Payload"}
      </h2>
      <p className="text-gray-300 mt-1">{payload.type || "Unknown Type"}</p>

      <div className="mt-4 space-y-2">
        <p className="flex items-center gap-2">
          <FaUsers className="text-green-400" />
          <strong>Customers:</strong> {payload.customers?.length > 0 ? payload.customers.join(", ") : "N/A"}
        </p>

        {showNationalities && (
          <p className="flex items-center gap-2">
            <FaFlag className="text-blue-400" />
            <strong>Nationalities:</strong> {payload.nationalities?.length > 0 ? payload.nationalities.join(", ") : "N/A"}
          </p>
        )}

        <p className="flex items-center gap-2">
          <FaGlobe className="text-blue-400" />
          <strong>Orbit:</strong> {payload.orbit} ({payload.reference_system})
        </p>

        <p className="flex items-center gap-2">
          <FaWeightHanging className="text-red-400" />
          <strong>Mass:</strong> {payload.mass_kg ? `${payload.mass_kg} kg / ${payload.mass_lbs} lbs` : "Unknown"}
        </p>
      </div>

      <div className="mt-4">
        <motion.button
          onClick={openModal}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInfoCircle />
          <span>Learn More</span>
        </motion.button>
      </div>

      {/* Animated Modal */}
      <AnimatePresence>
        {modalIsOpen && (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Payload Details">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaSatellite className="text-yellow-400" /> {payload.name || "Unknown Payload"}
              </h2>

              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p className="text-gray-300">
                  This payload is a <strong>{payload.type || "satellite"}</strong> designed for{" "}
                  <strong>{payload.customers?.join(", ") || "various customers"}</strong>. Below are the technical details:
                </p>

                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    <FaUsers className="text-green-400" /> Customers
                  </h3>
                  <p className="text-gray-300">
                    Organizations or entities that commissioned this payload:{" "}
                    <strong>{payload.customers?.join(", ") || "N/A"}</strong>.
                  </p>
                </div>

                {showNationalities && (
                  <div>
                    <h3 className="font-bold flex items-center gap-2">
                      <FaFlag className="text-blue-400" /> Nationalities
                    </h3>
                    <p className="text-gray-300">
                      Countries involved in this payload:{" "}
                      <strong>{payload.nationalities?.join(", ") || "N/A"}</strong>.
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    <FaGlobe className="text-blue-400" /> Orbit
                  </h3>
                  <p className="text-gray-300">
                    The payload follows a <strong>{payload.orbit}</strong> orbit within the{" "}
                    <strong>{payload.reference_system}</strong> system.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    <FaWeightHanging className="text-red-400" /> Mass
                  </h3>
                  <p className="text-gray-300">
                    Weight: <strong>{payload.mass_kg} kg</strong> (or{" "}
                    <strong>{payload.mass_lbs} lbs</strong>).
                  </p>
                </div>
              </motion.div>

              <motion.button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PayloadCard;
