# To-Do App

## 🚀 Główne funkcjonalności

* **Pełny CRUD:** Dodawanie, odczyt, edycja **inline-editing** oraz usuwanie zadań, zsynchronizowane z lokalną bazą danych za pomocą zapytań HTTP.
* **Nowoczesne zarządzanie stanem (Signals):** Wykorzystanie `toSignal` oraz `computed` do błyskawicznego, reaktywnego przeliczania wyświetlanej listy i liczników zadań.
* **Czysty Control Flow:** Zastosowanie natywnej składni `@if`, `@else` i `@for` w widokach, co zapewnia przejrzystą, imperatywną strukturę logiczną znaną z języków takich jak C czy C++.
* **Dynamiczne filtrowanie:** Przełączanie między widokami zadań (All / Active / Completed).
* **Czysta architektura:** Rozdzielenie logiki biznesowej (Serwisy), modeli danych (Interfejsy) oraz warstwy prezentacji (Komponenty).
* **UI/UX:** W pełni ostylowany, responsywny interfejs przy użyciu Tailwind CSS.

## 🛠️ Technologie

* Angular 19 
* TypeScript
* Tailwind CSS
* json-server

---

## ⚙️ Uruchomienie projektu

### Krok 1: Instalacja zależności
Otwórz terminal w głównym folderze projektu i zainstaluj wymagane pakiety:

```bash
npm install
```

### Krok 2: Uruchomienie bazy danych 
Aplikacja korzysta z json-server jako lokalnej bazy danych (plik db.json). Uruchom go w terminalu na porcie 3000:

```bash
npx json-server db.json 
```

Krok 3: Uruchomienie aplikacji 
Otwórz drugie okno terminala (nie zamykając pierwszego) i uruchom serwer deweloperski Angulara:

```bash
ng server
```

### Otwórz przeglądarkę i wejdź pod adres:

```bash 
👉 http://localhost:4200
```
