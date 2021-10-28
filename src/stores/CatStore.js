import { makeAutoObservable, runInAction } from 'mobx';
import Storage from '@libs/storage';
import CatService from '@services/CatService';

class CatStore {
  cat = {};
  bookmarkedList = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getRandomCat() {
    const response = await CatService.getRandomCat();
    const { id, url } = response;

    runInAction(() => {
      this.cat = { id, url };
    });
  }

  async addBookmark({ id, url }) {
    this.bookmarkedList.push(url);
    await Storage.setData('SaveList', this.bookmarkedList);
  }

  async removeBookmark(item) {
    this.bookmarkedList = this.bookmarkedList.filter((value) => {
      return value !== item;
    });
    await Storage.setData('SaveList', this.bookmarkedList);
  }
}

export default CatStore;
