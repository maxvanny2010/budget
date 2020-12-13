export class AuthService {
  private isAuthenticated = false;

  login(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.clear();
  }

  isLoggIn(): boolean {
    return this.isAuthenticated;
  }
}
