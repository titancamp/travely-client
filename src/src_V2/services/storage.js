class Storage {
  _getStorage(isLocalStorage = true) {
    return isLocalStorage ? window.localStorage : window.sessionStorage;
  }

  getItem(item, isLocalStorage) {
    return this._getStorage(isLocalStorage).getItem(item);
  }

  setItem(item, value, isLocalStorage) {
    this._getStorage(isLocalStorage).setItem(item, value);
  }

  removeItem(item, isLocalStorage) {
    this._getStorage(isLocalStorage).remove(item);
  }

  clear(both = false, isLocalStorage) {
    if (both) {
      localStorage.clear();
      sessionStorage.clear();
    } else {
      this._getStorage(isLocalStorage).clear();
    }
  }
}

export default new Storage();
