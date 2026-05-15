import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly API_KEY = environment.movieAPI;

  getMovies(page: Signal<number>, query: Signal<string>) {
    return injectQuery(() => {
      const isSearch = query().trim().length > 0;
      const endpoint = isSearch ? '/search/movie' : '/movie/popular';

      return {
        queryKey: ['movies', isSearch ? 'search' : 'popular', page(), query()],
        queryFn: () => {
          let params = new HttpParams()
            .set('api_key', this.API_KEY)
            .set('page', page().toString());

          if (isSearch) params = params.set('query', query());

          const url = `${this.BASE_URL}${endpoint}`;
          return lastValueFrom(this.http.get<MoviesResponse>(url, { params }));
        },
        enabled: !!this.API_KEY && this.API_KEY.length > 0
      };
    });
  }

  getMovieDetails(id: Signal<number | null>) {
    return injectQuery(() => ({
      queryKey: ['movieDetails', id()],
      queryFn: () => {
        const params = new HttpParams().set('api_key', this.API_KEY);
        const url = `${this.BASE_URL}/movie/${id()}`;
        return lastValueFrom(this.http.get<any>(url, { params }));
      },
      enabled: id() !== null && !!this.API_KEY && this.API_KEY.length > 0,
    }));
  }

  getInfiniteMovies(query: Signal<string>) {
    return injectInfiniteQuery(() => {
      const isSearch = query().trim().length > 0;
      const endpoint = isSearch ? '/search/movie' : '/movie/popular';

      return {
        queryKey: ['movies', 'infinite', isSearch ? 'search' : 'popular', query()],
        queryFn: async ({ pageParam }) => {
          let params = new HttpParams()
            .set('api_key', this.API_KEY)
            .set('page', (pageParam as number).toString());

          if (isSearch) params = params.set('query', query());

          const url = `${this.BASE_URL}${endpoint}`;
          return lastValueFrom(this.http.get<MoviesResponse>(url, { params }));
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
        enabled: !!this.API_KEY && this.API_KEY.length > 0
      };
    });
  }
}
