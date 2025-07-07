
-- Add the two new projects to the portfolio
INSERT INTO kiel_portfolio_projects (
  title,
  description,
  image,
  demo_link,
  github_link,
  tech
) VALUES 
(
  '🤖 Chatbot NLP Cafe - Smart Telegram Bot',
  'Advanced Telegram chatbot with Natural Language Processing capabilities for "Mata Kopian" cafe. Features intelligent food ordering through conversational AI, complete with admin dashboard for menu management and order tracking.',
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
  'https://github.com/yeheskieltame/ChatbotNLP',
  'https://github.com/yeheskieltame/ChatbotNLP',
  ARRAY[
    'Python',
    'Telegram Bot API',
    'Natural Language Processing',
    'NLP',
    'Machine Learning',
    'Admin Dashboard',
    'Database Management',
    'Conversational AI',
    'Restaurant Tech',
    'Order Management',
    'Chat Interface',
    'API Integration'
  ]
),
(
  '🌐 SmartVerse: Web3 Human-Friendly Digital Identity',
  'Revolutionary decentralized naming protocol that replaces complex blockchain addresses with simple .sw usernames (Smart Wallet). Making Web3 more accessible and user-friendly through intuitive digital identity management.',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
  'https://verse-name-resolver.vercel.app/',
  'https://github.com/yeheskieltame/verse-name-resolver',
  ARRAY[
    'Web3',
    'Blockchain',
    'Decentralized Protocol',
    'Digital Identity',
    'Smart Contracts',
    'Domain Resolution',
    'Next.js',
    'TypeScript',
    'Ethereum',
    'ENS Alternative',
    'User Experience',
    'Decentralized Naming',
    'Wallet Integration',
    'Protocol Development'
  ]
);
