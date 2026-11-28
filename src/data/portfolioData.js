export const PROFILE = {
  fullName: 'Muhammad Akram',
  initials: 'MA',
  roleTitle: 'Backend & Distributed Systems Engineer',
  headline: 'Java • Spring Boot • Microservices • Spring AI • React',
  heroSummary:
    'Software Engineer building resilient backend services, stateless security layers, and high-clarity full-stack systems. Experienced at 10Pearls (SHINE) with strong foundations in concurrency, JVM internals, and clean software architecture.',
  location: 'Sindh, Pakistan',
  email: 'muhammadakram.se@gmail.com',
  github: 'https://github.com/AkramSE',
  linkedin: 'https://www.linkedin.com/in/muhammad-akram-se',
  leetcode: 'https://leetcode.com/u/AkramSE/',
  resumePath: '/Muhammad_Akram_Resume.pdf',
  statusText: 'Open to Software Engineer / Backend Roles (10Pearls, Systems, Global & Remote)',
};

export const ABOUT = {
  biography:
    'Software Engineering undergraduate at the University of Sindh, Jamshoro (CGPA 3.54/4.00) with industry internship experience at 10Pearls, CodeAlpha, and IncodeVision. I approach software from first principles—reasoning through memory models, concurrency control, API contracts, and static code quality before writing production abstractions.',
  objective:
    'Contribute to high-scale distributed backend and full-stack engineering teams by shipping maintainable Java/Spring Boot services, reliable APIs, and thoughtfully engineered user interfaces.',
  principles: [
    'First-principles debugging across JVM, SQL execution plans, and HTTP/REST contracts',
    'Defense-in-depth security using stateless JWT authentication and strict RBAC',
    'Measurable code quality enforced through SonarQube static analysis and modular design',
    'High ownership and early delivery—shipped 10Pearls capstone 25 days ahead of schedule',
  ],
};

export const ARCHITECTURE_NODES = [
  {
    id: 'client',
    label: 'React Client',
    layer: 'Presentation Tier',
    tech: 'React • ES6+ • Tailwind • Framer Motion',
    summary: 'Responsive client interface with optimistic state updates, accessible navigation, and clean API integration.',
    tradeoff: 'Decoupled SPA allows independent frontend deployments (Vercel) and strict contract boundaries with backend APIs.',
  },
  {
    id: 'security',
    label: 'Auth & RBAC Gateway',
    layer: 'Security Boundary',
    tech: 'Spring Security • JWT • Role-Based Access',
    summary: 'Validates bearer tokens, enforces endpoint authorization rules, and isolates tenant/user resources.',
    tradeoff: 'Stateless JWT avoids server-side session stickiness across horizontal instances while requiring short token lifecycles and validation.',
  },
  {
    id: 'compute',
    label: 'Spring Boot & Concurrency',
    layer: 'Service & Execution Tier',
    tech: 'Java • Spring Boot • ExecutorService • Spring AI',
    summary: 'Layered service orchestration, DTO validation, transactional boundaries, and concurrent worker execution.',
    tradeoff: 'Bounded thread pools and clear service boundaries prevent thread exhaustion under bursty workloads.',
  },
  {
    id: 'persistence',
    label: 'Relational Storage',
    layer: 'Data Tier',
    tech: 'MySQL • Spring Data JPA • Hibernate',
    summary: 'Normalized schemas, indexed queries, and cloud-hosted relational persistence (Aiven MySQL).',
    tradeoff: 'Strong ACID consistency for relational entities and user/placement workflows over eventual consistency.',
  },
];

export const EDUCATION = [
  {
    degree: 'B.S. in Software Engineering',
    institution: 'University of Sindh, Jamshoro',
    period: '2024 – 2027',
    metric: 'CGPA 3.54 / 4.00',
    details:
      'Coursework in Parallel & Distributed Computing, Data Structures & Algorithms, OOP, Operating Systems, and Database Systems. Microsoft Learn Student Ambassador contributor.',
  },
  {
    degree: 'Intermediate (Pre-Engineering)',
    institution: 'BISE Hyderabad / Dadu',
    period: 'Completed',
    metric: '1041 / 1100 (94.6%)',
    details:
      'Strong quantitative foundation in mathematics, physics, and structured problem solving.',
  },
];

export const SKILLS = [
  {
    group: 'Backend & Distributed Systems',
    items: [
      'Java (Core, Collections, Multi-threading)',
      'Spring Boot',
      'Spring Security (JWT, RBAC)',
      'Spring Data JPA & Hibernate',
      'RESTful APIs',
      'Microservices Concepts',
      'Spring AI',
    ],
  },
  {
    group: 'Concurrency & Systems',
    items: [
      'ExecutorService & Thread Pools',
      'Synchronization & Thread Safety',
      'Async Workflows',
      'Stateless Scaling',
      'Linux & Windows Environments',
    ],
  },
  {
    group: 'Frontend & Web',
    items: ['ReactJS', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'PHP'],
  },
  {
    group: 'Data, Quality & Delivery',
    items: ['MySQL', 'SQL', 'Git & GitHub', 'SonarQube', 'Postman', 'Vercel & Railway', 'IntelliJ IDEA & VS Code'],
  },
];

