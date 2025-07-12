import React from 'react';
import BaseView from '@/presentation/view/BaseView';
import HomeViewModel from '@/presentation/view-model/home/HomeViewModel';
import NewsViewModel from '@/presentation/view-model/news/NewsViewModel';
import NewsResult from '@/domain/entity/news/stuctures/NewsResult';
import debounce from 'lodash.debounce';

import { Row, Col, Image, Input, Modal, Typography } from 'antd';

export interface HomeComponentProps {
  homeViewModel: HomeViewModel;
  newsViewModel: NewsViewModel;
}

export interface HomeComponentState {
  news: NewsResult[];
  keyword: string;
  theme: boolean;
  selectedNews?: NewsResult;
  isModalVisible: boolean;
}

const styleImage: React.CSSProperties = {
  objectFit: 'cover',
  width: '100%',
  height: '200px',
};

export default class HomeComponent
  extends React.Component<HomeComponentProps, HomeComponentState>
  implements BaseView
{
  private homeViewModel: HomeViewModel;
  private newsViewModel: NewsViewModel;

  constructor(props: HomeComponentProps) {
    super(props);

    const { homeViewModel, newsViewModel } = this.props;
    this.homeViewModel = homeViewModel;
    this.newsViewModel = newsViewModel;

    this.state = {
      news: newsViewModel.data,
      keyword: newsViewModel.keyword,
      theme: homeViewModel.theme,
      selectedNews: undefined,
      isModalVisible: false,
    };
  }

  componentDidMount(): void {
    this.homeViewModel.attachView(this);
    this.newsViewModel.attachView(this);
    this.newsViewModel.getNews();
  }

  componentWillUnmount(): void {
    this.homeViewModel.detachView();
    this.newsViewModel.detachView();
  }

  onViewModelChanged(): void {
    this.setState({
      news: this.newsViewModel.data,
      keyword: this.newsViewModel.keyword,
      theme: this.homeViewModel.theme,
    });
  }

  private debouncedChangeKeyword = debounce((keyword: string) => {
    this.newsViewModel.onChangeKeyword(keyword);
  }, 500);

  public onChangeKeyword = (keyword: string): void => {
    this.debouncedChangeKeyword(keyword);
  };

  private openNewsDetail = (news: NewsResult) => {
    this.setState({ selectedNews: news, isModalVisible: true });
  };

  private closeModal = () => {
    this.setState({ isModalVisible: false, selectedNews: undefined });
  };

  render() {
    const { news, isModalVisible, selectedNews } = this.state;

    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <Input onChange={(e) => this.onChangeKeyword(e.target.value)} placeholder="Search news..." />
        </div>

        <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
          <Row gutter={16}>
            {news?.map((item: NewsResult, index: number) => (
              <Col className="gutter-row" span={8} key={index}>
                <div onClick={() => this.openNewsDetail(item)} style={{ cursor: 'pointer' }}>
                  <NewsCard data={item} />
                </div>
                <br />
              </Col>
            ))}
          </Row>
        </div>

        <Modal
          title={selectedNews?.title}
          open={isModalVisible}
          footer={null}
          onCancel={this.closeModal}
          width={800}
        >
          {selectedNews && (
            <>
              <Image
                src={selectedNews.urlToImage || '/thumbnail.png'}
                alt="News thumbnail"
                style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
              />
              <Typography.Paragraph className="mt-3">
                {selectedNews.description || 'No description available.'}
              </Typography.Paragraph>
              <Typography.Link href={selectedNews.url} target="_blank">
                Read full article
              </Typography.Link>
            </>
          )}
        </Modal>
      </>
    );
  }
}

function NewsCard({ data }: { data: NewsResult }) {
  return (
    <div>
      <Image
        src={data.urlToImage || '/thumbnail.png'}
        alt="News thumbnail"
        style={styleImage}
      />
      <h3>{data.title.length > 50 ? data.title.slice(0, 50) + '...' : data.title}</h3>
      <p style={{ color: '#666' }}>Stay tuned for the latest updates and news.</p>
    </div>
  );
}
