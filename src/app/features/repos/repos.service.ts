import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReposService {
  constructor(private http: HttpClient) {}

  getRepos(username: string) {
    console.log('Fetching repos for user:', username);
    return this.http.get<any[]>(`https://api.github.com/users/${username}/repos`).pipe(
      catchError(() => of([]))
    );
  }
}