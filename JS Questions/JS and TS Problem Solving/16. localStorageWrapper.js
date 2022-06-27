const myLocalStorage = {
    setItem: function (key, value, expiryTime) {
      localStorage.setItem(key, value);
      setTimeout(() => {
        localStorage.removeItem(key);
      }, 1000);
    },
    getItem: function (key) {
      return localStorage.getItem(key);
    }
};
  
myLocalStorage.setItem("roc8", "42", 1000);
console.log(myLocalStorage.getItem("roc8")); // 42
  
setTimeout(() => {
    console.log(myLocalStorage.getItem("roc8")); // null
}, 1000);