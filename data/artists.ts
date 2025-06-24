export interface Artist {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  location: string;
  image: string;
  rating: number;
  experience: string;
  description: string;
}

export const artistsData: Artist[] = [
  {
    "id": 1,
    "name": "Emma Rodriguez",
    "category": "Singer",
    "subcategory": "Pop",
    "price": 2500,
    "location": "Los Angeles, CA",
    "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
    "rating": 4.9,
    "experience": "8 years",
    "description": "Award-winning pop singer with millions of streams worldwide"
  },
  {
    "id": 2,
    "name": "Marcus Thompson",
    "category": "DJ",
    "subcategory": "Electronic",
    "price": 1800,
    "location": "Miami, FL",
    "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "rating": 4.7,
    "experience": "12 years",
    "description": "International DJ known for electrifying festival performances"
  },
  {
    "id": 3,
    "name": "Isabella Chen",
    "category": "Dancer",
    "subcategory": "Contemporary",
    "price": 1200,
    "location": "New York, NY",
    "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    "rating": 4.8,
    "experience": "10 years",
    "description": "Professional contemporary dancer and choreographer"
  },
  {
    "id": 4,
    "name": "Dr. James Wilson",
    "category": "Speaker",
    "subcategory": "Motivational",
    "price": 5000,
    "location": "Chicago, IL",
    "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "rating": 4.9,
    "experience": "15 years",
    "description": "Bestselling author and transformational speaker"
  },
  {
    "id": 5,
    "name": "Sofia Nakamura",
    "category": "Singer",
    "subcategory": "Jazz",
    "price": 3200,
    "location": "San Francisco, CA",
    "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    "rating": 4.8,
    "experience": "14 years",
    "description": "Sultry jazz vocalist with classical training"
  },
  {
    "id": 6,
    "name": "Alex Rivera",
    "category": "Dancer",
    "subcategory": "Hip Hop",
    "price": 900,
    "location": "Atlanta, GA",
    "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "rating": 4.6,
    "experience": "7 years",
    "description": "Street dance champion and battle winner"
  },
  {
    "id": 7,
    "name": "Luna Park",
    "category": "DJ",
    "subcategory": "House",
    "price": 2200,
    "location": "Las Vegas, NV",
    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    "rating": 4.7,
    "experience": "9 years",
    "description": "Resident DJ at top Vegas clubs"
  },
  {
    "id": 8,
    "name": "David Kumar",
    "category": "Speaker",
    "subcategory": "Business",
    "price": 4200,
    "location": "Austin, TX",
    "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    "rating": 4.9,
    "experience": "18 years",
    "description": "Fortune 500 CEO and business strategist"
  },
  {
    "id": 9,
    "name": "Aria Williams",
    "category": "Singer",
    "subcategory": "R&B",
    "price": 2800,
    "location": "Nashville, TN",
    "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    "rating": 4.8,
    "experience": "11 years",
    "description": "Grammy-nominated R&B artist"
  },
  {
    "id": 10,
    "name": "Miguel Santos",
    "category": "Dancer",
    "subcategory": "Salsa",
    "price": 1400,
    "location": "Miami, FL",
    "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    "rating": 4.7,
    "experience": "16 years",
    "description": "World champion salsa dancer and instructor"
  },
  {
    "id": 11,
    "name": "Zoe Anderson",
    "category": "DJ",
    "subcategory": "Techno",
    "price": 1600,
    "location": "Detroit, MI",
    "image": "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    "rating": 4.6,
    "experience": "6 years",
    "description": "Underground techno pioneer"
  },
  {
    "id": 12,
    "name": "Rachel Green",
    "category": "Speaker",
    "subcategory": "Health",
    "price": 3500,
    "location": "Portland, OR",
    "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    "rating": 4.8,
    "experience": "12 years",
    "description": "Wellness expert and nutrition specialist"
  },
  {
    "id": 13,
    "name": "Tyler Brooks",
    "category": "Singer",
    "subcategory": "Rock",
    "price": 3500,
    "location": "Seattle, WA",
    "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "rating": 4.7,
    "experience": "13 years",
    "description": "Rock vocalist with stadium experience"
  },
  {
    "id": 14,
    "name": "Maya Patel",
    "category": "Dancer",
    "subcategory": "Ballet",
    "price": 2000,
    "location": "Boston, MA",
    "image": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
    "rating": 4.9,
    "experience": "20 years",
    "description": "Principal dancer with major ballet companies"
  },
  {
    "id": 15,
    "name": "Carlos Mendoza",
    "category": "DJ",
    "subcategory": "Latin",
    "price": 1300,
    "location": "Los Angeles, CA",
    "image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=face",
    "rating": 4.5,
    "experience": "8 years",
    "description": "Latin music specialist and party starter"
  }
]; 