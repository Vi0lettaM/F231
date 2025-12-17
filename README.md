# Travel Agency App

## Opis projektu

Aplikacja webowa do zarządzania podróżami.
Pozwala dodawać, edytować, usuwać oraz przeglądać podróże. Projekt stworzony w Node.js z użyciem Express, MongoDB i EJS.

---

## Funkcjonalności

* Wyświetlanie listy wszystkich podróży
* Filtrowanie podróży po kontynencie i statusie
* Sortowanie podróży po tytule i dacie (rosnąco / malejąco, możliwość dwóch pól sortowania)
* Dodawanie nowych podróży
* Edycja istniejących podróży
* Usuwanie podróży
* Podgląd szczegółów podróży
* Strona „O aplikacji”

---

## Technologie

* Node.js
* Express
* MongoDB
* EJS
* HTML, CSS

---

## Instrukcja instalacji i uruchomienia

### 1. Uruchom Docker Desktop

1. Otwórz Docker Desktop
2. Otwórz terminal (ikonka >_ w prawym dolnym rogu)
3. Uruchom MongoDB:

```bash
docker run --name mongo -p 27017:27017 -d mongo:6.0
```

> Jeśli kontener już istnieje i jest zatrzymany, użyj:

```bash
docker start mongo
```

---

### 2. Połącz się z MongoDB Compass

1. Otwórz MongoDB Compass
2. Naciśnij `+` przy „Connections”
3. Wpisz:

```
mongodb://localhost:27017
```

4. Naciśnij `Save & Connect`

---

### 3. Instalacja aplikacji Node.js

1. Otwórz terminal w folderze projektu
2. Zainicjalizuj npm:

```bash
npm init -y
```

3. Zainstaluj zależności:

```bash
npm install express ejs mongodb
```

---

### 4. Uruchomienie aplikacji

```bash
npm start
```

Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

---

## Lista endpointów

| Metoda | Endpoint       | Opis                                                            |
| ------ | -------------- | --------------------------------------------------------------- |
| GET    | `/`            | Wyświetla listę wszystkich podróży z filtrowaniem i sortowaniem |
| GET    | `/add`         | Formularz dodawania nowej podróży                               |
| POST   | `/add`         | Dodaje nową podróż do bazy danych                               |
| GET    | `/edit/:id`    | Formularz edycji podróży o danym ID                             |
| POST   | `/edit/:id`    | Aktualizuje podróż o danym ID                                   |
| POST   | `/delete/:id`  | Usuwa podróż o danym ID                                         |
| GET    | `/details/:id` | Wyświetla szczegóły podróży o danym ID                          |
| GET    | `/about`       | Wyświetla stronę „O aplikacji”                                  |

---

## Licencja

Projekt udostępniony na licencji MIT.  
Zobacz plik [LICENSE](LICENSE) dla szczegółów.

Copyright (c) 2025 Violetta Mykyta

---

## Autor

Violetta Mykyta