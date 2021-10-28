import { defaultAxios } from '@libs/axios';

const CatService = {
  async getRandomCat() {
    try {
      const response = await defaultAxios.get('/images/search?limit=1');
      return response.data[0];
    } catch (error) {
      console.log(error);
    }
  },
};

export default CatService;
