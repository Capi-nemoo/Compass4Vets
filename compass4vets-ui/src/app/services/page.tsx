"use client";

import React, { useMemo, useState } from 'react';
import ServiceCard from '@/components/services/ServiceCard';
import servicesData from '@/data/services.json';
import { Service } from '@/types/service';
import RequestServiceModal from '@/components/services/RequestServiceModal';
import {
  Stethoscope,
  GraduationCap,
  Briefcase,
  Home,
  Gavel,
  Banknote,
  Users,
  Info,
} from 'lucide-react';

export default function ServicesPage() {
  const services: Service[] = servicesData;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(services.map((s) => s.category)));
    return ['All', ...cats];
  }, [services]);

  const groups: Record<string, string[]> = {
    'Healthcare & Mental Health': ['Healthcare'],
    'Housing & Financial Aid': ['Housing', 'Financial'],
    'Education & Career': ['Education', 'Employment'],
    'Legal Support': ['Legal'],
    'Community & Recreation': ['Social & Community'],
  };

  const categoryIcons: Record<string, any> = {
    Healthcare: Stethoscope,
    Education: GraduationCap,
    Employment: Briefcase,
    Housing: Home,
    Legal: Gavel,
    Financial: Banknote,
    'Social & Community': Users,
    Other: Info,
  };

  const filteredServices = services.filter((s) => {
    const matchesCategory = category === 'All' || s.category === category;
    const searchText = search.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(searchText) ||
      (s.shortDescription && s.shortDescription.toLowerCase().includes(searchText));
    return matchesCategory && matchesSearch;
  });

  const groupedServices = useMemo(() => {
    const searchText = search.toLowerCase();
    const result: Record<string, Service[]> = {};
    Object.entries(groups).forEach(([label, cats]) => {
      result[label] = services.filter(
        (s) =>
          cats.includes(s.category) &&
          (s.name.toLowerCase().includes(searchText) ||
            (s.shortDescription && s.shortDescription.toLowerCase().includes(searchText)))
      );
    });
    return result;
  }, [services, search]);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="container mx-auto">
        <header className="mb-6 text-center sticky top-0 bg-background z-10 py-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Veteran Services Directory
          </h1>
          <nav className="mb-4 flex flex-wrap justify-center gap-3 text-sm">
            {Object.keys(groups).map((label) => (
              <a key={label} href={`#${label.replace(/\s+/g, '-').toLowerCase()}`} className="underline text-primary hover:text-primary/80">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-md text-sm border ${category === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'} hover:bg-primary/80 hover:text-primary-foreground`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto px-3 py-2 border rounded-md"
          />
        </header>

        {category === 'All' ? (
          Object.entries(groupedServices).map(([label, list]) => (
            <section key={label} id={label.replace(/\s+/g, '-').toLowerCase()} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {label}
              </h2>
              {list.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {list.map((service) => {
                    const IconComp = categoryIcons[service.category] || Info;
                    return (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onRequest={() => setSelectedService(service)}
                        CategoryIcon={IconComp}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground">No services available.</p>
              )}
            </section>
          ))
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComp = categoryIcons[service.category] || Info;
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onRequest={() => setSelectedService(service)}
                  CategoryIcon={IconComp}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No matching services found.</p>
          </div>
        )}
      </div>
      <RequestServiceModal
        serviceName={selectedService?.name || ''}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </main>
  );
}
