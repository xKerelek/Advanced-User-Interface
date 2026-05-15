import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly STORAGE_KEY = 'app-favorites';

  favorites = signal<any[]>(this.loadFavorites());

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites()));
    });
  }

  private loadFavorites(): any[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  toggleFavorite(item: any) {
    this.favorites.update(prev => {
      const isFav = prev.some(i => i.id === item.id);
      if (isFav) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  }

  isFavorite(id: number): boolean {
    return this.favorites().some(i => i.id === id);
  }
}
