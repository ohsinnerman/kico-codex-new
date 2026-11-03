# KiCo course workbook — design system

This document uses the token-first structure common to DESIGN.md systems: named colour roles, a compact type scale, spacing, one paper shape rule and component behaviour. Its values come from KiCo’s “Kitaab Copy” workbook idea and the dealt “The page is the object” direction. No source brand’s identity has been copied.

## Idea

KiCo’s “Kitaab Copy” becomes the learner’s campaign workbook. The page is built from filled paper sheets, tabbed stage panels and realistic but explicitly illustrative campaign artefacts.

## Colour roles

| Token | Value | Use |
| --- | --- | --- |
| `--ground` | `#472913` | Main page field and dark close |
| `--ground-raised` | `#55321a` | A subtle step within the dark field |
| `--paper` | `#e4e0cf` | Workbook sheets and reading surfaces |
| `--paper-ink` | `#2b170a` | Text on paper |
| `--paper-muted` | `#594a34` | Secondary text on paper, still contrast-safe |
| `--ink` | `#e4e0cf` | Text on the dark field |
| `--muted` | `#c1b49b` | Secondary text on the dark field |
| `--accent` | `#525e1b` | Primary action and one supporting print accent |
| `--accent-ink` | `#ffffff` | Text on the olive action |
| `--field-ochre` | `#c79a3e` | One filled workbook sheet |
| `--field-ochre-ink` | `#2b170a` | Text on the ochre sheet |

The ground carries most of the page. Bone paper carries long reading. Olive stays scarce so the primary action remains easy to find. No gradients or resting shadows.

## Typography

The dealt system is Rokkitt for display and Literata for reading. Google Fonts supplies the preferred files; local Rokkitt and Literata files are included as fallbacks.

| Token | Range | Use |
| --- | --- | --- |
| `--step-small` | `0.8125–0.875rem` | Captions and legal notes; never below 13px |
| `--step-body` | `1.0625–1.1875rem` | Body copy and module descriptions |
| `--step-lead` | `1.25–1.625rem` | Hero support and section statements |
| `--step-head` | `2–4rem` | Section headings |
| `--step-display` | `3–9rem` | Hero title and workbook masthead |

Rokkitt uses the dealt 800 display weight with tight tracking. Literata uses 400 for reading and 600 for emphasis. Display text is balanced, left aligned and limited to two lines; body measure stays comfortable and body copy remains at least 16px.

## Space and shape

- One equal outer margin: `--page-gutter: clamp(1.25rem, 4vw, 4rem)`.
- One reading grid with a maximum width of 84rem.
- Desktop section rhythm: `--section-space: clamp(7.5rem, 12vw, 15rem)`; phone rhythm is reduced to 5rem.
- Within a component, use smaller multiples of `--unit: 0.5rem`.
- Paper sheets have square corners (`--shape-radius: 0`). The WebGL fact pill is an intentional, brief-required exception.
- No thin decorative rules, no resting shadows and no decorative gradients.

## Components

- **Header:** plain wordmark, four links, one enrolment action. On scroll only, it gains an intentional translucent refraction treatment.
- **Workbook sheet:** fully filled paper surface; its tab and clipped edge are part of the stationery shape.
- **Benefit list:** six staggered full-width printed slips, not a repeated icon-card grid.
- **Practice plate:** labelled sample interface for a fictional local business, inside a `data-ui` region.
- **Stage sheet:** button-led syllabus section with a range, a module count and one accessible panel.
- **Date planner:** labelled date input, minimum today, an announced finish date and live stage dates.
- **FAQ:** one button-led panel open at a time; first answer starts open.
- **Enquiry coupon:** labelled inputs and required consent. It opens a prefilled WhatsApp message; the static site stores no enquiry.
- **Focus:** a high-contrast, two-tone outline on every link and control.

## Motion

The hero workbook changes among three practice artefacts on a slow 1.6-second crossfade with about 5.6 seconds of hold. Section entrances rise 20px with staggered opacity, once. All movement pauses for a hidden tab and is removed for reduced motion. Nothing is hidden when JavaScript is unavailable.

## Intentional glass exception

The brief explicitly requires the liquid-glass-js WebGL fact pill, a backdrop-filter fallback and a scrolled-header refraction. These are the only glass surfaces; the no-glass house rule is allowed for these marked CSS lines.
