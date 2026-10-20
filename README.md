# OneTrust Sandbox Inc — Next.js + Sanity demo

A fake website (Next.js App Router, React, JavaScript) that reads content from a Sanity sandbox project.

| Route        | What it shows                                                  |
|--------------|----------------------------------------------------------------|
| `/`          | Home hero, from the `page` document with slug `home`            |
| `/about`     | About Us, from the `page` with slug `about` (Portable Text)     |
| `/contact`   | Contact form → `POST /api/contact` → `contactSubmission` doc    |
| `/resources` | List of `resource` docs with a **Download PDF** button          |

Without Sanity credentials the site runs on sample content in `lib/fallback.js`, and `/resources` serves `public/sample-guide.pdf`.

## Run

```bash
npm install
cp .env.local.example .env.local   # then fill in your project ID
npm run dev                        # http://localhost:3000
```

## Connect your Sanity sandbox

1. Get your **Project ID** and **dataset** from https://www.sanity.io/manage and set them in `.env.local`.
2. In the project's **API → CORS origins**, add `http://localhost:3000`.
3. Add the schemas in `sanity/schemas/` to your Studio's `sanity.config.js`:
   ```js
   import { schemaTypes } from './schemas';
   export default defineConfig({ /* ... */ schema: { types: schemaTypes } });
   ```
4. Optional: import starter page docs:
   ```bash
   npx sanity dataset import sanity/sample-data.ndjson production
   ```
5. In Studio, create **Resource** documents and upload a PDF. They appear on `/resources`.
6. Optional, so the contact form saves to Sanity: create an **Editor** token under **API → Tokens** and set `SANITY_API_WRITE_TOKEN`. The token is server-side only.

Content is cached for 60 seconds (`revalidate: 60` in `lib/sanity.js`).
