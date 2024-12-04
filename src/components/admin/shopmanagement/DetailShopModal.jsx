import React from "react";

function DetailShopModal({ shop, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Shop Details</h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <span className="text-gray-900 font-medium mr-2">ID:</span> {shop._id}
          </p>
          <p className="text-lg text-gray-700">
            <span className="text-gray-900 font-medium mr-2">Email:</span> {shop.email}
          </p>
          <p className="text-lg text-gray-700">
            <span className="text-gray-900 font-medium mr-2">Name:</span> {shop.name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="text-gray-900 font-medium mr-2">Role:</span> {shop.type}
          </p>
          <p className="text-lg text-gray-700">
            <span className="text-gray-900 font-medium mr-2">Address:</span> {shop.address}
          </p>
          <p className="text-lg text-gray-700">
            <span className="text-gray-900 font-medium mr-2">Phone:</span> {shop.phone}
          </p>
          <p className="text-lg text-gray-700">
            <span className="text-gray-900 font-medium mr-2">Description:</span> {shop.description}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailShopModal;
