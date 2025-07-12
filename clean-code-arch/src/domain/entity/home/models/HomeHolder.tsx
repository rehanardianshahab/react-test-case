import HomeListener from './HomeListener';

export default class HomeHolder {
  private homeListeners: HomeListener[] = [];
  private __isDarkMode: boolean;

  public constructor() {
    const storedTheme = localStorage.getItem('isDarkMode');
    this.__isDarkMode = storedTheme ? storedTheme === 'true' : true;
  }

  public onThemeChange(theme: boolean): void {
    this.__isDarkMode = theme;
    localStorage.setItem('isDarkMode', theme.toString());
    this.notifyListeners()
  }

  public isDark(): boolean {
    return this.__isDarkMode;
  }

  public addHomeListener(homeListener: HomeListener): void {
    this.homeListeners.push(homeListener);
  }

  public removeHomeListener(homeListener: HomeListener): void {
    const index = this.homeListeners.indexOf(homeListener);
    if (index !== -1) {
      this.homeListeners.splice(index, 1);
    }
  }

  private notifyListeners(): void {
    this.homeListeners.forEach(listener => listener.onThemeChanged());
  }
}
