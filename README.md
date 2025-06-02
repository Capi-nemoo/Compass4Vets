# Compass4Vets

Compass4Vets is a prototype web application that helps U.S. veterans locate
social-service resources when transitioning to civilian life. The project
demonstrates how a Llama-powered system could surface relevant resources in
areas such as employment, education, healthcare, and housing.

## Getting Started

1. Ensure you have Python 3.8+ installed.
2. Install dependencies:

```bash
pip install flask
```

3. Run the development server:

```bash
python compass4vets.py
```

Visit `http://localhost:5000/` in your browser. Use `veteran` as the username
and `password` as the password to log in.

The resource data is stored in `resources.json`. In a full deployment, this
information could be expanded and enhanced with Llama-generated guidance.
