import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ item }) => {
  const product = item.product;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">

      <img
        src={product.images[0]}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg mb-3"
      />

      <h3 className="text-lg font-semibold">{product.name}</h3>

      <p className="text-green-600 font-bold mt-1">
        ₹{item.pricePerKg} / kg
      </p>

      <p className="text-sm text-gray-500 mb-3">
        Stock: {item.availableQty} kg
      </p>

      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
        <FaShoppingCart />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
