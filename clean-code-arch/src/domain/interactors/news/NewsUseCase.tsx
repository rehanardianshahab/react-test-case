import NewsRepository from '@repository/news/NewsRepository';
import NewsHolder from '@entity/news/models/NewsHolder';

export default class NewsUseCase {
  private newsRepository: NewsRepository;
  private newsHolder: NewsHolder;

  public constructor(newsRepository: NewsRepository, newsHolder: NewsHolder) {
    this.newsRepository = newsRepository;
    this.newsHolder = newsHolder;
  }

  /**
   * @throws {Error} if credentials are not valid or have not passed
   */
  public async getData(keyword?: string): Promise<void> {
    console.log('usecase getData called with keyword:', keyword);
    // const validationResult = await this.newsRepository.validateCredentials(key);
    const newsResult = await this.newsRepository.fetchNews(keyword);
    this.newsHolder.setNews(newsResult);
  }
}
