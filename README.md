# Compass4Vets

Compass4Vets is a prototype command-line tool that helps U.S. veterans locate
social-service resources when transitioning to civilian life. The project is
aimed at demonstrating how a Llama-powered system could surface relevant
df resources in areas such as employment, education, healthcare, and housing.

## Getting Started

1. Ensure you have Python 3.8+ installed.
2. Clone this repository and install any dependencies (there are none for this
   demo).

Run the CLI with:

```bash
python compass4vets.py --list          # Show available categories
python compass4vets.py employment      # Display employment resources
```

The resource data is stored in `resources.json`. In a full deployment, this
information could be expanded and enhanced with Llama-generated guidance.
