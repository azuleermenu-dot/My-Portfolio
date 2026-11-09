# Asnor Ali — Personal Developer Portfolio

A full portfolio rebuild inspired by the supplied futuristic, cinematic galaxy reference.

## Stack

- React 18 + Vite
- GSAP + ScrollTrigger for parallax, scroll reveals, pinned project storytelling, and SVG path drawing
- Lenis for desktop smooth scrolling (disabled when reduced motion is requested)
- Lucide React for interface icons
- Vercel serverless function + Resend for contact email delivery

The existing Vite/React application was retained to avoid an unnecessary framework migration.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Contact email configuration

The form posts to `/api/contact` and delivers messages to `asnorali.dev@gmail.com`.

Configure these Vercel environment variables before email delivery can work:

- `RESEND_API_KEY`: a Resend API key.
- `RESEND_FROM_EMAIL`: a sender address on a domain verified in Resend.

For shared rate limiting across Vercel instances, also configure:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Without Upstash, a per-instance in-memory fallback is used. Never expose these values in frontend code. See `.env.example`.

## Work shown

- KDYNN Market — website project
- Wicked Coffee — concept project
- Ember & Salt — fictional restaurant branding and website concept

Unverified project URLs and unpublished technology stacks are intentionally omitted rather than guessed. The project artwork in the portfolio is a visual representation, not a captured screenshot of each live website.

## Accessibility and performance

- Responsive desktop, tablet, and mobile layouts
- Reduced-motion support
- Semantic page sections, keyboard focus styles, and labelled form inputs
- Lazy-loaded secondary images and technology icons
- No autoplay audio

## Preview and release

This rebuild is developed on the `rebuild/scroll-driven-portfolio` branch. The production branch and live domain are not changed by the preview workflow. Review the Vercel preview before merging or promoting a release.
