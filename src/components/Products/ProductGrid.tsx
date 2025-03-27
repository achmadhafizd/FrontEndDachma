import { FC } from "react";
import { Link } from "react-router-dom";
import { Product } from "./ProductDetails";

type ChildProduct = {
  products: Product[];
  loading?: boolean;
  error?: string | null;
};

const ProductGrid: FC<ChildProduct> = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map((items, index) => (
        <Link key={index} to={`/product/${items._id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={items.images?.[0]?.url}
                alt={items.images?.[0]?.altText || items.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-sm mb-2">{items.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              {" "}
              $ {items.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
