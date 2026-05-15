import { Component, inject, signal } from '@angular/core';
import { RickAndMortyService, Character } from '../../core/services/rick-and-morty.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rick-and-morty',
  imports: [CommonModule, FormsModule],
  templateUrl: './rick-and-morty.component.html',
  styleUrl: './rick-and-morty.component.css'
})

export class RickAndMortyComponent {
  private movieService = inject(RickAndMortyService);
  favoriteService = inject(FavoriteService);

  currentPage = signal(1);
  searchInput = signal('');
  debouncedSearch = signal('');
  private debounceTimer: any;

  query = this.movieService.getCharacters(this.currentPage, this.debouncedSearch);

  selectedCharacterId = signal<number | null>(null);
  detailsQuery = this.movieService.getCharacterDetails(this.selectedCharacterId);

  openModal(id: number) {
    this.selectedCharacterId.set(id);
  }

  closeModal() {
    this.selectedCharacterId.set(null);
  }

  onToggleFavorite(event: Event, character: Character) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(character);
  }

  onSearchChange(value: string) {
    this.searchInput.set(value);
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.currentPage.set(1);
      this.debouncedSearch.set(value);
    }, 300);
  }

  nextPage() {
    if (this.query.data()?.info?.next) this.currentPage.update(p => p + 1);
  }

  prevPage() {
    if (this.query.data()?.info?.prev) this.currentPage.update(p => Math.max(1, p - 1));
  }
}

