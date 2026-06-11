# To-Do App

## 🚀 Główne funkcjonalności

* **Pełny CRUD:** Dodawanie, odczyt, edycja **inline-editing** oraz usuwanie zadań, zsynchronizowane z lokalną bazą danych za pomocą zapytań HTTP.
* **Nowoczesne zarządzanie stanem (Signals):** Wykorzystanie `toSignal` oraz `computed` do błyskawicznego, reaktywnego przeliczania wyświetlanej listy i liczników zadań.
* **Czysty Control Flow:** Zastosowanie natywnej składni `@if`, `@else` i `@for` w widokach, co zapewnia przejrzystą, imperatywną strukturę logiczną.
* **Dashboard (Angular Material):** Zbudowano panel profilu z dynamicznymi kartami statystyk i ustawieniami, bazując na gotowych komponentach Material UI.
* **Responsive Design (Mobile-First):** Wdrożono płynną typografię (`clamp()`), obsługę stanu Hamburger Menu oraz responsywną siatkę zadań przy użyciu CSS Grid (`auto-fit`), bez rzeźbienia w starych media queries.
* **Dostępność i WCAG:** Zadbano o pełne wsparcie klawiatury, etykiety aria-labels oraz odpowiednie zarządzanie fokusem i role ARIA w elementach interaktywnych.
* **Gotowość do druku (@media print):** Automatyczne ukrywanie interfejsu (nawigacja, przyciski) podczas drukowania listy do czystego PDF-a.
* **Czysta architektura:** Rozdzielenie logiki biznesowej (Serwisy), modeli danych (Interfejsy) oraz warstwy prezentacji (Komponenty).

---

## 🧠 Notatka UX (User Experience)

### 👥 Grupa docelowa i Persona użytkownika
**Grupa docelowa:** Aplikacja skierowana jest do osób potrzebujących szybkiego, bezproblemowego narzędzia do zarządzania codziennymi zadaniami – studentów, freelancerów oraz pracowników biurowych, którzy cenią minimalizm, bezbłędność i szybkość działania.

**Persona:**
* **Imię:** Karol Nowak.
* **Potrzeby:** Szybkie dodawanie zadań "w biegu", łatwe przeglądanie statusu projektów na laptopie. Nie ma czasu na naukę skomplikowanych systemów (jak Jira), potrzebuje natychmiastowego feedbacku od aplikacji.
* **Frustracje:** Powolnie ładujące się aplikacje z przeładowanym interfejsem, brak wsparcia dla urządzeń mobilnych oraz nieczytelne komunikaty o błędach.

### 🎨 Uzasadnienie kluczowych wyborów UI/UX i zasady UCD (User-Centered Design)
Zaprojektowanie aplikacji oparte zostało na podejściu **Mobile-First** oraz **User-Centered Design (UCD)**.
1. **Minimalizm informacyjny:** Interfejs jest wolny od zbędnych rozpraszaczy. Skupia się w 100% na akcjach wprowadzania i odhaczania zadań.
2. **Inline-editing:** Aby zminimalizować tarcie (friction) podczas wprowadzania zmian, użytkownik może edytować zadania bezpośrednio w miejscu ich wyświetlania, oszczędzając kliknięcia na przechodzenie do oddzielnych widoków.
3. **Płynna responsywność:** Zastosowanie techniki CSS Grid i płynnej typografii sprawia, że aplikacja adaptuje się naturalnie do każdego rozmiaru ekranu.
4. **Błyskawiczny wizualny feedback:** Każda asynchroniczna akcja (np. ładowanie danych API, zapis) wizualizowana jest z wykorzystaniem spinnerów i dynamicznych przejść (animations). Użytkownik od razu wie, że aplikacja reaguje na jego akcje.

### 📏 Odniesienie do Heurystyk Nielsena
Projekt aplikacji i jej przepływ zostały poddane analizie pod kątem 10 heurystyk Jakoba Nielsena. Kluczowe zastosowane punkty to:
* **#1 Widoczność statusu systemu:** Aplikacja używa stanów ładowania (spinner, opacity) przy akcjach wysyłanych do REST API. Jeśli użytkownik czeka na odpowiedź serwera, ekran to jasno komunikuje.
* **#2 Zgodność pomiędzy systemem a światem rzeczywistym:** Zastosowano powszechnie zrozumiałą ikonografię z Angular Material (np. kosz do usuwania, ikona ołówka do edycji).
* **#4 Spójność i standardy:** Wykorzystano jednolity system projektowy (Design System) oparty na klasach narzędziowych Tailwind CSS, co gwarantuje 100% powtarzalność i spójność wizualną (te same odcienie kolorów, wielkości czcionek, marginesy).
* **#8 Estetyka i umiar:** Zastosowanie nowoczesnego, stonowanego layoutu o odpowiednim white-space i kontraście, bez agresywnych barw. Odciąża to poznawczo użytkownika (cognitive load).

---

## 🛠️ Technologie

* **Angular 19** 
* **TypeScript**
* **Tailwind CSS**
* **Angular Material**
* **json-server** 
* **@angular/animations** 

---

## ⚙️ Uruchomienie projektu

### Krok 1: Instalacja zależności
Otwórz terminal w głównym folderze projektu i zainstaluj wymagane pakiety:

```bash
npm install
```

### Krok 2: Uruchomienie bazy danych
Aplikacja korzysta z `json-server` jako lokalnej bazy danych (plik `db.json`). Uruchom go w terminalu na porcie 3000:

```bash
npx json-server db.json 
```

### Krok 3: Uruchomienie aplikacji
Otwórz drugie okno terminala i uruchom serwer deweloperski:

```bash
ng serve
```

### Krok 4: Testowanie w przeglądarce
Otwórz przeglądarkę i przejdź pod adres:

👉 `http://localhost:4200`
