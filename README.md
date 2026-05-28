# Operator kamery — research pod mikrowarsztat

Wiki z 7 technikami nagrywania telefonem na 30-minutowy mikrowarsztat dla studentów-amatorów.

**Live:** https://research-camera-operator-wiki.netlify.app
**Repo:** https://github.com/Neology92/research_camera_operator

## Co tu jest

- `wiki/` — gotowy static site (HTML + CSS + JS, bez buildu)
- `research_plan.md` — plan researchu + strategia modeli + scope
- pamięć projektu: `~/.claude/projects/B--Dev-research-camera-operator/memory/`

## Deploy

Projekt jest już zdeployowany. Kolejne deploye:

```powershell
netlify deploy --prod --dir=wiki --message "opis zmiany"
```

Lokalny site link siedzi w `.netlify/` (gitignored, project ID: c020ad1e-f207-4f44-9fa1-26542cd9707f).

### Opcjonalnie: auto-deploy z GitHuba
W Netlify UI → Site settings → Build & deploy → Continuous deployment → Link repository → wybierz `Neology92/research_camera_operator`, publish dir `wiki`. Wtedy każdy `git push` triggeruje deploy.

## Lokalny podgląd

Najprościej dwukliknąć `wiki/index.html` w eksploratorze.
Lub serwer:
```powershell
cd wiki
python -m http.server 8000
# → http://localhost:8000
```
