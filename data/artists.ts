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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaRodriguez&backgroundColor=b6e3f4,c0aede,d1d4f9",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusThompson&backgroundColor=ffdfbf,ffd5dc,c0aede",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=IsabellaChen&backgroundColor=b6e3f4,ffd5dc,d1d4f9",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesWilson&backgroundColor=ffdfbf,c0aede,b6e3f4",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaNakamura&backgroundColor=ffd5dc,d1d4f9,ffdfbf",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera&backgroundColor=c0aede,b6e3f4,ffd5dc",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=LunaPark&backgroundColor=d1d4f9,ffdfbf,b6e3f4",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKumar&backgroundColor=ffdfbf,ffd5dc,c0aede",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=AriaWilliams&backgroundColor=b6e3f4,c0aede,ffd5dc",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=MiguelSantos&backgroundColor=ffd5dc,d1d4f9,ffdfbf",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=ZoeAnderson&backgroundColor=c0aede,ffdfbf,b6e3f4",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=RachelGreen&backgroundColor=d1d4f9,b6e3f4,ffd5dc",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=TylerBrooks&backgroundColor=ffdfbf,c0aede,ffd5dc",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=MayaPatel&backgroundColor=b6e3f4,d1d4f9,ffdfbf",
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
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendoza&backgroundColor=ffd5dc,c0aede,d1d4f9",
    "rating": 4.5,
    "experience": "8 years",
    "description": "Latin music specialist and party starter"
  }
]; 