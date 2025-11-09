export class AppError extends Error {
  main: string;
  details?: string;

  constructor(main: string, details?: string) {
    super(main);
    this.main = main;
    this.details = details;
  }
}