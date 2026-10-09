# UNKNOWN LINE

A small mystery-phone website built with HTML, CSS, and vanilla JavaScript. Designed to deploy on GitHub Pages.

## Run locally

Open `index.html` in a browser. Add your audio files to the `audio` folder using the filenames listed below.

## Add audio files

Place these files in `audio/`:

- `secret1.mp3`
- `secret2.mp3`
- `secret3.mp3`
- `secret4.mp3`
- `secret5.mp3`

The repository starter does not include audio recordings. Use your own MP3 files.

## Change secret codes

Edit the `secretCodes` object in `script.js`. Each entry has a code, a message, and an audio path:

```js
"1234": {
  message: "INCOMING TRANSMISSION...",
  audio: "./audio/secret1.mp3"
}
```

Keep paths relative (for example, `./audio/secret1.mp3`) so they work when deployed to a GitHub Pages project site.

## Publish with GitHub Pages

1. Create a new repository on GitHub.
2. Upload `index.html`, `style.css`, `script.js`, `README.md`, and your `audio/` files to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish. The site URL will appear in the Pages settings.

## Important note about secret codes

Codes in client-side JavaScript are discoverable by visitors who inspect the site's source. This is suitable for an ARG, puzzle, or fictional mystery, but not for real authentication or confidential content.
