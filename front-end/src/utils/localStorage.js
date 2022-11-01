const setIntoLocalStorage = (key, value) => localStorage
  .setItem(key, JSON.stringify(value));

const getFromLocalStorage = (key) => {
  const responseStorage = localStorage.getItem(key);

  const exampleStorage = {
    name: 'exemplo',
    email: 'exemplo',
    role: 'exemplo',
    token: 'exemplo',
  };

  if (!responseStorage) return exampleStorage;

  return JSON.parse(responseStorage);
};

module.exports = {
  setIntoLocalStorage,
  getFromLocalStorage,
};
