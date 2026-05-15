import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender?: string;
  origin?: { name: string };
  location?: { name: string };
}

export interface RamResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

@Injectable({ providedIn: 'root' })
export class RickAndMortyService {
  private http = inject(HttpClient);
  private readonly RAM_API = 'https://rickandmortyapi.com/api/character';

  getCharacters(page: Signal<number>, name: Signal<string>) {
    return injectQuery(() => ({
      queryKey: ['characters', page(), name()],
      queryFn: () => {
        const url = `${this.RAM_API}?page=${page()}&name=${name()}`;
        return lastValueFrom(this.http.get<RamResponse>(url));
      },
    }));
  }

  getCharacterDetails(id: Signal<number | null>) {
    return injectQuery(() => ({
      queryKey: ['characterDetails', id()],
      queryFn: () => {
        const url = `${this.RAM_API}/${id()}`;
        return lastValueFrom(this.http.get<Character>(url));
      },
      enabled: id() !== null,
    }));
  }
}
