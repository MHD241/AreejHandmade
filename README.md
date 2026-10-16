# Areej Handmade: website

A simple shop that needs no paid tools. Open `index.html` in a browser to see it.

## Make it yours (all in plain text files)

1. **`config.js`**: put in your real WhatsApp number and email. Without this, orders go to a placeholder.
2. **`products.js`**: change the products, prices and descriptions. Copy a block to add one, delete a block to remove one.
3. **Photos**: put a photo in the `assets` folder (for example `assets/wildflower-hoop.jpg`), then in `products.js` set `photo: "assets/wildflower-hoop.jpg"`. Until then, a stitched illustration is shown.

## How orders work

The buyer fills in their basket, name and address, then taps **Send order on WhatsApp** (or email). Their order arrives as a ready-written message. You confirm the total and delivery, and send payment details. No card payments are built in, so there are no fees.

## Putting it online for free

Any of these accept this folder as it is: Netlify Drop (drag the folder onto netlify.com/drop), Cloudflare Pages, or GitHub Pages.

## Files

- `index.html` page content
- `styles.css` colours, fonts and layout (colours are at the top)
- `app.js` basket, product pop-ups and sending orders
- `config.js`, `products.js` the files you edit
- `assets/` logo and favicon
