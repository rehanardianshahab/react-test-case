// src/domain/entity/news/models/NewsHolder.ts
import NewsResult from '../stuctures/NewsResult';
import NewsListener from './NewsListener';

export default class NewsHolder {
  private newsListeners: NewsListener[];
  private __isLoading: boolean;
  private __news: NewsResult[];

  constructor() {
    this.newsListeners = [];
    this.__news = [];
    this.__isLoading = false;
  }

  public setNews(news: NewsResult[]): void {
    this.__news = news;
  }

  public getNews(): NewsResult[] {
    return this.__news;
  }

  public setLoading(isLoading: boolean): void {
    this.__isLoading = isLoading;
    this.notifyListeners();
  }

  public isLoading(): boolean {
    return this.__isLoading;
  }

  public addNewsListener(listener: NewsListener): void {
    this.newsListeners.push(listener);
  }

  public removeNewsListener(listener: NewsListener): void {
    this.newsListeners = this.newsListeners.filter(l => l !== listener);
  }

  private notifyListeners(): void {
    this.newsListeners.forEach(listener => listener.onNewsUpdated());
  }
}
