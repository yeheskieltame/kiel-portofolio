
-- Delete all existing projects
DELETE FROM kiel_portfolio_projects;

-- Insert the new blockchain project
INSERT INTO kiel_portfolio_projects (
  title,
  description,
  image,
  demo_link,
  github_link,
  tech
) VALUES (
  '🏢 Report It Right Now - Blockchain Reporting System',
  'Revolutionary Web3 application for transparent blockchain-based reporting system with decentralized validation, multi-role dashboards, and economic incentive mechanisms. Features smart contract integration, real-time analytics, and comprehensive validation system for institutional transparency.',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
  'https://github.com/yeheskieltame',
  'https://github.com/yeheskieltame',
  ARRAY[
    'React',
    'TypeScript', 
    'Blockchain',
    'Web3',
    'Smart Contracts',
    'MetaMask',
    'Solidity',
    'Ethereum',
    'Recharts',
    'Shadcn/UI',
    'Tailwind CSS',
    'Multi-Role Dashboard',
    'Real-time Analytics',
    'Decentralized Validation'
  ]
);
