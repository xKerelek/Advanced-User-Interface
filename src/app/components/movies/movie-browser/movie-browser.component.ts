import {
  Component,
  inject,
  signal,
  ViewChild,
  ElementRef,
  afterNextRender,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService, Movie } from '../../../core/services/tmdb.service';
import { FavoriteService } from '../../../core/services/favorite.service';

@Component({
  selector: 'app-movie-browser',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-browser.component.html'
})
export class MovieBrowserComponent implements OnDestroy {
  private tmdbService = inject(TmdbService);
  favoriteService = inject(FavoriteService);

  searchInput = signal('');
  debouncedSearch = signal('');
  private debounceTimer: any;

  query = this.tmdbService.getInfiniteMovies(this.debouncedSearch);

  selectedMovieId = signal<number | null>(null);
  detailsQuery = this.tmdbService.getMovieDetails(this.selectedMovieId);

  @ViewChild('loadMoreTrigger') loadMoreTrigger!: ElementRef;
  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.setupObserver();
    });
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;

      if (isVisible && this.query.hasNextPage() && !this.query.isFetchingNextPage()) {
        this.query.fetchNextPage();
      }
    }, { rootMargin: '200px' });

    setTimeout(() => {
      if (this.loadMoreTrigger?.nativeElement) {
        this.observer?.observe(this.loadMoreTrigger.nativeElement);
      }
    }, 500);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  openModal(id: number) {
    this.selectedMovieId.set(id);
  }

  closeModal() {
    this.selectedMovieId.set(null);
  }

  onToggleFavorite(event: Event, movie: Movie) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(movie);
  }

  onSearchChange(value: string) {
    this.searchInput.set(value);
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.debouncedSearch.set(value);
    }, 300);
  }
}
