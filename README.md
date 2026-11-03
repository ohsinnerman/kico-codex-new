# KiCo — India’s Kitaab Copy

A plain static website for KiCo’s Digital Marketing Mastery Program, a live online 12-week course. The page presents the supplied course content, a proposed 29-module syllabus, a start-date planner, an accessible enquiry form that hands off to WhatsApp, four rewritten legal pages and a custom 404 page. It uses HTML, one CSS file and vanilla JavaScript; there is no build step or backend.

## Pages and files

| Page or feature | File |
| --- | --- |
| Course landing page | `index.html` |
| Privacy policy | `privacy-policy.html` |
| Terms and conditions | `terms-conditions.html` |
| Disclaimer | `disclaimer.html` |
| Comment policy | `comment-policy.html` |
| Not found page | `404.html` |
| Design tokens and component rules | `DESIGN.md` |
| Styles | `assets/css/site.css` |
| Planner, accordion, FAQ, form, motion and header behaviour | `assets/js/site.js` |
| Local liquid-glass-js fork and MIT licence | `assets/js/glass/container.js`, `assets/js/glass/button.js`, `assets/js/glass/LICENSE` |
| Local html2canvas copy and MIT licence | `assets/js/glass/html2canvas.min.js`, `assets/js/glass/HTML2CANVAS-LICENSE` |
| Local font fallbacks and licences | `assets/fonts/` |
| Social share artwork | `assets/images/og.png` |

## Working features

- The date planner defaults to the next Monday, prevents a date before today, calculates the Friday finish date in week 12 and adds real dates to each syllabus stage. It copies the selected date to the enquiry form unless the visitor edits that field.
- The five accordion panels contain all 29 module names and descriptions. One stage can be open at a time. The seven FAQs work the same way, with the first answer open on load.
- The enquiry form validates name, Indian mobile number, email and consent, marks invalid fields and focuses the first error. A valid submission opens a prefilled `wa.me` message; a mailto link is available if the browser blocks the new tab.
- The enquiry form stores nothing on this static site. The visitor reviews and sends the message in WhatsApp or their email app.
- The hero facts use the local liquid-glass-js WebGL library when supported. A labelled HTML list stays available to assistive technology and becomes the visible fallback when WebGL or html2canvas fails.
- The hero practice samples crossfade slowly. The crossfade pauses while the tab is hidden and is disabled for reduced motion. Section entrances are also disabled for reduced motion.
- Header, links, buttons, accordions and form controls have keyboard focus and interaction states. The page has a skip link and responsive layouts.
- Enrolment links point to the supplied WhatsApp short link. Phone, email and the Mainspring India offline-campaign link are active.

## Design approach

The direction dealt by taste-skill was **“The page is the object”**, seed **367628137**, with the workbook idea: “On this page, KiCo’s ‘Kitaab Copy’ becomes the learner’s campaign workbook.” The design uses the dealt Rokkitt/Literata type pairing and tobacco/olive palette. It redraws the FAQ as a tabbed index and contact as a clip-out enquiry coupon because the dealt versions required photographs that KiCo has not supplied. The original direction’s generic “Field and farm” atmosphere is replaced by honest, code-drawn campaign fragments in line with the brief.

The three requested repositories were used as follows:

- **taste-skill:** read its full workflow and relevant writing, type, colour, layout, imagery, motion and critique references; dealt a direction; the linter finished with 0 failures and 0 warnings. The browser inspector was attempted at the requested widths, but local Chrome crashed before rendering, so screenshot-based visual critique remains to be done in an environment where the inspector can start. The specified WebGL glass is an explicit exception to its no-glass rule and is marked in the CSS.
- **awesome-design-md:** used its DESIGN.md structure as a model for named colour roles, type steps, spacing, shape and component rules. No source brand’s identity was copied. See `DESIGN.md`.
- **liquid-glass-js:** vendored the MIT-licensed library and html2canvas locally. The library was patched to snapshot the short hero section, account for the snapshot target in shader positioning, remove console noise and the default canvas shadow, and add a visible fallback class when WebGL or capture fails.

The fictional business **Nila Home Goods** and its sample impressions, clicks, visits, basket activity, social engagement and email figures are design examples only. Replace them with approved client material or remove them before launch. No student counts, reviews, testimonials, placement rates or KiCo performance figures are claimed.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a browser. The site needs no package installation or compilation.

## Deploy on GitHub Pages

After launch approval, open **Settings → Pages → Build and deployment → Deploy from a branch**, select **main** and **/(root)**, and save. The custom 404 page recognises the GitHub Pages project path for this repository. To use `kicoedtech.xyz`, add the domain in the same Pages settings and configure the DNS records GitHub specifies for the domain. Do not enable Pages until the client’s outstanding details and legal copy have been reviewed.

## Credits and licences

- [liquid-glass-js](https://github.com/dashersw/liquid-glass-js), by Armagan Amcalar, MIT. The required notice is in `assets/js/glass/LICENSE`; local modifications are described above.
- [html2canvas](https://github.com/niklasvh/html2canvas) 1.4.1, MIT. See `assets/js/glass/HTML2CANVAS-LICENSE`.
- [Rokkitt](https://fonts.google.com/specimen/Rokkitt) and [Literata](https://fonts.google.com/specimen/Literata) load from Google Fonts. Local Fontsource fallback files are included under the fonts’ SIL Open Font Licences in `assets/fonts/`.
- The KiCo logo is typeset as text. Interface fragments are drawn in HTML/CSS and do not use stock people or claim to depict real KiCo learners.

## Confirm with the client before launch

- Fees are not published; confirm current fees, offers and instalment terms.
- The old home page lists **06, DDA Staff QTR, Ber Sarai, New Delhi 110016**; the old contact page lists **G-10, Pocket-7, Dwarka Sector 12, New Delhi**. Confirm the current address and whether both should remain. The new page labels both source addresses instead of choosing one.
- The old Facebook, X and Instagram URLs were `#` placeholders. No social links are shipped; provide current profiles if they should be shown.
- No KiCo session photos or founder photo were supplied. Approved photos could replace or supplement the drawn interface examples.
- The interface visuals use a fictional sample business and invented figures. Replace them with client-approved examples or remove them.
- Confirm the proposed 12-week order of the 29 modules.
- Review the rewritten privacy, terms, disclaimer and comment policy text.
- The social-share `assets/images/og.png` is a designed placeholder and can be replaced with an approved brand image.
