# Operator kamery — research pod mikrowarsztat

Wiki z 7 technikami nagrywania telefonem na 30-minutowy mikrowarsztat dla studentów-amatorów.

## Co tu jest

- `wiki/` — gotowy static site (HTML + CSS + JS, bez buildu)
- `research_plan.md` — plan researchu + strategia modeli + scope
- pamięć projektu: `~/.claude/projects/B--Dev-research-camera-operator/memory/`

## Deploy na Netlify — 3 ścieżki

### A. Najszybsze: Netlify Drop (zero auth, ~30 sek)
1. Otwórz https://app.netlify.com/drop
2. Przeciągnij **cały folder `wiki/`** na pole
3. Dostajesz URL w stylu `https://niebieski-kruk-1234.netlify.app`

### B. Netlify CLI (jeśli zainstalowane)
```powershell
cd wiki
netlify deploy --prod --dir=.
```

### C. Przez GitHub
1. `git init && git add . && git commit -m "init wiki"`
2. Stwórz repo: `gh repo create research_camera_operator --public --source=. --push`
3. Netlify → New site → import z GitHub → wybierz repo → publish dir `wiki`

## Lokalny podgląd

Najprościej dwukliknąć `wiki/index.html` w eksploratorze.
Lub serwer:
```powershell
cd wiki
python -m http.server 8000
# → http://localhost:8000
```
