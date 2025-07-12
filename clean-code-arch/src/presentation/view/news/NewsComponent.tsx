import React from 'react';
import './news-component.css';
import BaseView from '@/presentation/view/BaseView';
import NewsViewModel from '@/presentation/view-model/news/NewsViewModel';

import { Input } from 'antd';
import NewsResult from '@/domain/entity/news/stuctures/NewsResult';

export interface NewsComponentProps {
  newsViewModel: NewsViewModel;
}

export interface NewsComponentState {
  data: NewsResult[];

  isShowError: boolean;
  errorMessage: string;
}


export default class NewsComponent
  extends React.Component<NewsComponentProps, NewsComponentState>
  implements BaseView
{
  private newsViewModel: NewsViewModel;

  public constructor(props: NewsComponentProps) {
    super(props);

    const { newsViewModel } = this.props;
    this.newsViewModel = newsViewModel;

    this.state = {
      data: newsViewModel.data,

      isShowError: newsViewModel.isShowError,
      errorMessage: newsViewModel.errorMessage,
    };
  }

  public componentDidMount(): void {
    this.newsViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.newsViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      data: this.newsViewModel.data,

      isShowError: this.newsViewModel.isShowError,
      errorMessage: this.newsViewModel.errorMessage,
    });
  }

  public render() {
    const {
      data,
      isShowError,
      errorMessage,
    } = this.state;

    return (
      <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
       
        {JSON.stringify(data)}
          {isShowError && (
            <div className="row my-3 text-danger justify-content-center">{errorMessage}</div>
          )}
      </div>
    );
  }
}
