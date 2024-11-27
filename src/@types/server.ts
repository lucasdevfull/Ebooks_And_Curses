export interface IServer {
  plugins(): void
  routes(): void
  run(): void
}
