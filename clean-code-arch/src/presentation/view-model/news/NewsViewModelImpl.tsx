import NewsViewModel from './NewsViewModel';
import BaseView from '@presentation/view/BaseView';
import NewsUseCase from '@interactors/news/NewsUseCase';
import NewsHolder from '@entity/news/models/NewsHolder';
import NewsListener from '@entity/news/models/NewsListener';
import NewsResult from '@/domain/entity/news/stuctures/NewsResult';

export default class NewsViewModelImpl implements NewsViewModel, NewsListener {
  public data: NewsResult[];
  public keyword: string;
  
  public isShowError: boolean;
  public errorMessage: string;

  private baseView?: BaseView;
  private newsUseCase: NewsUseCase;
  private newsHolder: NewsHolder;

  public constructor(newsUseCase: NewsUseCase, newsHolder: NewsHolder) {
    this.keyword = ''
    this.data = [];
    this.isShowError = false;
    this.errorMessage = '';

    this.newsUseCase = newsUseCase;
    this.newsHolder = newsHolder;

    this.newsHolder.addNewsListener(this);
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public getNews = async (): Promise<void> => {
    this.onChangeKeyword('')
  };

  public onChangeKeyword = async (keyword: string): Promise<void> => {
    try {
      this.keyword = keyword || '';
      await this.newsUseCase.getData(keyword);
      this.data = this.newsHolder.getNews();
      this.isShowError = false;
      this.errorMessage = '';
    } catch (e) {
      this.errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      this.isShowError = true;
    }
    this.notifyViewAboutChanges();
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}
