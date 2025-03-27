import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Filters {
  category: string;
  gender: string;
  color: string;
  size: string[];
  material: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
  [key: string]: string | number | string[];
}

const categories: readonly string[] = ["Top Wear", "Bottom Wear"];
const colors: readonly string[] = [
  "Red",
  "Blue",
  "Black",
  "White",
  "Beige",
  "Green",
  "Yellow",
  "Gray",
  "Pink",
  "Navy",
];
const sizes: readonly string[] = ["XS", "S", "M", "L", "XL", "XXL"];
const materials: readonly string[] = [
  "Cotton",
  "Wool",
  "Denim",
  "Polyester",
  "Silk",
  "Linen",
  "Viscose",
  "Fleece",
];
const brands: readonly string[] = [
  "H&M",
  "Zara",
  "Ralph Lauren",
  "Nike",
  "Louis Vuitton",
  "Adidas",
  "Chanel",
  "Uniqlo",
  "Burberry",
  "Balenciaga",
  "Gucci",
  "Prada",
  "Dolce & Gabbana",
  "Valentino",
  "Versace",
  "Calvin Klein",
  "The North Face",
];
const genders: readonly string[] = ["Men", "Women"];

const FilterSidebar: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 300,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
      maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 300,
    });
    setPriceRange([0, params.maxPrice ? parseInt(params.maxPrice) : 300]);
  }, [searchParams]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const newFilters = { ...filters };
    const filterValue = newFilters[name as keyof Filters];

    if (type === "checkbox") {
      if (Array.isArray(filterValue)) {
        if (checked) {
          newFilters[name as keyof Filters] = [...filterValue, value];
        } else {
          newFilters[name as keyof Filters] = filterValue.filter(
            (item) => item !== value
          );
        }
      }
    } else {
      newFilters[name as keyof Filters] = value;
    }
    console.log(newFilters);
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters: Filters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const filterValue = newFilters[key as keyof Filters];
      if (Array.isArray(filterValue) && filterValue.length > 0) {
        params.append(key, filterValue.join(","));
      } else if (
        typeof filterValue === "string" ||
        typeof filterValue === "number"
      ) {
        params.append(key, String(filterValue));
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    setPriceRange([0, parseInt(newPrice)]);
    const newFilters = {
      ...filters,
      minPrice: 0,
      maxPrice: parseInt(newPrice),
    };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 ">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 ">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={(e) =>
                handleFilterChange(
                  e as unknown as React.ChangeEvent<HTMLInputElement>
                )
              }
              className={`cursor-pointer w-8 h-8 rounded-full border border-gray-300 transition hover:scale-125 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Sizes Filter */}
      <div className="mb-6">
        <label htmlFor="size" className="block text-gray-600 font-medium mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Materials Filter */}
      <div className="mb-6">
        <label
          htmlFor="material"
          className="block text-gray-600 font-medium mb-2"
        >
          Material
        </label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brands Filter */}
      <div className="mb-6">
        <label htmlFor="brand" className="block text-gray-600 font-medium mb-2">
          Brand
        </label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label htmlFor="price" className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={300}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
