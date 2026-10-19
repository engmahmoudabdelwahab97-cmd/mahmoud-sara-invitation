# Mahmoud & Sara — Engagement Invitation

Responsive static invitation website in a classic ivory-and-gold style.

## Event details
- Couple: Mahmoud & Sara
- Date: Friday, 23 October 2026
- Time: 5:00 PM Cairo time (UTC+03:00)
- Venue: Valentine Yacht Elmanial, El Manial, Cairo, Egypt
- Map: the exact Google Maps share link supplied for this invitation is set in `config.js`
- RSVP and wishes: opens WhatsApp with a pre-filled message to `201097197582`

## Included assets
- `invitation-poster.png`: the image supplied for the invitation
- `music.mp3`: the supplied music file; click the Music button on the website to start playback

Keep all seven files in the repository root. Do not upload only the ZIP: extract it and upload the individual files.

## Important notes
- Browsers usually require visitors to tap the music button before audio can play.
- RSVP and wishes open WhatsApp with a pre-filled message. They do not automatically store submissions in a website database.
- Confirm that you have permission to publish the supplied audio file publicly before deploying the website.

## Preview locally
Open `index.html` in a browser. Or run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Publish on Vercel
1. Create a GitHub repository and upload all files from this project, including `invitation-poster.png` and `music.mp3`.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Choose the **Other** framework preset if prompted; no build command is required for this static site.
5. Click **Deploy** and use the generated `.vercel.app` URL.
