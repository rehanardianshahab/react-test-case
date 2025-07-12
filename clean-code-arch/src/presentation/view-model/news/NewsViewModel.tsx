import NewsResult from '@/domain/entity/news/stuctures/NewsResult';
import BaseViewModel from '../BaseViewModel';

export default interface NewsViewModel extends BaseViewModel {
  keyword: string;
  data: NewsResult[];
  isShowError: boolean;
  errorMessage: string;

  onChangeKeyword(keyword?: string): void;
  getNews(): void;
}
