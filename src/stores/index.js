import React from 'react';
import CatStore from './CatStore';

class RootStore {
  constructor() {
    this.catStore = new CatStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);
