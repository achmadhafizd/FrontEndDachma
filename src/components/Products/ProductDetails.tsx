import { FC, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchProductsDetails,
  fetchSimilarProducts,
} from "../../redux/products";
import { addToCart } from "../../redux/cart";

export type Product = {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  category: string;
  size?: string;
  color?: string;
  gender?: string;
  material?: string;
  brand?: string;
  collection?: string;
  images?: {
    url: string;
    altText: string;
  }[];
};

interface ProductDetailsProps {
  productId?: string;
}

const ProductDetails: FC<ProductDetailsProps> = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state: RootState) => state.products
  );
  const { user, guestId } = useSelector((state: RootState) => state.auth);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductsDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length && !mainImage) {
      setMainImage(selectedProduct.images[0]?.url);
    }
  }, [selectedProduct, mainImage]);

  const handleQuantityChange = useCallback(
    (action: string) => {
      if (action === "plus") setQuantity((prev) => prev + 1);
      if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    },
    [setQuantity, quantity]
  );

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    if (!productFetchId) {
      console.error("Product ID is missing");
      return;
    }

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id as string,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Product added to cart.", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  }, [
    dispatch,
    guestId,
    productFetchId,
    quantity,
    selectedColor,
    selectedSize,
    user?._id,
  ]);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6 ">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct?.images?.map((image, index) => (
                <img
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  key={index}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => {
                    setMainImage(image.url);
                  }}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage || "placeholder.jpg"}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overscroll-x-auto space-x-4 mb-4">
              {selectedProduct.images?.map((image, index) => (
                <img
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  key={index}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {selectedProduct.originalPrice &&
                  `$ ${selectedProduct.originalPrice}`}
              </p>
              <p className="text-xl text-gray-500 mb-2">
                $ {selectedProduct.price}
              </p>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-700 ">Color :</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border cursor-pointer ${
                        selectedColor === color
                          ? "border-4 border-cyan-200"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4 ">
                <p className="text-gray-700 ">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border cursor-pointer ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 ">Quantity</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="py-2 px-3 bg-gray-200 rounded text-lg cursor-pointer active:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="py-2 px-3 bg-gray-200 rounded text-lg cursor-pointer active:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer ${
                  isButtonDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding to Cart..." : "ADD TO CART"}
              </button>

              <div className="mt-10 text-gray-700">
                <h3 className="text-3xl font-bold mb-4">Characteristic:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
