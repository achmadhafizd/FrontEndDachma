import { FC, useEffect, useState } from "react";
import HeroSection from "../components/Layout/HeroSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails, { Product } from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchProductsByFilters } from "../redux/products";
import axios from "axios";

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [bestSellerProduct, setBestSellerProduct] = useState<Product | null>(
    null
  );

  useEffect(() => {
    // Fetch products fot a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: "8",
      })
    );

    // Fetch best seller product
    const bestSeller = async () => {
      try {
        const response = await axios.get(`
          ${import.meta.env.VITE_BACKEND_URL}/api/products/best-sellers`);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    bestSeller();
  }, [dispatch]);

  useEffect(() => {
    console.log("VITE_BACKEND_URL: ", import.meta.env.VITE_BACKEND_URL);
  }, []);  

  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id || ""} />
      ) : (
        <p className="text-center">Loading best seller product...</p>
      )}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