export const PROJECTS = [
  {
    id: 'secure-cms',
    title: 'Secure Contact Management System',
    domain: 'Enterprise Full-Stack',
    featured: true,
    problem: 'Prevent unauthorized access and cross-user exposure in contact management workflows.',
    solution:
      'Built a decoupled Spring Boot REST API with JWT authentication and RBAC, paired with a ReactJS frontend and Aiven MySQL database.',
    stack: ['Java', 'Spring Boot', 'JWT & RBAC', 'ReactJS', 'MySQL', 'SonarQube', 'Railway & Vercel'],
    impact: 'Delivered 25 days early during 10Pearls SHINE; passed SonarQube checks and merged into main repo.',
    repoUrl: 'https://github.com/AkramSE',
    demoUrl: 'https://github.com/AkramSE',
    caseStudy: {
      role: 'Software Engineering Intern — 10Pearls SHINE',
      process:
        'Structured clean controller-service-repository layers, DTO request/response mapping, JWT filter chain security, and React state/API integration.',
      choices:
        'Selected stateless JWT authentication for horizontal scalability and split deployment (Vercel frontend, Railway backend, Aiven MySQL).',
      challenges:
        'Resolved cross-origin configuration across separate deployment origins and refactored code to satisfy SonarQube maintainability and security rules.',
      outcome:
        'Production-ready deployment verified by engineering mentors and merged ahead of schedule.',
    },
  },
  {
    id: 'campus-placement',
    title: 'Campus Placement Portal',
    domain: 'Backend & Workflow Platform',
    featured: false,
    problem: 'Manual spreadsheets slow down student placement tracking, role filtering, and account recovery.',
    solution:
      'Engineered a Spring Boot and ReactJS placement system with role-based access and Java Mail Sender OTP password recovery.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Java Mail Sender', 'MySQL', 'ReactJS'],
    impact: 'Role-segregated workflows with automated OTP email verification.',
    repoUrl: 'https://github.com/AkramSE',
    demoUrl: 'https://github.com/AkramSE',
  },
  {
    id: 'qr-tracker',
    title: 'Real-Time QR Generator, Scanner & Tracker',
    domain: 'Interactive Web System',
    featured: false,
    problem: 'Static QR codes lack live scan visibility during demonstrations and events.',
    solution:
      'Created a real-time QR generation, camera scanning, and scan-event tracking web application.',
    stack: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Camera APIs'],
    impact: 'Demonstrated live in Software Engineering lab evaluation.',
    repoUrl: 'https://github.com/AkramSE',
    demoUrl: 'https://github.com/AkramSE',
  },
  {
    id: 'bank-engine',
    title: 'Bank Account Management System',
    domain: 'Core Java & Data Structures',
    featured: false,
    problem: 'Account lookup and input validation require predictable performance and strict guardrails.',
    solution:
      'Implemented a Core Java banking application using HashMap indexing, regex validation, and modular OOP design.',
    stack: ['Core Java', 'HashMap', 'Regex', 'OOP'],
    impact: 'Fast O(1) account lookup and defensive input validation.',
    repoUrl: 'https://github.com/AkramSE',
    demoUrl: 'https://github.com/AkramSE',
  },
];

export const EXPERIENCE = [
  {
    role: 'Software Engineering Intern (SHINE)',
    org: '10Pearls',
    period: 'Jul 2026 – Oct 2026',
    summary:
      'Developed and live-deployed a full-stack Secure Contact Management System (Spring Boot, ReactJS, MySQL), passed REST API, JavaScript, ReactJS, and SonarQube assessments, and completed deliverables 25 days early.',
  },
  {
    role: 'Java Programming Intern',
    org: 'CodeAlpha',
    period: 'May 2026 – Jun 2026',
    summary:
      'Built Core Java applications including Stock Trading Platform, Hotel Reservation System, and Student Grade Tracker using OOP and structured state management.',
  },
  {
    role: 'Java Programming Intern',
    org: 'IncodeVision',
    period: 'May 2026',
    summary:
      'Implemented a Bank Account Management System in Java leveraging HashMap collections and regex validation.',
  },
];

export const CERTIFICATIONS = [
  { title: '10Pearls SHINE Internship Certificate', issuer: '10Pearls', date: 'Oct 2026', url: 'https://www.linkedin.com/in/muhammad-akram-se' },
  { title: 'REST API (Intermediate)', issuer: 'HackerRank', date: 'Sep 2026', url: 'https://www.hackerrank.com' },
  { title: 'Problem Solving (Intermediate)', issuer: 'HackerRank', date: 'Jun 2026', url: 'https://www.hackerrank.com' },
  { title: 'SQL (Intermediate)', issuer: 'HackerRank', date: 'Jun 2026', url: 'https://www.hackerrank.com' },
  { title: 'Java (Basic)', issuer: 'HackerRank', date: 'Apr 2026', url: 'https://www.hackerrank.com' },
];

export const ACHIEVEMENTS = [
  {
    title: 'Early Capstone Delivery — 10Pearls SHINE',
    detail: 'Completed and deployed the full-stack project 25 days ahead of schedule with PR merge and SonarQube compliance.',
  },
  {
    title: 'Academic Standing — 3.54 / 4.00 CGPA',
    detail: 'Consistent academic performance in BS Software Engineering at the University of Sindh alongside 94.6% in Intermediate.',
  },
  {
    title: 'Public Engineering & DSA Repositories',
    detail: 'Maintains active GitHub repositories for Java backend systems and Data Structures & Algorithms practice.',
  },
];