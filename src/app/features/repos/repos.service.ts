import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { RepoModel } from '../../shared/models/repo.model';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReposService {
  constructor(private http: HttpClient) { }

  getRepos(username: string, page: number = 1, perPage: number = 30) {
    const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
    return this.http.get<RepoModel[]>(url).pipe(
      catchError(() => of([]))
    );
  }

  getAllRepos(username: string): Promise<RepoModel[]> {
    const perPage = 100;
    let page = 1;
    let allRepos: RepoModel[] = [];

    const fetchPage = (pageNum: number): Promise<RepoModel[]> =>
      this.http.get<RepoModel[]>(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${pageNum}`)
        .toPromise()
        .then(repos => Array.isArray(repos) ? repos : [] as RepoModel[])
        .catch(() => [] as RepoModel[]);

    const fetchAll = async (): Promise<RepoModel[]> => {
      while (true) {
        const repos = await fetchPage(page); // siempre será RepoModel[]
        allRepos = allRepos.concat(repos);
        if (repos.length < perPage) break;
        page++;
      }
      return allRepos;
    };

    return fetchAll();
  }
}
