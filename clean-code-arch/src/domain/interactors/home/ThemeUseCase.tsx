import HomeHolder from '@domain/entity/home/models/HomeHolder';

export default class ThemeUseCase {
  private homeHolder: HomeHolder;

  constructor(homeHolder: HomeHolder) {
    this.homeHolder = homeHolder;
  }

  public getTheme(): boolean {
    return this.homeHolder.isDark();
  }

  public setTheme(theme: boolean): void {
    this.homeHolder.onThemeChange(theme);
  }
}
