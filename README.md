# Compass4Vets

Compass4Vets is an in-progress web platform that helps U.S. veterans discover benefits, locate resources, and connect with peers when transitioning to civilian life.

## MVP Features

- **Veteran registration and profile management**
- **Interactive resource map** powered by Google Maps
- **Benefits assistant chat** for quick answers to questions
- **Peer-to-peer forum and chat** to build community

Veterans can create a basic profile via the Register page (`/register`).
The saved information is shown on `/profile` and stored locally in the browser.


## Project Structure

- `compass4vets-ui/` – Next.js front end
- `resources.json` – Sample data used during early prototyping

A backend API (Node.js/Express or Python/FastAPI) with a PostgreSQL database is planned for future development.

## Development


``` bash
┌─────────────────────────────────────────────┐
│                 Frontend (Web)              │
│  • Next.js/React UI                          │
│  • Google Maps for interactive resource map  │
│  • Chat/Forum components using WebSockets    │
└─────────────────────────────────────────────┘
               │  REST/GraphQL  │
┌─────────────────────────────────────────────┐
│              Backend API                    │
│  • Node.js (Express) or Python (FastAPI)    │
│  • Handles auth, chat, profile CRUD         │
│  • Integrates with third‑party services     │
└─────────────────────────────────────────────┘
               │     DB ORM     │
┌─────────────────────────────────────────────┐
│               Database                       │
│  • PostgreSQL (user profiles, posts, etc.)   │
│  • Optionally Redis for session/chat cache   │
└─────────────────────────────────────────────┘
               │ External APIs │
┌─────────────────────────────────────────────┐
│          External Services                   │
│  • Google Maps API                           │
│  • Chat model (OpenAI/Llama)                 │
│  • Email/SMS (e.g., SendGrid/Twilio)         │
│  • Auth provider (NextAuth/Auth0)            │
└─────────────────────────────────────────────┘
               │  Build & Deploy │
┌─────────────────────────────────────────────┐
│             CI/CD Pipeline                   │
│  • GitHub Actions or similar                 │
│  • Lint/Test → Build → Deploy                │
│  • Deploy to Vercel/AWS/GCP                  │
└─────────────────────────────────────────────┘

```


Run the UI locally:

```bash
cd compass4vets-ui
npm install
npm run dev
```

Open <http://localhost:3000> in your browser.

Contributions are welcome!
