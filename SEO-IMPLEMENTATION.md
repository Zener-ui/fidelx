# Fidelx SEO Implementation

Production domain: https://fidelx.com.ng

## Implemented
- Unique title and meta description for all public HTML pages.
- Canonical URLs using the production domain.
- Index/follow robots directives.
- `robots.txt` with sitemap reference.
- XML sitemap covering the public HTML pages.
- Open Graph and Twitter/X metadata (without inventing a missing social image).
- JSON-LD for Organization, WebSite (home), WebPage, BreadcrumbList, and BlogPosting (story).
- Image alt-text audit for images missing alt attributes.
- Semantic H1 added to the blog index without changing its visual design.
- Branded `404.html` with `noindex, follow`.
- Existing design, forms, Supabase scripts, WhatsApp link, navigation and page functionality were not intentionally changed.

## Domain / deployment
- Keep `https://fidelx.com.ng` as the canonical production domain.
- Deploy these files to the existing Vercel project.

## Post-launch
1. Verify the domain in Google Search Console.
2. Submit `https://fidelx.com.ng/sitemap.xml`.
3. Request indexing for the homepage and key pages.
4. Monitor indexed pages, impressions, clicks and branded queries.
5. Expand content and geographic pages only for services/locations Fidelx genuinely serves.

## Note
The supplied ZIP references an `images/` directory but does not contain it. Existing image references were preserved; no new image filenames were invented for social metadata. Ensure the deployment source still includes the site's existing `images/` assets.


## Clean URL routing
The site now exposes clean public URLs (`/about`, `/story`, `/customers`, `/vendors`, `/riders`, `/partners`, `/contact`, `/blog`) through Vercel rewrites while retaining the existing `.html` files internally. The homepage remains `/`. `/home` permanently redirects to `/`.
