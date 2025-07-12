import HomeViewModel from './HomeViewModel';
import BaseView from '@presentation/view/BaseView';
import ThemeUseCase from '@domain/interactors/home/ThemeUseCase';
import HomeHolder from '@domain/entity/home/models/HomeHolder';
import HomeListener from '@domain/entity/home/models/HomeListener';

export default class HomeViewModelImpl implements HomeViewModel, HomeListener {
  private baseView?: BaseView;
  private homeHolder: HomeHolder;
  private themeUseCase: ThemeUseCase;
  public theme: boolean;

  public constructor(theme: ThemeUseCase, homeHolder: HomeHolder) {
    this.theme = homeHolder.isDark();
    this.homeHolder = homeHolder;
    this.themeUseCase = theme;

    this.homeHolder.addHomeListener(this);
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };
  
  public detachView = (): void => {
    this.baseView = undefined;
  };

  public setTheme = (themes: boolean): void => {
    this.theme = themes;
    this.themeUseCase.setTheme(this.theme)
    this.notifyViewAboutChanges();
  };

  public onThemeChanged = (): void => {
    console.log(this.homeHolder.isDark())
    this.notifyViewAboutChanges();
  };
  
  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}
