export const setWithExpiry = (key, value, ttlMs) => {
  const item = {
    data: value,       // store as array/object directly
    expiresAt: Date.now() + ttlMs,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  let item;
  try {
    item = JSON.parse(itemStr);
  } catch {
    localStorage.removeItem(key);
    return null;
  }

  if (Date.now() > item.expiresAt) {
    localStorage.removeItem(key);
    return null;
  }

  return item.data; // already array/object, no parsing needed
};
