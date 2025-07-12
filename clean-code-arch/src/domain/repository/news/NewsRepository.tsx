// import ValidationResult from '@entity/news/stuctures/ValidationResult';
import NewsResult from '@entity/news/stuctures/NewsResult';

export default interface NewsRepository {

  /**
   * @throws {Error} if credentials have not passed
   */
  fetchNews(keyword?: string): Promise<NewsResult[]>;
}
