export function getFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}