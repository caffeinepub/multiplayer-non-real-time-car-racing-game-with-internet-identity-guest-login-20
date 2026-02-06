# Specification

## Summary
**Goal:** Build a luxury-themed, non-real-time multiplayer car racing game with Internet Identity or guest login, a 20-car garage, missions/leveling, and a simulated diamond top-up economy.

**Planned changes:**
- Add auth entry flow with two options: “Sign in with Internet Identity” (using existing template hook/actor patterns) or “Continue as Guest” (local-only guest session).
- Implement a single-actor backend profile system storing display name (optional), level/XP/progress, gold/diamonds, owned cars, selected car, and basic stats for missions/races; persist per principal or guest identifier.
- Build a garage with exactly 20 luxury-themed cars, each with name, rarity/tier, base stats, unlock requirement (free/gold/diamonds), and owned/locked state; support selecting and unlocking cars with currency deductions.
- Implement non-real-time multiplayer racing via lobbies (create/join with code or list), readiness, start with 2+ players, turn/phase submissions, frontend polling, and deterministic race resolution with persisted results.
- Add missions and progression: list missions with progress/completion, award gold on completion, and increase level/XP from races and missions with persistence.
- Add economy rules and UI for currencies: gold earned via missions/races; diamonds only obtained via top-up (no gameplay diamond rewards).
- Create a simulated top-up flow with at least 3 diamond packs (display-only prices), immediate diamond crediting, and backend purchase history/audit entries.
- Apply a consistent luxury racing visual theme across all screens, avoiding blue/purple as primary colors, and ensure responsive mobile/desktop layout.
- Add and reference generated static assets (logo, currency icons, car card/silhouette images, racing background) from `frontend/public/assets/generated`.

**User-visible outcome:** Users can sign in with Internet Identity or play as a guest, manage a 20-car luxury garage (unlock/select cars using gold or diamonds), complete missions to earn gold and level up, create/join turn-based race lobbies with other players and submit turns via polling, and top up diamonds through a simulated purchase screen to unlock premium cars—all within a cohesive luxury racing UI.
