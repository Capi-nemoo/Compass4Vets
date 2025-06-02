import json
import argparse


def load_resources(path="resources.json"):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def list_categories(resources):
    for category in resources:
        print(f"- {category}")


def show_category(resources, category):
    data = resources.get(category)
    if not data:
        print("Category not found. Use --list to see available options.")
        return

    print(f"\n{category.title()}\n{'=' * len(category)}")
    print(data.get("description", ""))
    print("\nHelpful links:")
    for link in data.get("links", []):
        print(f" * {link}")


def main():
    parser = argparse.ArgumentParser(description="Compass4Vets CLI")
    parser.add_argument("category", nargs="?", help="Resource category to display")
    parser.add_argument("--list", action="store_true", help="List available categories")
    args = parser.parse_args()

    resources = load_resources()

    if args.list or not args.category:
        print("Available categories:")
        list_categories(resources)
        return

    show_category(resources, args.category.lower())


if __name__ == "__main__":
    main()
