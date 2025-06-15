
-- Create table for activities gallery
CREATE TABLE public.kiel_portfolio_activities (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  activity_date DATE NOT NULL,
  location TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert mock data for activities
INSERT INTO public.kiel_portfolio_activities (
  title, 
  description, 
  image_url, 
  activity_date, 
  location, 
  category, 
  tags, 
  is_featured
) VALUES 
(
  'Blockchain Technology Workshop',
  'Led a comprehensive workshop on blockchain fundamentals and smart contract development for 50+ participants from various tech companies.',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
  '2024-03-15',
  'Jakarta Tech Hub',
  'workshop',
  ARRAY['blockchain', 'smart-contracts', 'web3', 'education'],
  true
),
(
  'Tech Conference Keynote Speaker',
  'Delivered keynote presentation on "The Future of Decentralized Systems" at Indonesia Tech Summit 2024.',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
  '2024-02-20',
  'Jakarta Convention Center',
  'speaking',
  ARRAY['keynote', 'conference', 'tech-summit', 'blockchain'],
  true
),
(
  'University Guest Lecture',
  'Guest lecture on blockchain applications in business and finance for computer science students.',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9d1',
  '2024-01-10',
  'Universitas Indonesia',
  'education',
  ARRAY['university', 'lecture', 'students', 'blockchain'],
  false
),
(
  'Hackathon Judge & Mentor',
  'Served as judge and mentor at Indonesia Blockchain Hackathon, guiding teams in developing innovative DeFi solutions.',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
  '2024-04-05',
  'Bandung Digital Valley',
  'hackathon',
  ARRAY['hackathon', 'mentoring', 'defi', 'innovation'],
  true
),
(
  'Community Meetup Organizer',
  'Organized monthly blockchain developers meetup with 100+ attendees discussing latest trends and technologies.',
  'https://images.unsplash.com/photo-1511578314322-379afb476865',
  '2024-03-01',
  'Co-working Space Senayan',
  'community',
  ARRAY['meetup', 'community', 'networking', 'developers'],
  false
),
(
  'Corporate Training Session',
  'Conducted blockchain adoption training for C-level executives at major Indonesian fintech company.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978',
  '2024-02-28',
  'Bank Mandiri Headquarters',
  'training',
  ARRAY['corporate', 'training', 'fintech', 'executives'],
  false
),
(
  'Startup Pitch Competition',
  'Participated in Indonesia Startup Awards as blockchain technology expert evaluating innovative startups.',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72',
  '2024-01-25',
  'Kempinski Hotel Jakarta',
  'competition',
  ARRAY['startup', 'pitch', 'evaluation', 'innovation'],
  true
),
(
  'Open Source Contribution',
  'Major contribution to blockchain infrastructure project with 1000+ GitHub stars, implementing security enhancements.',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  '2024-04-12',
  'Remote Collaboration',
  'development',
  ARRAY['open-source', 'github', 'security', 'infrastructure'],
  false
);

-- Create index for better query performance
CREATE INDEX idx_activities_category ON public.kiel_portfolio_activities(category);
CREATE INDEX idx_activities_featured ON public.kiel_portfolio_activities(is_featured);
CREATE INDEX idx_activities_date ON public.kiel_portfolio_activities(activity_date DESC);
