# Mahmoud & Sara — Engagement Invitation

A responsive, static engagement invitation website in an ivory-and-gold classic style.

## Customized details
- Couple: Mahmoud & Sara
- Date: Friday, 23 October 2026
- Time: 5:00 PM (visitor's local timezone)
- Venue label: Valentine Yacht Elmanial
- RSVP and wishes: opens WhatsApp to `201097197582` with a pre-filled message

## Before publishing
1. **Confirm the exact venue pin.** The included map link searches for “Valentine Yacht Elmanial”. Replace `mapUrl` in `config.js` with the exact Google Maps share URL if you have it.
2. **Add music.** Place a legally usable MP3 file at `assets/music.mp3`. Browsers generally require the visitor to tap the music button before playback.
3. **Replace the gallery sample photos** with your own pictures if desired. Edit the `.photo-one`, `.photo-two`, and `.photo-three` background-image URLs in `styles.css`.
4. Review the invitation wording and test it on a phone before sharing.

## RSVP and wishes note
RSVP and wishes open WhatsApp with a pre-filled message; they do not automatically save submissions to a website database. To collect responses in a spreadsheet or admin dashboard, connect a form/database service before publishing.

## Preview locally
Open `index.html` in a browser, or run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Publish on Vercel
1. Create a GitHub repository and upload all files/folders from this project.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Use the **Other** framework preset if needed. This is a static site; no build command is required.
5. Deploy and use the generated `.vercel.app` URL.

Official Vercel guide: https://vercel.com/docs/deployments/overview
