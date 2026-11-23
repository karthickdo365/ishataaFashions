# Ishtaa Fashions

Premium saree boutique for Ishtaa Fashions, Coimbatore. The catalogue, prices and photography are taken from the public site at [ishtaafashions.com](https://ishtaafashions.com/). Prices are shown only where that site published them. Silk photographs without a printed rate stay “price on request”.

There is no payment gateway and no database. Wishlist, enquiry bag and newsletter emails stay in the browser. Enquiries continue on WhatsApp `8610775593`.

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

No environment variables are required. Do not add payment or mailbox secrets until the boutique provides them.

## What still needs the client

- A public email, if the contact form should stop handing off to WhatsApp
- Facebook and YouTube URLs (the live site shows the icons with empty links)
- A silk-cotton catalogue, if that footer label should become a collection
- Names and prices for the silk-page photographs
- Real testimonials, if they should replace the empty notes section
- Replacement photography dropped into `public/media`
