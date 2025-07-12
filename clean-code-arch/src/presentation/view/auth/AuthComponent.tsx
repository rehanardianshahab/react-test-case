import React from 'react';
import BaseView from '@/presentation/view/BaseView';
import AuthViewModel from '@/presentation/view-model/auth/AuthViewModel';

import { Input, Button, Typography, Alert, Space, Card } from 'antd';

const { Title, Text } = Typography;

export interface AuthComponentProps {
  authViewModel: AuthViewModel;
}

export interface AuthComponentState {
  emailQuery: string;
  passwordQuery: string;
  isSignInButtonVisible: boolean;
  isSignOutButtonVisible: boolean;

  isShowError: boolean;
  errorMessage: string;

  authStatus: string;
  isAuthStatusPositive: boolean;
}

export default class AuthComponent
  extends React.Component<AuthComponentProps, AuthComponentState>
  implements BaseView
{
  private authViewModel: AuthViewModel;

  constructor(props: AuthComponentProps) {
    super(props);
    const { authViewModel } = props;
    this.authViewModel = authViewModel;

    this.state = {
      emailQuery: authViewModel.emailQuery,
      passwordQuery: authViewModel.passwordQuery,
      isSignInButtonVisible: authViewModel.isSignInButtonVisible,
      isSignOutButtonVisible: authViewModel.isSignOutButtonVisible,
      isShowError: authViewModel.isShowError,
      errorMessage: authViewModel.errorMessage,
      authStatus: authViewModel.authStatus,
      isAuthStatusPositive: authViewModel.isAuthStatusPositive,
    };
  }

  componentDidMount(): void {
    this.authViewModel.attachView(this);
  }

  componentWillUnmount(): void {
    this.authViewModel.detachView();
  }

  onViewModelChanged(): void {
    this.setState({
      emailQuery: this.authViewModel.emailQuery,
      passwordQuery: this.authViewModel.passwordQuery,
      isSignInButtonVisible: this.authViewModel.isSignInButtonVisible,
      isSignOutButtonVisible: this.authViewModel.isSignOutButtonVisible,
      isShowError: this.authViewModel.isShowError,
      errorMessage: this.authViewModel.errorMessage,
      authStatus: this.authViewModel.authStatus,
      isAuthStatusPositive: this.authViewModel.isAuthStatusPositive,
    });
  }

  render() {
    const {
      emailQuery,
      passwordQuery,
      isSignInButtonVisible,
      isSignOutButtonVisible,
      isShowError,
      errorMessage,
      authStatus,
      isAuthStatusPositive,
    } = this.state;

    return (
      <div style={{ minHeight: '100vh' }} className="flex items-center justify-center bg-gray-100 p-4">
        <Card
          style={{ maxWidth: 400, width: '100%' }}
          bordered
          title={<Title level={3}>Welcome Back 👋</Title>}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text type={isAuthStatusPositive ? 'success' : 'danger'}>
                Status: {authStatus}
              </Text>
            </div>

            <Input
              type="text"
              placeholder="user@email.com"
              value={emailQuery}
              onChange={(e) => this.authViewModel.onEmailQueryChanged(e.currentTarget.value)}
            />

            <Input.Password
              placeholder="Password"
              value={passwordQuery}
              onChange={(e) => this.authViewModel.onPasswordQueryChanged(e.currentTarget.value)}
            />

            {isShowError && <Alert message={errorMessage} type="error" showIcon />}

            {isSignInButtonVisible && (
              <Button type="primary" block onClick={() => this.authViewModel.onClickSignIn()}>
                Sign in
              </Button>
            )}

            {isSignOutButtonVisible && (
              <Button block onClick={() => this.authViewModel.onClickSignOut()}>
                Sign out
              </Button>
            )}
          </Space>
        </Card>
      </div>
    );
  }
}
