export default interface HomeListener {
  setTheme(themes: boolean): void;
  onThemeChanged(): void;
}
