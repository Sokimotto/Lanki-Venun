# Lanki Venun — Fruit Hook

A standalone HTML5 arcade PWA. Hook fruit **from the bottom upward**, score points, earn gameplay gold, and beat the timer.

## Publish to GitHub Pages
1. Create a new public GitHub repository.
2. Upload all files in this folder to the repository root (not the ZIP itself).
3. Open **Settings → Pages → Deploy from a branch → main / (root)** and save.
4. Wait for the HTTPS GitHub Pages URL. Test gameplay, offline mode and installability.
5. Enter the HTTPS URL in PWABuilder and create the Microsoft Store Windows package.

## Microsoft Store IAP: important limitation
The shop contains five configurable products with **placeholder product identifiers**:
- `LANKI_GOLD_1` — $1 — 100 gold
- `LANKI_GOLD_5` — $5 — 550 gold
- `LANKI_GOLD_10` — $10 — 1,200 gold
- `LANKI_GOLD_15` — $15 — 1,900 gold
- `LANKI_GOLD_20` — $20 — 2,700 gold

**These are NOT working Microsoft Store checkouts yet.** GitHub Pages cannot directly invoke `Windows.Services.Store.StoreContext`. Merely adding add-ons to Partner Center does not wire up the buttons. A compatible, trusted Windows native bridge and Microsoft Store product mapping must be implemented and tested in the actual signed Store package. PWABuilder packaging alone does not supply this bridge.

The browser shop intentionally shows a truthful 'checkout not connected' message. `store.js` defines an integration boundary (`window.LankiStoreBridge.purchase`) for later native integration; it is NOT a native bridge implementation. Do not fake successful purchases.

For consumable gold packs, implement purchase/fulfillment with verified Store transactions, durable server-side idempotency and refund handling. Grant the advertised gold **once** after successful verified fulfillment. Gold earned by playing is currently stored locally for demonstration and is NOT a secure purchased-currency ledger. Do not launch paid add-ons until the native checkout, receipt verification and fulfillment are working on a second test device.

## Files
- `index.html`, `style.css`, `game.js` — game
- `store.js` — shop UI configuration and checkout interface
- `manifest.webmanifest`, `sw.js`, icons — PWA support

## Privacy
The game stores gameplay gold locally in your browser. It has no analytics, ads or backend in this build. A future IAP integration may require a separate privacy policy update.
