import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import {Character, RamResponse} from '../../shared/models/ram.interface';


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
