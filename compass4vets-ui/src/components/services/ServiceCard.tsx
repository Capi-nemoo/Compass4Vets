"use client";

import React from 'react';
import Image from 'next/image';
import { Icon } from 'lucide-react';
import { Service } from '@/types/service'; // Assuming '@/' is an alias for 'src/'

interface ServiceCardProps {
  service: Service;
  onRequest?: (service: Service) => void;
  CategoryIcon?: Icon;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onRequest, CategoryIcon }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full">
      {service.logoUrl && (
        <div className="relative h-24 w-full mb-4 flex justify-center items-center">
          <Image
            src={service.logoUrl}
            alt={`${service.name} logo`}
            width={80} // Provide explicit width
            height={80} // Provide explicit height
            objectFit="contain"
            className="rounded-md"
          />
        </div>
      )}
      {CategoryIcon && (
        <CategoryIcon className="text-primary mb-2 h-6 w-6" />
      )}
      <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary-hover transition-colors">
        {service.name}
      </h3>
      <p 
        className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 w-fit"
        style={{
          backgroundColor: 'var(--military-khaki-green)', 
          color: 'var(--military-foreground-on-light)'
        }}
      >
        {service.category}
      </p>
      <p className="text-sm text-muted-foreground mb-4 flex-grow">
        {service.shortDescription || service.description.substring(0, 150) + (service.description.length > 150 ? '...' : '')}
      </p>
      <button
        onClick={() => onRequest?.(service)}
        className="mt-auto px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Request Service
      </button>
    </div>
  );
};

export default ServiceCard;
