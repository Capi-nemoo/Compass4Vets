import React from 'react';
import ServiceCard from '@/components/services/ServiceCard';
import servicesData from '@/data/services.json';
import { Service } from '@/types/service';

export default function ServicesPage() {
  const services: Service[] = servicesData;

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="container mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
            Veteran Services Directory
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Find resources and support services tailored for veterans. Browse by category or search for specific needs.
          </p>
        </header>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No services are currently listed. Please check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
