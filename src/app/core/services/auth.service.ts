import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GithubAuthProvider, signOut, user, User } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$!: Observable<User | null>;
  private accessToken: string | null = null;
  private githubUsername: string | null = null;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }

  loginWithGitHub() {
    const provider = new GithubAuthProvider();
    return from(
      signInWithPopup(this.auth, provider).then(async (result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        this.accessToken = credential?.accessToken || null;
        if (this.accessToken) {
          const response = await fetch('https://api.github.com/user', {
            headers: { Authorization: `token ${this.accessToken}` }
          });
          const data = await response.json();
          this.githubUsername = data.login;
          console.log('GitHub User:', data);
          localStorage.setItem('githubUsername', this.githubUsername || '');
          localStorage.setItem('githubUserInfo', JSON.stringify(data));

        }
        return result;
      })
    );
  }

  getGitHubUsername() {
    return this.githubUsername || localStorage.getItem('githubUsername') || '';
  }

  logout() {
    return from(signOut(this.auth));
  }
}