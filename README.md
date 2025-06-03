# Compass4Vets

Compass4Vets is an in-progress web platform that helps U.S. veterans discover benefits, locate resources, and connect with peers when transitioning to civilian life.

## MVP Features

- **Veteran registration and profile management**
- **Interactive resource map** powered by Google Maps
- **Benefits assistant chat** for quick answers to questions
- **Peer-to-peer forum and chat** to build community

## Project Structure

- `compass4vets-ui/` – Next.js front end
- `resources.json` – Sample data used during early prototyping

A backend API (Node.js/Express or Python/FastAPI) with a PostgreSQL database is planned for future development.

## Development

Run the UI locally with [pnpm](https://pnpm.io):

```bash
cd compass4vets-ui
pnpm install
pnpm dev
```

Open <http://localhost:3000> in your browser.

Contributions are welcome!
