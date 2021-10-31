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
    runInAction(() => {
      if (
        !this.bookmarkedList.find((item) => {
          return item[0] === id;
        })
      ) {
        this.bookmarkedList.push([id, url]);
      }
    });
    await Storage.setData('SaveList', this.bookmarkedList);
  }

  async removeBookmark(item) {
    runInAction(() => {
      this.bookmarkedList = this.bookmarkedList.filter((value) => {
        return value !== item;
      });
    });
    await Storage.setData('SaveList', this.bookmarkedList);
  }
}

export default CatStore;
