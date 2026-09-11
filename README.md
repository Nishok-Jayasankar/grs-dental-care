# GRS Dental Care — website

Static site. Five pages, no build step, no server. Open `index.html` in a browser to preview.

```
index.html          Home
services.html       What we treat
about.html          About the clinic
contact.html        Contact, hours, map
appointment.html    Booking form
styles.css          All styling (colours defined at the top)
site.js             Menu, form handling
assets/             Logo, favicons, clinic photos
robots.txt          Search engine rules
sitemap.xml         Page list for search engines
```

---

## Before this goes live — placeholders to replace

Search for these across the files:

| What | Where | Notes |
|---|---|---|
| `Dr [Full Name], BDS` | `about.html` | Dentist name, qualification, bio, council registration number. The bio is the most-read paragraph on any clinic site. |
| `[Add the nearest landmark...]` | `contact.html` | The landmark people actually use for directions. |
| `hello@example.com` | `contact.html`, footer | Real email, or delete the row if there isn't one. |
| Opening hours | `contact.html` | I've put plausible hours in. Check every row. |
| `https://example.com` | all files (meta tags, `sitemap.xml`, `robots.txt`) | Replace with the real domain once bought. |

Also verify: the address is written as **No. 7, Ponniamman Kovil 1st Street, Sholinganallur, Chennai 600119** — confirm the street name is right, since it appears in the map embed and the search-engine data.

---

## Colours and type

Everything lives in the `:root` block at the top of `styles.css`.

```
--ink        #16242E    logo navy — all headings and body text
--leaf       #7FC646    logo green — buttons and accents only
--leaf-deep  #46791F    darker green for green text on light backgrounds
--paper      #F4F7F0    page background
--slate      #5C6C74    secondary text
```

Type is Gabarito (headings, buttons) and Source Serif 4 (paragraphs), both loaded from Google Fonts.

---

## The booking form

Right now the form opens WhatsApp with the request pre-typed. That works immediately with zero setup and is usually the highest-response option for a local clinic.

To get requests by email instead:

1. Sign up free at [web3forms.com](https://web3forms.com) or [formspree.io](https://formspree.io).
2. Open `site.js` and paste the URL they give you into `FORM_ENDPOINT`.

The WhatsApp button stays as a fallback either way. If the email endpoint fails, the form tells the visitor to call instead.

---

## Deploying

Free, and fast enough that you'll never think about it again.

**Cloudflare Pages** (recommended — same place as the domain)
1. Sign in at dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets.
2. Drag this whole folder in.
3. Custom domains → add the domain. DNS is set up automatically if the domain is with Cloudflare.

**Netlify** (easiest)
1. Sign in at app.netlify.com → Sites → drag this folder onto the page.
2. Domain settings → Add custom domain → follow the DNS instructions shown.

HTTPS is issued automatically on both. To update the site later, drag the folder in again.

---

## Before launch

- Create a Google Business Profile for the clinic. For a local dental practice this brings in more patients than the website itself — the website's job is to look credible once someone finds you there.
- Replace the clinic photo with 4–6 better ones if you can: the waiting area, the reception, the dentist at work, the street entrance. Shoot in daylight with the room tidy. Good photos are the single biggest upgrade available here.
- Add the domain to Google Search Console and submit `sitemap.xml`.
