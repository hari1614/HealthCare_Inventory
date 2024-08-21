import React from "react";
import screenOne from "../assets/sun.png";
import screenTwo from "../assets/sun1.png";
import screenThree from "../assets/sun2.png";
import screenFour from "../assets/sun3.png";
import screenFive from "../assets/sun4.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../components/hooks/useAuthContext";

const features = [
  {
    title: "CRUD Operations",
    description:
      "Effortlessly manage your inventory with full support for Create, Read, Update, and Delete operations, ensuring all data remains current and accurate.",
    image: screenOne,
  },
  {
    title: "Real-Time Stock Low Alerts",
    description:
      "Get instant notifications when stock levels fall below predefined thresholds. This feature helps prevent shortages and ensures timely reordering of essential supplies.",
    image: screenTwo,
  },
  {
    title: "Dynamic Inline Editable Table",
    description:
      "Update inventory details directly within the interface without the need for separate forms or screens. This user-friendly feature streamlines data management and minimizes errors.",
    image: screenThree,
  },
  {
    title: "Billing Section with GST-Inclusive Invoices",
    description:
      "Generate detailed invoices that include GST, facilitating accurate billing and compliance with tax regulations. This feature is crucial for maintaining financial accuracy.",
    image: screenFour,
  },
  {
    title: "Product Search and Addition",
    description:
      "Quickly find existing products and add new items to your inventory with ease. This feature enhances efficiency by simplifying product tracking and addition.",
    image: screenFive,
  },
];

const HealthCareInventoryOverview = () => {
  const { user } = useAuthContext();
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-12 relative overflow-hidden">
        {/* Hero Section */}
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            HealthCare Inventory
          </h1>
          <p className="text-2xl text-gray-700 mb-10">
            Optimize your inventory management with our comprehensive suite of
            tools designed for healthcare environments.
          </p>
          <a
            href="#features"
            className="inline-block bg-sea text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-hover1 transition duration-300 text-lg"
          >
            Learn More
          </a>
        </div>

        {/* Key Features Section */}
        <div id="features" className="space-y-16 relative z-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            Key Features
          </h2>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } mb-16`}
            >
              <div className="flex-1 p-8 transition-transform transform hover:scale-105 duration-300">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1 p-8">
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}

        <div className="text-center mt-16 relative z-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Ready to transform your inventory management?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Discover how HealthCare Inventory can streamline your operations and
            improve efficiency.
          </p>

          <Link
            to={(!user && "/login") || "/"}
            className="inline-block bg-sea text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-hover1 transition duration-300 text-lg"
          >
            Get Started
          </Link>
        </div>
        {/* Optional Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Example gradient background or pattern */}
          <svg
            className="absolute top-0 right-0 w-1/2 h-1/2 text-gray-200"
            viewBox="0 0 100 100"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0 0h100v100H0z" />
            <path d="M0 50l100 50V0L0 50z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HealthCareInventoryOverview;
