import axios from 'axios';
import NewsResult from '@/domain/entity/news/stuctures/NewsResult';
import ApiFetch from '../../presentation/util/NewsApi';
import NewsRepository from '@/domain/repository/news/NewsRepository';

export default class NewsApi implements NewsRepository {
  fetchNews(keyword?: string): Promise<NewsResult[]> {
    return new Promise((resolve, reject) => {
      const params = {
        q: keyword || 'programmer',
        apiKey: import.meta.env.VITE_APIKEY,
        pageSize: 10
      }

      axios.get(ApiFetch.getNews(), {
        params: params,
      })
      .then((response) => {
        if (response.data.status !== 'ok' || !Array.isArray(response.data.articles)) {
          throw new Error(`Invalid API response: ${response.data.message || 'Unknown reason'}`);
        }
      
        const news = response.data.articles.map((article: any, index: number) => ({
          id: index.toString(),
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
        }));
      
        resolve(news);
      })
      .catch((error) => {
        console.error('❌ Error fetching news:', error.response?.data || error.message);
        reject(error);
      });
      
      
    });
  }
  
}
