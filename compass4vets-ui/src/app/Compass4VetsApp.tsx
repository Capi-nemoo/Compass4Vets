/* --------------------------------------------------------------------
   Compass4VetsApp.tsx
   --------------------------------------------------------------------
   – Paste this file into src/app/Compass4VetsApp.tsx
   – Must be saved with the .tsx extension
   – First line is "use client" so interactive hooks work
---------------------------------------------------------------------*/

"use client";

import { useState } from "react";
import {
  MapPin,
  Search,
  Briefcase,
  GraduationCap,
  Stethoscope,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ──────────────────────────────────────────────────────────────── */
/* Category metadata                                                */
/* ──────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "employment",
    label: "Employment",
    icon: Briefcase,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    color: "from-sky-500 to-sky-600",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: Stethoscope,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "housing",
    label: "Housing",
    icon: Home,
    color: "from-amber-500 to-amber-600",
  },
] as const;

/* ──────────────────────────────────────────────────────────────── */
/* Temporary mock search results                                    */
/* ──────────────────────────────────────────────────────────────── */
type CategoryId = (typeof CATEGORIES)[number]["id"];

interface Result {
  title: string;
  description: string;
  url: string;
  category: CategoryId;
}

const MOCK_RESULTS: Result[] = [
  {
    title: "VA Employment Services (VES)",
    description:
      "Career counseling, résumé assistance, and job placement for veterans.",
    url: "https://www.va.gov/careers-employment/ves/",
    category: "employment",
  },
  {
    title: "GI Bill® Comparison Tool",
    description: "Estimate your education benefits and compare schools.",
    url: "https://www.va.gov/education/gi-bill-comparison-tool/",
    category: "education",
  },
  {
    title: "VA Health Care Locator",
    description:
      "Find VA medical centers, clinics, and other health services near you.",
    url: "https://www.va.gov/find-locations/",
    category: "healthcare",
  },
  {
    title: "Supportive Services for Veteran Families (SSVF)",
    description:
      "Rapid rehousing and homelessness prevention for very low-income veteran families.",
    url: "https://www.va.gov/homeless/ssvf/",
    category: "housing",
  },
];

/* ──────────────────────────────────────────────────────────────── */
/* Main component                                                   */
/* ──────────────────────────────────────────────────────────────── */
export default function Compass4VetsApp({ questionnaireData }: { questionnaireData: any | null }) {
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [activeCat, setActiveCat] = useState<CategoryId | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  /* Fake search — replace with real API call later */
  function handleSearch() {
    const filtered = MOCK_RESULTS.filter(
      (r) =>
        (!activeCat || r.category === activeCat) &&
        (!keyword ||
          r.title.toLowerCase().includes(keyword.toLowerCase()) ||
          r.description.toLowerCase().includes(keyword.toLowerCase()))
    );
    setResults(filtered);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─────────────── Hero ─────────────── */}
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Compass4Vets
          </motion.h1>
          <p className="mt-4 max-w-3xl text-lg sm:text-xl text-muted-foreground">
            Quickly discover employment, education, healthcare, and housing
            resources curated for U.S. veterans transitioning to civilian life.
          </p>
        </div>
      </section>

      {/* ───────── Search bar (now above category chips) ───────── */}
      <section className="w-full bg-background py-5 mt-10"> {/* Changed background to bg-gray-50, removed backdrop-blur */}
          <div className="mx-auto grid max-w-5xl grid-cols-12 items-center gap-x-4 gap-y-3 px-6">
            {/* Location */}
            <div className="col-span-12 flex items-center gap-2 sm:col-span-5">
              <MapPin className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="ZIP code or city/state"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Location"
              />
            </div>
            {/* Keyword */}
            <div className="col-span-12 flex items-center gap-2 sm:col-span-5">
              <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Keyword (e.g., résumé, PTSD, rental)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                aria-label="Keyword"
              />
            </div>
            {/* Button */}
            <div className="col-span-12 flex justify-end sm:col-span-2">
              <Button className="w-full sm:w-auto" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </section>

      {/* ───────── Category chips ───────── */}
      <section className="mx-auto mt-6 max-w-5xl px-6"> {/* Adjusted mt-6 for spacing from new search bar position */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map(({ id, label, icon: Icon, color }) => (
            <motion.button
              key={id}
              onClick={() => setActiveCat(activeCat === id ? null : id)}
              whileTap={{ scale: 0.97 }}
              className={`relative isolate flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-card p-4 shadow transition hover:shadow-md focus:outline-none ${
                activeCat === id ? "ring-2 ring-primary" : ""
              }`}
            >
              {/* faint gradient backdrop */}
              <span
                className={`pointer-events-none absolute inset-0 z-0 bg-gradient-to-br opacity-10 ${color}`}
              />
              <Icon aria-hidden="true" className="z-10 h-7 w-7 text-card-foreground" />
              <span className="z-10 mt-2 text-sm font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ───────────── Results grid ───────────── */}
      <section className="mx-auto mt-12 max-w-5xl px-6 pb-24">
        {results.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No results yet — try a search above.
          </p>
        ) : (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((item) => (
              <motion.li
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card className="h-full overflow-hidden rounded-2xl shadow">
                  <CardContent className="flex h-full flex-col justify-between p-5">
                    <div>
                      <h3 className="text-lg font-semibold leading-6 text-card-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center self-start rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary-foreground focus:outline-none"
                    >
                      Visit resource ↗
                    </a>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </section>
    </div>
  );
}

