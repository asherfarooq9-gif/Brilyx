# Portfolio screenshots

Drop one screenshot per project here. Filenames must match the project `slug`
in `lib/portfolio.ts`:

| File | Project | Category |
| --- | --- | --- |
| `example-storefront.jpg` | Example Storefront | Web Development |
| `example-marketing-site.jpg` | Example Marketing Site | Web Development |
| `example-delivery-app.jpg` | Example Delivery App | App Development |
| `example-ops-automation.jpg` | Example Ops Automation | AI Automations |
| `example-support-assistant.jpg` | Example Support Assistant | Chatbots |
| `example-forecasting-model.jpg` | Example Forecasting Model | AI / ML |

- Landscape **16:10**, at least `1600 x 1000`. `.jpg` or `.webp`.
- Show the real site — a clean above-the-fold capture works best.

Until a file is here, `ProjectCard` renders a gradient fallback with the
project name (`image: "/work/<slug>.jpg"` is already set in `lib/portfolio.ts`).

## Adding / editing projects

Edit `lib/portfolio.ts`. Each project needs a `category` — one of the service
slugs: `web-development`, `app-development`, `ai-automations`, `chatbots`,
`ai-ml`. The `/work` page groups projects into a section per category
automatically (empty categories are skipped). Set `featured: true` to also show
a project in the homepage "Our Work" section.
