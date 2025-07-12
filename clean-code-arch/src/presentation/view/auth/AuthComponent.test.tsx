import { render, screen, fireEvent } from '@testing-library/react';
import AuthComponent, { AuthComponentProps } from '@presentation/view/auth/AuthComponent';

const mockAuthViewModel = {
  emailQuery: '',
  passwordQuery: '',
  isSignInButtonVisible: true,
  isSignOutButtonVisible: false,

  isShowError: false,
  errorMessage: '',

  authStatus: 'Not signed in',
  isAuthStatusPositive: false,

  attachView: jest.fn(),
  detachView: jest.fn(),

  onEmailQueryChanged: jest.fn(),
  onPasswordQueryChanged: jest.fn(),
  onClickSignIn: jest.fn(),
  onClickSignOut: jest.fn(),
};

const renderComponent = (overrideProps = {}) => {
  const props: AuthComponentProps = {
    authViewModel: { ...mockAuthViewModel, ...overrideProps },
  };
  return render(<AuthComponent {...props} />);
};

describe('AuthComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial UI correctly', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('user@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toHaveTextContent('Status: Not signed in');
  });

  it('triggers email input change correctly', () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('user@email.com') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(mockAuthViewModel.onEmailQueryChanged).toHaveBeenCalledWith('test@example.com');
  });

  it('triggers password input change correctly', () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText('password') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'secret' } });

    expect(mockAuthViewModel.onPasswordQueryChanged).toHaveBeenCalledWith('secret');
  });

  it('calls sign in method on button click', () => {
    renderComponent();

    const signInButton = screen.getByText('Sign in');
    fireEvent.click(signInButton);

    expect(mockAuthViewModel.onClickSignIn).toHaveBeenCalled();
  });

  it('shows sign out button if visible flag is true', () => {
    renderComponent({ isSignInButtonVisible: false, isSignOutButtonVisible: true });

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('displays error message when isShowError is true', () => {
    renderComponent({ isShowError: true, errorMessage: 'Invalid credentials' });

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('attaches and detaches view model on mount/unmount', () => {
    const { unmount } = renderComponent();

    expect(mockAuthViewModel.attachView).toHaveBeenCalled();

    unmount();

    expect(mockAuthViewModel.detachView).toHaveBeenCalled();
  });
});
