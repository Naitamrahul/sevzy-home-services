export type ServiceType = 'standard' | 'deep' | 'move-in' | 'airbnb';

export type BookingFrequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

export interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Maid {
  id: string;
  name: string;
  rating: number;
  completedJobs: number;
  specialty: string;
  avatar: string;
  bio: string;
  reviewsCount: number;
}

export interface BookingDetails {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  bedrooms: number;
  bathrooms: number;
  serviceType: ServiceType;
  frequency: BookingFrequency;
  addons: string[]; // List of addon IDs
  date: string;
  timeSlot: string;
  basePrice: number;
  addonPrice: number;
  discount: number;
  fee: number;
  finalPrice: number;
  status: 'pending' | 'confirmed' | 'cleaning' | 'completed';
  assignedMaidId?: string;
  createdAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  isVerified: boolean;
  serviceType: string;
}
