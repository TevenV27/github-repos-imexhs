import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserData(username: string) {
    return this.http.get<any>(`https://api.github.com/users/${username}`).pipe(
      catchError(() => of({}))
    );
  }
}