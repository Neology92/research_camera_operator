# Plan researchu — operator kamery telefonicznej (mikrowarsztat)

> **Status:** wstępny zarys. NIE wykonujemy go w tej sesji — to mapa pod kolejny krok.
> **Data utworzenia:** 2026-05-28
> **Autotest praktyczny:** 2026-05-29 (jutro, ze znajomymi)
> **Warsztat docelowy:** 30 min dla studentów-amatorów z telefonami

---

## 1. Po co ten plan istnieje

Zapisać **ramy researchu**, żeby gdy ruszamy z konkretami:
- nie zboczyć w stronę kursu kinematografii
- nie utopić się w sprzęcie pro
- zachować skupienie na "amator + telefon + 30 sekund nauki na technikę"

Cel końcowy: **lokalna wiki zdeployowana na Netlify**, z której prowadzący korzysta:
1. dla siebie podczas autotestu (jutro)
2. jako spinę treści podczas warsztatu (pojutrze / w innym terminie)
3. udostępnia studentom jako follow-up

---

## 2. Filtr "trafia / odpada"

Przy KAŻDYM materiale (YT, Reddit, blog) odpowiadamy na 3 pytania:

| Pytanie | Jeśli NIE |
|---|---|
| Czy amator z telefonem zrobi to w 30 sek? | odpada |
| Czy widać natychmiast efekt na ekranie? | odpada |
| Czy mogę to pokazać ustnie + ruchem ciała? | odpada lub mocno skrócić |

---

## 3. Zakres merytoryczny

### 3.0 MVP v1 — co MUSI być gotowe przed autotestem (2026-05-29)

**Deadline jest realny: ~12-16h od teraz** (po nocy). Cała sekcja 3A to v2 backlog. Na MVP wybieramy **7 technik** dających najszybciej widoczny kontrast w autoteście:

1. **Straszne** — low angle + dutch tilt + powolny push-in
2. **Bohaterskie** — low angle na twarz, ruch w przód (kontrast do "umniejszające" pokażemy ustnie, bez osobnej karty)
3. **Wciągające / napięcie** — powolny push-in chodem, długie ujęcie bez cięcia
4. **Stabilizacja** — ninja walk + chwyt oburącz (jedna karta z dwoma technikami)
5. **Reveal zza obiektu** — passing wipe jako "cięcie"
6. **Whip pan jako tranzycja**
7. **Ustawienia telefonu (minimum)** — lock AE/AF + wybór fps + wybór obiektywu

Reszta technik z sekcji 3A → `v2_backlog.md` na po autoteście.

**Reguła decyzyjna:** jeśli któryś krok researchu / budowy przekroczy budżet czasu — wycinamy z MVP, nie wydłużamy.

### 3A. Pełna mapa sekcji (v2 — po autoteście)

Każda sekcja = **maks. 3-5 technik**, każda technika = **1 video YT + 1 opis ruchu + kiedy używać**.

1. **Emocje przez kadr i kąt**
   - Straszne (low angle, dutch tilt, zasłonięcie kadru)
   - Wciągające / napięcie (powolny push-in, długie ujęcie, śledzenie zza pleców)
   - Rozluźniające (statyka, szeroki kadr, eye-level)
   - Wesołe / energetyczne (whip pany, dynamiczny walk)
   - Bohaterskie (low angle na twarz, ruch w przód)
   - Umniejszające (high angle z góry)
   - Podkreślające (push-in, rack focus, izolacja w kadrze)

2. **Ciało jako gimbal** (stabilizacja bez sprzętu)
   - Ninja walk (ugięte kolana)
   - Chwyt oburącz + łokcie przy klatce
   - Dociśnięcie telefonu do ciała / podbródka
   - Oddech vs ujęcie
   - Selfie stick / monopod jako dźwignia

3. **Ruchy kamery dla one-shotów**
   - Reveal zza obiektu
   - Whip pan jako tranzycja
   - Szybki ruch + pauza
   - Tracking (z bohaterem, wokół niego)
   - Push-in / pull-out chodem

4. **Cięcia w jednym ujęciu (iteracyjne)**
   - Passing wipe (zasłonięcie kadru jako cut)
   - Whip pan jako cut
   - Obrócenie telefonu jako reset kadru

