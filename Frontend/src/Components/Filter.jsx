import React, { useState } from "react";

export default function Filters({ onFilterChange }) {
  

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const categoryOptions = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Boys", value: "boys" },
    { label: "Girls", value: "girls" },
  ];

  const [filters, setFilters] = useState({
    price: [],
    gender: [],
    category: [],
  });

  const handleChange = (type, value) => {
    const updated = filters[type].includes(value)
      ? filters[type].filter((item) => item !== value)
      : [...filters[type], value];

    const newFilters = { ...filters, [type]: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="md:w-64 w-[28vw] h-[72vh] bg-white border border-gray-300 rounded-lg md:p-5 p-2 shadow-sm">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Filters</h2>

    

      <hr className="my-2" />

      {/* Gender Filter */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Gender</h3>
        <div className="flex flex-col gap-2 text-gray-600">
          {genderOptions.map((option, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={filters.gender.includes(option.value)}
                onChange={() => handleChange("gender", option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <hr className="my-2" />

      {/* Category Filter */}
      <div className="mb-2">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Category</h3>
        <div className="flex flex-col gap-2 text-gray-600">
          {categoryOptions.map((option, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={filters.category.includes(option.value)}
                onChange={() => handleChange("category", option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
