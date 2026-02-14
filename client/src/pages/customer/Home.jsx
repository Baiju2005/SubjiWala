import { useEffect, useState } from "react";
import { getTodayProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getTodayProducts();
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Fresh Vegetables Today 🥬
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No vegetables available today.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;
