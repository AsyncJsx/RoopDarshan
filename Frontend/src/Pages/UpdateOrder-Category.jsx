import React, { useEffect, useState } from 'react';
import axios from '../config/axios';
import toast from 'react-hot-toast';
import AdminCategoryCard from './AdminCategoryCard';

function UpdateOrderCategory() {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('Admin-Token');

  useEffect(() => {
    axios.get('/category/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCategories(res.data.categories || []))
    .catch(() => toast.error('Failed to load categories'));
  }, []);

  const handleReorder = async (id, direction) => {
    const index = categories.findIndex(c => c._id === id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= categories.length) return;

    // ✅ swap locally first — instant UI
    const updated = [...categories];
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];
    setCategories(updated);

    // ✅ send one bulk request
    try {
      await axios.patch('/category/reorder/bulk',
        { orderedIds: updated.map(c => c._id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('categories'); // invalidate cache
    } catch (err) {
      setCategories(categories); // revert on failure
      toast.error('Failed to reorder');
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 p-4">
      {categories.map(category => (
        <AdminCategoryCard
          key={category._id}
          category={category}
          onReorder={handleReorder}
        />
      ))}
    </div>
  );
}

export default UpdateOrderCategory;