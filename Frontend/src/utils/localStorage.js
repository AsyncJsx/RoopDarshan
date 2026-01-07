export const setWithExpiry = (key, value, ttlMs) => {
    const item = {
      data: value,
      expiresAt: Date.now() + ttlMs,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  export const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
  
    const item = JSON.parse(itemStr);
  
    if (Date.now() > item.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
  
    return item.data;
  };
  