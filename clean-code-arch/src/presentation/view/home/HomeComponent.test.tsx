import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeComponent from '@/presentation/view/home/HomeComponent';
import NewsResult from '@/domain/entity/news/stuctures/NewsResult';

jest.useFakeTimers();

class MockHomeViewModel {
  theme = true;
  attachView = jest.fn();
  detachView = jest.fn();
  onThemeChanged = jest.fn();
  notifyViewAboutChanges = jest.fn();
}

class MockNewsViewModel {
  keyword = '';
  data: NewsResult[] = [];
  isShowError = false;
  errorMessage = '';
  attachView = jest.fn();
  detachView = jest.fn();
  getNews = jest.fn();
  onChangeKeyword = jest.fn();
  notifyViewAboutChanges = jest.fn();
}

describe('HomeComponent', () => {
  it('calls onChangeKeyword when input changes (with debounce)', () => {
    const homeViewModel = new MockHomeViewModel();
    const newsViewModel = new MockNewsViewModel();

    render(
      <HomeComponent
        homeViewModel={homeViewModel}
        newsViewModel={newsViewModel}
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, {
      target: { value: 'Code and Trust: Vibrators to Pacemakers' },
    });

    jest.runAllTimers();

    expect(newsViewModel.onChangeKeyword).toHaveBeenCalledWith(
      'Code and Trust: Vibrators to Pacemakers'
    );
  });
});
