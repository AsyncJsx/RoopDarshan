import React, { useContext, useEffect, useState } from "react";
import Admin_Product from "./Admin-Product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import axios from '../config/axios';
import Navbar from "./Navbar";
import { ArrowLeft, Trash2, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Admin_Categories() {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('Admin-Token');
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    axios.get(`/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const cat = res.data.category;
      setCategory(cat);
      setProducts(cat.products || []);
    }).catch((err) => {
      console.log(err);
      toast.error("Failed to load category");
    });
  }, [token, id]);

  // ── Single delete ────────────────────────────────────────────────────────────
  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setSelectedIds((prev) => prev.filter((x) => x !== productId));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ── Single visibility toggle ─────────────────────────────────────────────────
  const handleToggleVisibility = async (productId) => {
    try {
      await axios.patch(`/product/${productId}/visibility`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, visible: p.visible === false ? true : false } : p
        )
      );
    } catch (err) {
      toast.error("Failed to update visibility");
    }
  };

  // ── Checkbox select ──────────────────────────────────────────────────────────
  const handleSelect = (productId) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((x) => x !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p._id));
    }
  };

  // ── Bulk delete ──────────────────────────────────────────────────────────────
  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm(`Delete ${selectedIds.length} product(s)? This cannot be undone.`)) return;
    setBulkLoading(true);
    try {
      await axios.delete("/product/bulk", {
        headers: { Authorization: `Bearer ${token}` },
        data: { ids: selectedIds },
      });
      setProducts((prev) => prev.filter((p) => !selectedIds.includes(p._id)));
      setSelectedIds([]);
      toast.success(`${selectedIds.length} products deleted`);
    } catch (err) {
      toast.error("Bulk delete failed");
    } finally {
      setBulkLoading(false);
    }
  };

  // ── Bulk hide ────────────────────────────────────────────────────────────────
  const handleBulkHide = async () => {
    if (!selectedIds.length) return;
    setBulkLoading(true);
    try {
      await Promise.all(
        selectedIds.map((productId) =>
          axios.patch(`/product/${productId}/visibility`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setProducts((prev) =>
        prev.map((p) =>
          selectedIds.includes(p._id) ? { ...p, visible: false } : p
        )
      );
      setSelectedIds([]);
      toast.success("Products hidden");
    } catch (err) {
      toast.error("Bulk hide failed");
    } finally {
      setBulkLoading(false);
    }
  };

  // ── Bulk unhide ──────────────────────────────────────────────────────────────
  const handleBulkUnhide = async () => {
    if (!selectedIds.length) return;
    setBulkLoading(true);
    try {
      await Promise.all(
        selectedIds.map((productId) =>
          axios.patch(`/product/${productId}/visibility`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setProducts((prev) =>
        prev.map((p) =>
          selectedIds.includes(p._id) ? { ...p, visible: true } : p
        )
      );
      setSelectedIds([]);
      toast.success("Products visible");
    } catch (err) {
      toast.error("Bulk unhide failed");
    } finally {
      setBulkLoading(false);
    }
  };

  const allSelected = products.length > 0 && selectedIds.length === products.length;

  return (
    <div className="w-full min-h-[50vh] flex flex-col relative md:p-12 p-4 bg-white rounded-2xl shadow-md border border-gray-200 mb-10 transition-all hover:shadow-lg">
      <Navbar />
      <Toaster />

      {/* Category Title */}
      <h3 className="categoryname text-gray-900 tracking-wide md:text-2xl text-lg font-semibold text-center mb-2 mt-44">
        {language === "en" ? category.eng_name : category.mar_name}
      </h3>

      {/* Category Description */}
      <h2 className="categorydescription text-gray-600 tracking-wide md:text-sm text-sm font-normal text-center max-w-2xl mx-auto">
        {language === "en" ? category.eng_description : category.mar_description}
      </h2>

      {/* Back */}
      <div
        className="w-[80%] flex items-center gap-2 mt-6 text-gray-700 hover:text-black cursor-pointer transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </div>

      {/* ── Bulk action bar — only shows when something is selected ── */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 my-4 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl">
          <span className="text-sm font-medium text-gray-700">
            {selectedIds.length} selected
          </span>

          {/* Bulk Hide */}
          <button
            onClick={handleBulkHide}
            disabled={bulkLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-800 border border-yellow-300 text-xs font-semibold rounded-lg hover:bg-yellow-200 transition disabled:opacity-50"
          >
            <EyeOff className="w-3.5 h-3.5" />
            Hide
          </button>

          {/* Bulk Unhide */}
          <button
            onClick={handleBulkUnhide}
            disabled={bulkLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 border border-blue-300 text-xs font-semibold rounded-lg hover:bg-blue-200 transition disabled:opacity-50"
          >
            <Eye className="w-3.5 h-3.5" />
            Unhide
          </button>

          {/* Bulk Delete */}
          <button
            onClick={handleBulkDelete}
            disabled={bulkLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {bulkLoading ? "Processing..." : "Delete"}
          </button>

          {/* Select All / Deselect All */}
          <button
            onClick={handleSelectAll}
            className="ml-auto text-xs text-gray-500 underline hover:text-black transition"
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        </div>
      )}

      {/* Select All trigger when nothing selected yet */}
      {selectedIds.length === 0 && products.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSelectAll}
            className="text-xs text-gray-400 underline hover:text-black transition"
          >
            Select All
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="products w-full flex flex-wrap justify-center md:gap-6 gap-3 mb-8 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Admin_Product
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onToggleVisibility={handleToggleVisibility}
              isSelected={selectedIds.includes(product._id)}
              onSelect={handleSelect}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center my-6">
            No products available in this category.
          </p>
        )}
      </div>

      {/* Category edit/delete */}
      <div className="w-full h-8 flex items-center justify-end gap-3">
        <Link
          to={`/category/edit/${category._id}`}
          className="ri-edit-2-line text-green-500 text-xl hover:text-green-700 hover:underline underline-offset-4"
        />
        <Link
          to={`/category/delete/${category._id}`}
          className="ri-delete-bin-line text-red-500 text-xl hover:text-red-700 hover:underline underline-offset-4"
        />
      </div>
    </div>
  );
}

export default Admin_Categories;