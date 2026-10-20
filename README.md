# Mahmoud & Sara — Engagement Invitation

Responsive static invitation with a dark charcoal/brown-and-gold theme, an **Open Invitation** entry gate, the poster image, countdown, Google Maps link, RSVP via WhatsApp, and an online wishes guestbook designed to save messages into Google Sheets (not WhatsApp).

## Files to upload to the root of your GitHub repository

- `index.html`
- `styles.css`
- `script.js`
- `config.js`
- `music.mp3` — the latest audio file provided for the invitation
- `invitation-poster.png`
- `og-image.jpg` — the social-sharing preview image

`google-apps-script.gs` is the backend code for the online wishes form. It is not a file the browser uses directly; paste its contents into Google Apps Script as explained below.

## One-time setup: collect wishes in a Google Sheet

1. Create a new Google Sheet in the Google account where you want to receive the guests' messages.
2. In that Sheet, open **Extensions → Apps Script**.
3. Replace the starter code with the full contents of `google-apps-script.gs`, then Save.
4. Click **Deploy → New deployment**. Choose **Web app** as the type.
5. Set **Execute as** to **Me** and **Who has access** to **Anyone**, then Deploy and authorize the requested permissions.
6. Copy the Web app URL ending in `/exec`.
7. The `config.js` in this package already contains the Web app URL supplied for this site. If you create a new Apps Script deployment later, replace `wishesEndpoint` with the new `/exec` URL.
8. Upload the website files from this ZIP to the root of the GitHub repository, replacing the matching old files, and commit. Vercel should redeploy if it is already linked to the repository.
9. Test by submitting a sample wish on the live website and check the `Wishes` tab in your Google Sheet.

The Google Sheet belongs to your Google account and is not displayed to guests. The public form endpoint is intended to allow website visitors to submit a name and message; do not store sensitive information in it. The included hidden field is only a basic anti-spam measure.

## Music

The page attempts to start `music.mp3` when a guest taps **Open Invitation**. The track loops. Browsers may block audio until a deliberate tap; that button tap is the intended start gesture. The floating Music button lets the guest pause or resume playback.

## RSVP and wishes

- RSVP accept/decline buttons still open WhatsApp with a prefilled message.
- Wishes are no longer routed to WhatsApp. They are saved to the Google Sheet only after the Apps Script endpoint is configured in `config.js`.
- Until `wishesEndpoint` is set to the deployed `/exec` URL, the website will show a setup message and will not claim that wishes have been sent.

## Event details

Friday, 23 October 2026 at 5:00 PM Cairo time — Valentine Yacht Elmanial. Edit the details in `config.js` if necessary.
