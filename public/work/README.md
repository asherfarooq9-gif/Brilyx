# Portfolio screenshots

Drop one screenshot per project here. Filenames must match the project `slug`
in `lib/portfolio.ts`:

| File | Project |
| --- | --- |
| `example-storefront.jpg` | Example Storefront |
| `example-dashboard.jpg` | Example Analytics Dashboard |
| `example-marketing-site.jpg` | Example Marketing Site |

- Landscape **16:10**, at least `1600 x 1000`. `.jpg` or `.webp`.
- Show the real site — a clean above-the-fold capture works best.

Until a file is here, `ProjectCard` renders a gradient fallback with the
project name (`image: "/work/<slug>.jpg"` is already set in `lib/portfolio.ts`).

Replace the three placeholder entries in `lib/portfolio.ts` with real projects:
set `name`, `client`, `summary`, `url` (the live site), `tags`, `year`, and add
a matching screenshot here.
