import { ServiceAddon, Maid, FAQItem, Testimonial } from '../types';
import maid1Image from '../assets/images/maid_1.jpg';
import maid2Image from '../assets/images/maid_2.jpg';
import maid3Image from '../assets/images/maid_3.jpg';
import menImage1 from '../assets/images/men_1.jpg'
import menImage2 from '../assets/images/men_2.jpg'
import womenImage from '../assets/images/tech_consultant.jpg'

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'fridge',
    name: 'Inside Fridge',
    description: 'Thorough cleaning and disinfection of shelves, drawers, and walls.',
    price: 35,
    icon: 'Refrigerator',
  },
  {
    id: 'oven',
    name: 'Inside Oven',
    description: 'Deep scrubbing to remove grease, burnt food, and carbon deposits.',
    price: 45,
    icon: 'FlameKindling',
  },
  {
    id: 'cabinets',
    name: 'Inside Cabinets',
    description: 'Wiping down inside shelves, organization, and exterior polish.',
    price: 40,
    icon: 'LayoutGrid',
  },
  {
    id: 'windows',
    name: 'Interior Windows',
    description: 'Streak-free washing of indoor glass panes, sills, and tracks.',
    price: 30,
    icon: 'Grid3X3',
  },
  {
    id: 'laundry',
    name: 'Wash & Fold Laundry',
    description: 'One load of washing, drying, and folding during your booking.',
    price: 25,
    icon: 'Shirt',
  },
  {
    id: 'carpet',
    name: 'Deep Carpet Vacuum',
    description: 'Extra intensive carpet care using pet-safe odor neutralizers.',
    price: 35,
    icon: 'Sparkles',
  },
  {
    id: 'balcony',
    name: 'Balcony Sweep',
    description: 'Sweeping, dusting, and wiping of outdoor seating and glass doors.',
    price: 20,
    icon: 'Wind',
  },
  {
    id: 'eco',
    name: '100% Eco Products',
    description: 'Premium organic, plant-based, allergen-free cleaning solutions.',
    price: 15,
    icon: 'Leaf',
  }
];

export const TOP_MAIDS: Maid[] = [
  {
    id: 'maid-1',
    name: 'Archana shende',
    rating: 4.95,
    completedJobs: 421,
    specialty: 'Deep Cleaning & Organization',
    avatar: maid1Image,
    bio: 'With over 4 years of experience, Elena is legendary for transforming messy apartments into pristine sanctuaries. She specializes in detailed bedroom organization and premium kitchen deep cleans.',
    reviewsCount: 198
  },
  {
    id: 'maid-2',
    name: 'Kalpna Nagdeve',
    rating: 4.92,
    completedJobs: 312,
    specialty: 'Moving & Cabinet Detailing',
    avatar: maid2Image,
    bio: 'Marcus takes immense pride in moving-in/out cleanings. He ensures that every hidden corner is scrubbed and polished so you get 100% of your deposit back without any stress.',
    reviewsCount: 145
  },
  {
    id: 'maid-3',
    name: 'Pratima Sahare',
    rating: 4.98,
    completedJobs: 580,
    specialty: 'Eco-Friendly & Pet Homes',
    avatar: maid3Image,
    bio: 'An absolute animal lover, Clara excels at meticulous pet hair extraction and using child-safe organic disinfectants so your furry friends stay happy and safe.',
    reviewsCount: 264
  }
];

export const CUSTOMER_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Shyam Verma',
    role: 'Tech Consultant',
    rating: 5,
    text: 'Sevzy is  maid services! I booked a standard clean and Archana arrived exactly on time. My kitchen has never sparkled like this. The live tracking gives absolute peace of mind.',
    avatar: menImage1,
    isVerified: true,
    serviceType: 'Standard Clean'
  },
  {
    id: 'test-2',
    name: 'Nikita Samarth',
    role: 'Product Designer',
    rating: 5,
    text: 'The booking interface is ridiculously smooth. I selected bedrooms, deep cleaning, and inside fridge add-ons, and was confirmed in under 20 seconds. Absolutely beautiful experience and spotless results.',
    avatar: womenImage,
    isVerified: true,
    serviceType: 'Deep Clean'
  },
  {
    id: 'test-3',
    name: 'Dayanand Methe',
    role: 'Working Mom of 3',
    rating: 5,
    text: 'Weekly recurring cleans with Clara has changed our household completely. It feels amazing to come home and have everything perfectly organized using safe, non-toxic products. Well worth every penny.',
    avatar: menImage2,
    isVerified: true,
    serviceType: 'Weekly Cleaning'
  }
];

export const SERVICE_FAQS: FAQItem[] = [
  {
    question: 'How does Sevzy premium cleaning service work?',
    answer: 'Sevzy lets you customize, price, and schedule professional cleaning services in seconds. Choose your apartment size, select a cleaning focus (Standard, Deep, or Move-In), add extra tasks like oven or fridge cleanups, pick a time slot, and submit! We assign a vetted professional and keep you updated in real-time.'
  },
  {
    question: 'Are your home service professionals vetted and background-checked?',
    answer: 'Absolutely. Every single maid on the Sevzy platform undergoes a rigorous multi-stage vetting process. This includes criminal background checks, identity verification, in-person training assessments, and customer satisfaction audits.'
  },
  {
    question: 'What is the difference between a Standard Clean and a Deep Clean?',
    answer: 'A Standard Clean covers everyday maintenance: sweeping, vacuuming, mopping, dusting open surfaces, sanitizing bathrooms, and making beds. A Deep Clean goes much deeper: scrubbing tile grout, sanitizing inside light fixtures, detailed baseboards dusting, cleaning behind appliances, and removing accumulated lime scale.'
  },
  {
    question: 'Do I need to supply cleaning products or be present?',
    answer: 'No! Our professionals arrive fully equipped with premium, safe cleaning supplies. If you select our "100% Eco Products" add-on, we will use exclusively organic, chemical/dye-free plant materials. You also do not need to be home - simply leave entry details or key collection directions in the notes.'
  },
  {
    question: 'What is your satisfaction guarantee?',
    answer: 'We stand behind our work. If any part of our service does not meet your high standards, simply contact us within 24 hours. We will send a premium cleaner back to re-clean any unsatisfactory areas completely free of charge. No questions asked.'
  }
];
