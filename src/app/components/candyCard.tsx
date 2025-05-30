import React from "react";

const ProductCard = () => {
  return (
    <div className="max-w-3xs rounded-3xl overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src="https://via.placeholder.com/150"
        alt="Product"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Jumbo pop</div>
        <p className="text-gray-700 text-base">
          Palomitas chocolate y bebidas.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
            $50.00
        </span>
      </div>
    </div>
  );
};
export default ProductCard;