5. **Ustawienia telefonu — minimum** (1 strona, nie więcej)
   - Lock AE/AF
   - 24 / 30 / 60 fps — kiedy które
   - Główny vs ultraszeroki obiektyw
   - Stabilizacja softwarowa — kiedy włączyć, kiedy nie

### 3B. Co NIE wchodzi

- Gimbale, drony, mikrofony lavalierowe, monitory zewnętrzne
- Color grading, LUT-y, deep dive w post-prod
- 180° rule jako wykład, kontinuita, blocking jako teoria
- Trendy edytorskie (CapCut transitions itp.) jeśli nie da się zrobić w kamerze
- Hacki działające tylko na jednej generacji iPhone'a / jednego modelu Samsunga
- Filmicpro deep dive — focus na natywnej kamerze + jednej darmowej alternatywie max

---

## 4. Metoda researchu (do wykonania w kolejnym kroku)

### Strategia modeli i agentów (KRYTYCZNE — chroni kontekst i koszty)

**Reguła nadrzędna:** główny model (Opus 4.7) **NIE** wykonuje zbierania surowych danych. Robią to subagenty na tańszych modelach. Do orkiestratora wraca tylko **przefiltrowany wynik**, nie surowiec.

| Faza | Model / agent | Co robi | Co WRACA do orkiestratora |
|---|---|---|---|
| Bulk-collect YT (per kanał / per technika) | **Haiku 4.5** subagenty typu `general-purpose` (NIE `Explore` — ten jest do kodu w repo), uruchamiane **równolegle** | WebSearch + WebFetch, przegląd kanałów, zbiera kandydatów na video | `tytuł \| URL \| zakres timestampu \| 1 zdanie "dlaczego trafia"` — max 5 kandydatów na technikę |
| Bulk-collect Reddit (per subreddit) | **Haiku 4.5** subagenty `general-purpose` równolegle, z fallbackiem na skill `meta-searching` przy 403/429 | Szuka wątków, czyta top komentarze | `URL wątku \| 1-linijkowy take-away` — max 3 wątki na sekcję |
| Filtrowanie / wybór "the one" video na technikę | **Sonnet 4.6** subagent | Dostaje listę 5 kandydatów → wybiera 1 z uzasadnieniem | `wybrany URL \| 2 zdania uzasadnienia` |
| Pisanie kart technik wg szablonu (sekcja 5) | **Sonnet 4.6** w batchach | Generuje gotową kartę MDX dla wielu technik naraz | pliki `.mdx`, nie tekst w czacie |
| Decyzje architektoniczne (stack, struktura repo, deploy) | **Opus 4.7** (główny) | — | — |
| Code review wygenerowanej wiki | **Sonnet 4.6** subagent | Review pod kątem CWV i czytelności | lista poprawek priorytetyzowanych |

**Reguły dyscypliny kontekstu (wpisane w prompty subagentów):**
1. *"Zwróć WYŁĄCZNIE: pola wymienione w schemacie. Nie wklejaj transkryptów, treści wątków ani HTML-a."*
2. *"Jeśli kandydat nie spełnia filtra z sekcji 2 — odrzuć cicho, nie raportuj."*
3. *"Max N kandydatów. Po przekroczeniu — przytnij do najlepszych."*
4. Każdy subagent dostaje **wycinek planu**, który go dotyczy — nie całość.

**Równoległość:**
- Dispatch: 1 wiadomość → wiele wywołań `Agent` w jednym bloku tool-callów (per kategoria techniki, per subreddit).
- Limit jednoczesny: ~5-6 subagentów żeby nie wysycić rate limitów.

**Kiedy eskalujemy do droższego modelu:**
- Haiku zwrócił sprzeczne wyniki → Sonnet reconciles.
- Sonnet ma niską pewność co do wyboru → Opus rozstrzyga (rzadko).
- Decyzja ma długi blast radius (stack, deploy, struktura URL) → Opus od razu.

**Czego NIE robimy:**
- ❌ Główny model nie odpala `WebFetch` na pełne strony YT/Reddit.
- ❌ Nie wlewamy transkryptów video do kontekstu orkiestratora.
- ❌ Nie używamy Opusa do streszczania pojedynczych wątków Reddita.
- ❌ Nie odpalamy subagentów sekwencyjnie, gdy są niezależne.

