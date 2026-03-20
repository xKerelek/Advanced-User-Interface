# To-Do App

## 🚀 Główne funkcjonalności

* **Pełny CRUD:** Dodawanie, odczyt, edycja **inline-editing** oraz usuwanie zadań, zsynchronizowane z lokalną bazą danych za pomocą zapytań HTTP.
* **Nowoczesne zarządzanie stanem (Signals):** Wykorzystanie `toSignal` oraz `computed` do błyskawicznego, reaktywnego przeliczania wyświetlanej listy i liczników zadań.
* **Czysty Control Flow:** Zastosowanie natywnej składni `@if`, `@else` i `@for` w widokach, co zapewnia przejrzystą, imperatywną strukturę logiczną.
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
ng serve
```

### Otwórz przeglądarkę i wejdź pod adres:

```bash 
👉 http://localhost:4200
```

---
---

# To-Do App

## 🚀 Main Features

* **Full CRUD:** Adding, reading, **inline-editing**, and deleting tasks, synchronized with a local database via HTTP requests.
* **Modern State Management (Signals):** Utilizing `toSignal` and `computed` for instant, reactive recalculation of the displayed list and task counters.
* **Clean Control Flow:** Application of native `@if`, `@else`, and `@for` syntax in templates, providing a clear, imperative logical structure.
* **Dynamic Filtering:** Switching between task views (All / Active / Completed).
* **Clean Architecture:** Separation of business logic (Services), data models (Interfaces), and the presentation layer (Components).
* **UI/UX:** Fully styled, responsive interface using Tailwind CSS.

## 🛠️ Technologies

* Angular 19 
* TypeScript
* Tailwind CSS
* json-server

---

## ⚙️ Running the Project

### Step 1: Install Dependencies
Open the terminal in the main project folder and install the required packages:

```bash
npm install
```

### Step 2: Run the Database
The application uses json-server as a local database (db.json file). Run it in the terminal on port 3000:

```bash
npx json-server db.json 
```

### Step 3: Run the Application
Open a second terminal window (without closing the first one) and start the Angular development server:

```bash
ng serve
```

### Open your browser and go to:
```bash
👉 http://localhost:4200
```



