import BaseViewModel from '../BaseViewModel';

export default interface HomeViewModel extends BaseViewModel {
  theme: boolean;
  onThemeChanged(): void;
}
