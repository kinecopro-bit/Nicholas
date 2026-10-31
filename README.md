# Nick Kokat — Portfolio

Personal portfolio site for job hunting. Dark, editorial design (near-black, warm amber accent, Fraunces + Inter) with a bento-grid "Selected results" section, built as a fast static site and hosted on Firebase.

**Live project:** Firebase project `nicholas-kokat`

## Structure

| Path | Purpose |
| --- | --- |
| `public/` | **The website.** Only this folder is deployed to Firebase Hosting. |
| `public/index.html` | Page content (hero, results, experience, work, TEDx, toolkit, contact) |
| `public/css/styles.css` | Design system and layout (colour tokens live in `:root`) |
| `public/js/main.js` | Scroll reveals, count-up metrics, nav, TEDx list rendering |
| `public/js/firebase.js` | Firebase init + Analytics (loaded separately so ad-blockers can't break the page) |
| `public/js/talks.js` | Data for the TEDx talks featured on ted.com |
| `public/assets/` | Résumé PDF, headshots, and web-sized work-sample images |
| `Headshot/`, `MicroSites/`, `Powerpoints/`, `Print Media/`, `RFP_s/`, `Website Linkes for Portfolio.docx` | Original source material. **Not deployed.** |
| `firebase.json`, `.firebaserc` | Firebase Hosting config (public dir, cache and security headers) |

## Confidential content

The brokerage RFP in `RFP_s/` is confidential. It is **not** copied into `public/`. The site shows only a heavily blurred, redacted cover image (`public/assets/img/work/rfp-redacted.jpg`) with no readable text or client name. If you add more sensitive work, follow the same approach and never place the original in `public/`.

## Run locally

```bash
python3 -m http.server 8000 -d public
```

Then open http://localhost:8000.

## Deploy

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

The Firebase web config in `public/js/firebase.js` is a public identifier, not a secret. Protect the project with Firestore/Storage rules and by restricting the API key to your domains in Google Cloud Console.

## Updating content

- **Metrics / copy:** edit `public/index.html`.
- **Colours / fonts:** edit the tokens at the top of `public/css/styles.css`.
- **Résumé:** replace `public/assets/Nick-Kokat-Resume.pdf` (keep the filename).
- **TEDx talks:** edit `public/js/talks.js`.

## TEDx talks published on ted.com

About 50,000 TEDx talks are delivered globally each year and only about 45 are hand-selected for ted.com. Over three years, 22 of the talks I helped produce were featured. The full list is rendered on the site from `public/js/talks.js`.