---

### Krok 1 — YouTube (główne źródło)
Kanały do przeszukania pod kątem **konkretnych shotów na telefon**:
- Daniel Schiffer
- Brandon Li
- Matti Haapoja
- Peter McKinnon (zwłaszcza wczesne, sprzętowo-lekkie odcinki)
- Tom Antos
- Parker Walbeck
- Mango Street (krótkie, konkretne)
- *(do uzupełnienia w trakcie researchu)*

Dla każdej techniki z sekcji 3A → znaleźć **1 video (max 5 min) pokazujące ruch + efekt**.

### Krok 2 — Reddit (drugorzędne źródło, kontekst i pytania amatorów)
- r/Filmmakers
- r/videography
- r/iPhoneography
- r/cinematography (selektywnie — często zbyt zaawansowane)
- r/AskFilmmakers

Szukamy wątków typu *"how do I make X look scary on phone"*, *"cheap stabilization tricks"* — głównie po to, by uchwycić **język amatorów** i ich typowe blokery.

**Uwaga obowiązkowa w prompcie każdego subagenta Reddit:**
> *"Reddit często zwraca 403/429 przy WebFetch. Jeśli URL wątku jest zablokowany — użyj skilla `meta-searching` lub pomiń wątek i przejdź dalej. Nie retry'uj. Nie marnuj cykli."*

### Krok 3 — Walidacja zwięzłością
Po zebraniu materiału: każdy temat **musi zmieścić się w 60 sekundach mówienia**. Jeśli nie — skracamy lub wycinamy.

---

## 5. Plan budowy wiki (techniczne — do dopracowania)

### Stack (opcje do wyboru w kolejnym kroku)
- **Astro** + Markdown + Netlify — najlżejszy, najszybciej deployable, MDX dla embedów YT
- **Next.js (App Router)** — jeśli chcemy więcej interaktywności (np. checklistę "co zrobione")
- **Eleventy** — najprostszy SSG, jeśli treść w pełni statyczna

Domyślna rekomendacja: **Astro + MDX**. Powody:
- Wbudowany lazy-load dla obrazów / iframe
- Markdown jako podstawowy format → łatwo dopisywać treść
- Zero-JS by default → super CWV na telefonie prowadzącego

### Struktura stron
```
/                       → strona główna z mapą sekcji
/emocje                 → wszystkie efekty emocjonalne
/emocje/straszne
/emocje/napiecie
/emocje/...
/stabilizacja           → ciało jako gimbal
/ruchy                  → one-shoty
/ciecia                 → tranzycje w kadrze
/ustawienia             → minimum dot. telefonu
/checklista             → zwięzła lista do otwarcia na warsztacie
```

### Komponent na technikę (powtarzalny szablon)
- **Tytuł** (po polsku)
- **Kiedy używać** (1 zdanie)
- **Jak zrobić ciałem + telefonem** (3-5 punktów)
- **Embed YT** (1 video, lazy-load)
- **Link Reddit** (opcjonalnie, 1)
- **Częsty błąd** (1 punkt)

### Deploy
- Repo lokalne + push na GitHub
- Netlify połączone z repo → auto deploy na każdy push
- Domena: subdomena `.netlify.app` wystarczy (bez kupowania domeny)

---

## 6. Co robimy DALEJ (decyzje na kolejną sesję)

- [ ] Zatwierdzić listę sekcji 3A — czy któraś za szeroka / za wąska?
- [ ] Wybrać stack (Astro / Next / Eleventy)
- [ ] Wykonać research YT — zebrać 1 video na technikę
- [ ] Wykonać research Reddit — wybrać 2-3 wartościowe wątki na sekcję
- [ ] Zainicjalizować projekt + repo + Netlify
- [ ] Spisać treść techniki po technice według szablonu z sekcji 5
- [ ] Test mobilny (otworzyć na telefonie — czy embedy się ładują, czy nawigacja działa kciukiem)

---

## 7. Świadomie odłożone

- Nagrywanie własnych przykładów video (po autoteście, jeśli wyjdą dobre — to potencjalnie najlepszy content, ale to faza 2)
- Tłumaczenia na angielski
- Tryb dark mode
- Wyszukiwarka po wiki
- Analytics
