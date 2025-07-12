export default interface NewsListener {
    onChangeKeyword(keyword?: string): void;
    getNews(): void;
}