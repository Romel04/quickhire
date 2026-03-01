import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const jobs = [
  {
    title: 'Senior Frontend Developer',
    company: 'Revolut',
    location: 'London, UK',
    category: 'Technology',
    type: 'Full-Time',
    description:
      'Revolut is looking for a Senior Frontend Developer to join our growing engineering team. You will work on building the next generation of financial products used by millions of people worldwide.\n\nAs part of our team, you will collaborate with designers, product managers, and backend engineers to create seamless user experiences. You will be responsible for architecting and implementing scalable frontend solutions using React and TypeScript.\n\nWe value clean code, performance, and attention to detail. You will have the opportunity to influence technical decisions and mentor junior developers.',
    requirements:
      '5+ years of experience with React and TypeScript\nStrong understanding of web performance optimization\nExperience with state management (Redux, Zustand)\nFamiliarity with testing frameworks (Jest, Cypress)\nGood communication skills and team player\nExperience with CI/CD pipelines',
    salary: '$90,000 – $130,000',
    featured: true,
  },
  {
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Francisco, US',
    category: 'Design',
    type: 'Full-Time',
    description:
      'Dropbox is looking for a Brand Designer to help the team craft compelling visual identities and brand experiences. You will work closely with marketing and product teams to evolve our brand language across all touchpoints.\n\nYou will be responsible for creating design systems, visual guidelines, and marketing materials that resonate with our global audience. This role requires a strong portfolio demonstrating brand identity work at scale.\n\nWe are looking for someone who can think strategically about brand while also executing pixel-perfect designs.',
    requirements:
      '4+ years of brand design experience\nStrong portfolio showcasing identity and brand work\nProficiency in Figma, Illustrator, and Photoshop\nExperience working with design systems\nExcellent understanding of typography and color theory\nAbility to present and defend design decisions',
    salary: '$85,000 – $120,000',
    featured: true,
  },
  {
    title: 'Email Marketing Specialist',
    company: 'Pitch',
    location: 'Berlin, Germany',
    category: 'Marketing',
    type: 'Full-Time',
    description:
      'Pitch is looking for an Email Marketing Specialist to join our marketing team. In this role, you will own our email marketing strategy and execution, driving engagement and retention across our user base.\n\nYou will design, write, and optimize email campaigns using data-driven insights. You will work cross-functionally with product, design, and customer success teams to ensure our communications are timely, relevant, and effective.\n\nThis is a great opportunity to make a real impact at a fast-growing startup.',
    requirements:
      '3+ years of email marketing experience\nExperience with email platforms (Mailchimp, HubSpot, or similar)\nStrong analytical skills and experience with A/B testing\nExcellent copywriting and communication skills\nKnowledge of HTML/CSS for email templates\nUnderstanding of GDPR and email compliance',
    salary: '€55,000 – €75,000',
    featured: true,
  },
  {
    title: 'Visual Designer',
    company: 'Blinkist',
    location: 'Granada, Spain',
    category: 'Design',
    type: 'Full-Time',
    description:
      'Blinkist is looking for a Visual Designer to help shape the visual language of our products. You will collaborate with our product and marketing teams to create beautiful, functional designs that delight our users.\n\nYou will work on everything from UI components and illustrations to marketing assets and motion graphics. We are looking for someone with a strong eye for aesthetics and a passion for creating meaningful experiences.\n\nThis is a remote-friendly role with occasional travel to our Berlin headquarters.',
    requirements:
      '3+ years of visual design experience\nStrong portfolio with diverse design work\nProficiency in Figma and Adobe Creative Suite\nExperience with motion design is a plus\nUnderstanding of UI/UX principles\nAbility to work in a fast-paced environment',
    salary: '€50,000 – €70,000',
    featured: true,
  },
  {
    title: 'Product Designer',
    company: 'ClassPass',
    location: 'Manchester, UK',
    category: 'Design',
    type: 'Full-Time',
    description:
      'ClassPass is looking for a Product Designer to help us redesign the future of fitness. You will work on our core product experiences, from discovery to booking to post-class reflection.\n\nYou will conduct user research, create wireframes and prototypes, and work closely with engineers to ship polished experiences. You will be part of a collaborative design team that values craft, curiosity, and continuous learning.\n\nWe believe great design can change how people relate to their health and wellness.',
    requirements:
      '4+ years of product design experience\nStrong portfolio showcasing end-to-end product work\nExperience with user research and usability testing\nProficiency in Figma\nStrong communication and collaboration skills\nExperience in consumer apps is a plus',
    salary: '£65,000 – £90,000',
    featured: true,
  },
  {
    title: 'Lead Designer',
    company: 'Canva',
    location: 'Ontario, Canada',
    category: 'Design',
    type: 'Full-Time',
    description:
      `Canva is looking for a Lead Designer to help develop our next generation of creative tools. You will lead a small design team and work on some of Canva's most impactful features used by over 100 million people.\n\nYou will be responsible for setting design direction, mentoring designers, and collaborating with cross-functional teams to deliver exceptional user experiences. This is a senior role with significant influence over our product strategy.`,
    requirements:
      `6+ years of design experience, 2+ in a lead role\nDemonstrated ability to lead and grow design teams\nStrong systems thinking and ability to design at scale\nExcellent communication and stakeholder management skills\nExperience with rapid prototyping and user testing`,
    salary: 'CA$100,000 – CA$140,000',
    featured: true,
  },
  {
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
    category: 'Marketing',
    type: 'Full-Time',
    description:
      'Nomad is looking for a Social Media Assistant to help grow our online presence across all major platforms. You will create engaging content, manage community interactions, and track performance metrics.\n\nYou will work closely with our marketing team to develop social media strategies that drive brand awareness and user acquisition. This is an entry-level role with great growth potential.\n\nWe are a remote-first company with a team spread across 30+ countries.',
    requirements:
      '1–2 years of social media experience\nStrong writing and communication skills\nFamiliarity with major social platforms\nBasic graphic design skills (Canva or similar)\nData-driven mindset with experience in analytics',
    salary: '€35,000 – €45,000',
    featured: false,
  },
  {
    title: 'Brand Strategist',
    company: 'GoDaddy',
    location: 'Marseille, France',
    category: 'Marketing',
    type: 'Full-Time',
    description:
      'GoDaddy is looking for a Brand Strategist to help define and articulate our brand positioning in international markets. You will develop brand strategies that resonate with entrepreneurs and small business owners worldwide.\n\nYou will conduct market research, competitive analysis, and work with creative teams to bring strategies to life.',
    requirements:
      '5+ years of brand strategy experience\nStrong analytical and research skills\nExperience in developing brand positioning frameworks\nExcellent presentation and storytelling skills\nInternational market experience preferred',
    salary: '€70,000 – €95,000',
    featured: false,
  },
  {
    title: 'Data Analyst',
    company: 'Twitter',
    location: 'San Diego, US',
    category: 'Technology',
    type: 'Full-Time',
    description:
      'Twitter is looking for a Data Analyst to join our growth analytics team. You will analyze large datasets to uncover insights that drive product decisions and business strategy.\n\nYou will build dashboards, conduct ad-hoc analyses, and present findings to senior stakeholders.',
    requirements:
      '3+ years of data analysis experience\nStrong SQL skills\nProficiency in Python or R for statistical analysis\nExperience with BI tools (Tableau, Looker, or similar)\nStrong communication and presentation skills',
    salary: '$95,000 – $130,000',
    featured: false,
  },
  {
    title: 'HR Manager',
    company: 'Webflow',
    location: 'Lucern, Switzerland',
    category: 'Human Resource',
    type: 'Full-Time',
    description:
      'Webflow is looking for an HR Manager to help build and scale our people operations. You will own the full employee lifecycle from recruitment to offboarding, ensuring an exceptional experience for our team members.\n\nYou will develop HR policies, manage benefits administration, handle employee relations, and partner with managers to drive organizational effectiveness.',
    requirements:
      '5+ years of HR management experience\nKnowledge of Swiss employment law\nExperience with HRIS systems\nStrong interpersonal and conflict resolution skills\nHR certification (SHRM, CIPD) preferred',
    salary: 'CHF 90,000 – CHF 120,000',
    featured: false,
  },
  {
    title: 'Interactive Developer',
    company: 'Terraform',
    location: 'Hamburg, Germany',
    category: 'Engineering',
    type: 'Full-Time',
    description:
      'Terraform is looking for an Interactive Developer to create immersive web experiences for our enterprise clients. You will build interactive data visualizations, 3D experiences, and creative web applications.\n\nYou will work at the intersection of design and engineering, translating creative concepts into polished, performant experiences.',
    requirements:
      '4+ years of frontend development experience\nStrong experience with WebGL, Three.js, or similar\nProficiency in JavaScript/TypeScript and React\nExperience with creative coding tools (p5.js, GSAP)\nPortfolio demonstrating creative web work',
    salary: '€75,000 – €100,000',
    featured: false,
  },
  {
    title: 'Backend Engineer',
    company: 'Stripe',
    location: 'Dublin, Ireland',
    category: 'Engineering',
    type: 'Remote',
    description:
      'Stripe is looking for a Backend Engineer to work on our payments infrastructure. You will design and build highly reliable, scalable services that process billions of dollars in transactions every year.\n\nYou will work on challenging distributed systems problems, collaborating with a world-class engineering team.',
    requirements:
      '4+ years of backend engineering experience\nStrong experience with Ruby, Go, or Java\nDeep understanding of distributed systems\nExperience with high-traffic, high-availability systems\nPassion for writing clean, testable code',
    salary: '€95,000 – €140,000',
    featured: false,
  },
];

async function main() {
  console.log('🌱 Seeding database...');
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }

  console.log(`✅ Seeded ${jobs.length} jobs successfully.`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());