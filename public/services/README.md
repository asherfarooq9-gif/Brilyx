# Service card images

Drop one image per service here. Filenames must match the service `slug` in
`lib/services.ts`:

| File | Service |
| --- | --- |
| `ai-ml.jpg` | AI / ML Development |
| `app-development.jpg` | App Development |
| `web-development.jpg` | Web Development |
| `ai-automations.jpg` | AI Automations |
| `chatbots.jpg` | Chatbots |

- Portrait **9:16**, at least `1080 x 1920`. `.jpg` or `.webp`.
- Dark, near-black, monochrome — must sit on the black carousel without clashing.

Once the files are here, `ServiceCarousel` picks them up automatically
(`image: "/services/<slug>.jpg"` is already set in `lib/services.ts`).
