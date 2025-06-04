export type ServiceCategory = 'Healthcare' | 'Education' | 'Employment' | 'Housing' | 'Legal' | 'Financial' | 'Social & Community' | 'Other';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  shortDescription?: string; // Optional, for card view
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    details?: string; // e.g., "Online Only", "Multiple Locations"
  };
  eligibility?: string; // Brief notes or link
  applicationProcess?: string; // Brief notes or link
  keywords?: string[];
  logoUrl?: string; // Optional URL for a logo
  operatingHours?: string;
}
