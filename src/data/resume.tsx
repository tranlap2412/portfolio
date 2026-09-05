import { Icons } from "@/components/icons";
import { FileTextIcon, HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Tran Van Lap",
  initials: "TL",
  url: "https://tranvanlap.vercel.app",
  location: "Ho Chi Minh City",
  locationLink: "https://maps.google.com/?q=Ho+Chi+Minh+City",
  description:
    "Middle–Senior Frontend Developer in Ho Chi Minh City, building scalable web apps, enterprise systems, and Web3 platforms.",
  summary:
    "I'm **Tran Van Lap**, a Frontend Developer with 5+ years of experience building scalable web applications, enterprise management systems, and Web3 platforms using **React.js**, **Next.js**, **Vue.js**, and **TypeScript**. I design reusable component architectures, implement complex business workflows, integrate RESTful APIs and blockchain services, and optimize frontend performance. I can own frontend delivery from requirement analysis through deployment support, including code reviews, technical guidance, and mentoring junior developers.",
  avatarUrl: "/avatar.jpg",
  resumeUrl: "/Tran_Van_Lap_Resume.pdf",
  resumeFileName: "Tran_Van_Lap_Resume.pdf",
  resumeMeta: "2 pages · last updated 2026",
  sourceUrl: "https://github.com/tranlap2412/portfolio",

  stackLanguages: [
    { name: "TypeScript", weight: 40 },
    { name: "JavaScript", weight: 28 },
    { name: "CSS", weight: 18 },
    { name: "Vue", weight: 14 },
  ],

  skillGroups: [
    {
      name: "Interface",
      skills: [
        "React.js",
        "Next.js",
        "Vue.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "TailwindCSS",
        "Bootstrap",
        "SCSS",
        "Ant Design",
        "MUI",
        "Figma",
      ],
    },
    {
      name: "State & APIs",
      skills: [
        "REST APIs",
        "WebSocket",
        "Axios",
        "Authentication & Authorization",
        "Redux",
        "Redux Toolkit",
        "Zustand",
        "TanStack Query",
        "Context API",
      ],
    },
    {
      name: "Web3",
      skills: [
        "Web3.js",
        "Ethers.js",
        "Wallet & Smart Contract Integration",
      ],
    },
    {
      name: "Delivery",
      skills: [
        "Component Architecture",
        "Performance Optimization",
        "Code Review",
        "Jest",
        "Git",
        "ChatGPT",
        "Claude",
        "Cursor",
        "Requirement Analysis",
        "Agile/Scrum",
        "Technical Mentoring",
      ],
    },
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    {
      href: "/Tran_Van_Lap_Resume.pdf",
      icon: FileTextIcon,
      label: "Resume",
      download: true,
    },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  contact: {
    email: "tranvanlap2069@gmail.com",
    tel: "0375411324",
    github: "tranlap2412",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/tranlap2412",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/tranvanlap/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Telegram: {
        name: "Telegram",
        url: "https://t.me/williambond2412",
        icon: Icons.telegram,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:tranvanlap2069@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Pione Group",
      href: "https://pionegroup.com",
      location: "Ho Chi Minh City",
      title: "Frontend Developer",
      logoUrl: "https://pionegroup.com/favicon.ico",
      start: "Jul 2023",
      end: "Sep 2026",
      description:
        "Developed and maintained 20+ web projects across Web3/Blockchain, E-commerce, Admin/Back-office, Real Estate, Agriculture, and Data Management using React.js, Next.js, Vue.js, and TypeScript.\n\n- Designed scalable frontend architecture, reusable UI components, and shared patterns.\n- Built complex workflows: CRUD, dynamic forms, dashboards, data tables, search, filtering, pagination, and data visualization.\n- Integrated REST APIs, third-party services, WebSockets, and blockchain interactions with Web3.js and Ethers.js.\n- Owned frontend delivery from requirement analysis and technical design through debugging, performance optimization, and maintenance.\n- Optimized performance with Lighthouse, React Profiler, and Chrome DevTools.\n- Conducted code reviews, coordinated frontend tasks, and mentored 3–5 junior developers and interns.\n- Built an internal Recruitment Management System for job postings, candidate management, and recruitment workflows, including dynamic forms, validation, data tables, Axios, and TanStack Query with Ant Design and Material UI.",
    },
    {
      company: "Salto Vietnam",
      href: "https://salto.vn",
      location: "Ho Chi Minh City",
      title: "Frontend Developer (Onsite)",
      logoUrl: "/logos/salto.png",
      start: "Jan 2023",
      end: "Jun 2023",
      description:
        "- Developed and maintained responsive web applications using React.js, Vue.js, and JavaScript.\n- Built reusable frontend components and integrated RESTful APIs for business applications.\n- Collaborated with backend developers to ship features, troubleshoot issues, and improve system performance.",
    },
    {
      company: "EG Group",
      href: "https://www.e-ggroup.com/",
      location: "Ho Chi Minh City",
      title: "Frontend Developer (Onsite)",
      logoUrl: "/logos/eg.png",
      start: "Jun 2021",
      end: "Dec 2022",
      description:
        "- Developed responsive web interfaces for EG Group's software and blockchain products using React.js, Vue.js, and JavaScript.\n- Built reusable UI components and integrated RESTful APIs for client websites and internal tools.\n- Worked onsite with designers and backend developers to ship features, fix issues, and keep the interface consistent.",
    },
  ],

  education: [
    {
      school: "University of Information Technology (UIT)",
      href: "https://www.uit.edu.vn/",
      degree: "Bachelor of Information Technology",
      logoUrl:
        "https://yt3.googleusercontent.com/ytc/AIdro_lnnwDFzWImEqnIJy9wcIA2Fk-b3HYzo7DEI2IBc52y3w=s160-c-k-c0x00ffffff-no-rj",
      start: "2026",
      end: "2026",
    },
    {
      school: "Thu Duc College of Technology (TDC)",
      href: "https://tdc.edu.vn/",
      degree: "Associate Degree in Information Technology",
      logoUrl: "/logos/tdc-mark.png",
      start: "2022",
      end: "2022",
    },
  ],

  projects: [
    {
      title: "Pione Chain",
      href: "https://pionechain.com",
      dates: "",
      active: true,
      description:
        "High-performance blockchain infrastructure for enterprise-scale decentralized applications and secure asset management.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione Trace",
      href: "https://pionetrace.com",
      dates: "",
      active: true,
      description:
        "Digital infrastructure for identification, authentication, traceability, and tokenization of real-world assets in agriculture, commodities, and real estate.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione NFT",
      href: "https://nft.pionewallet.com",
      dates: "",
      active: true,
      description:
        "NFT minting, holdings, and ecosystem rewards for assets on the Pione wallet.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione Wallet",
      href: "https://pionewallet.com",
      dates: "",
      active: true,
      description:
        "A digital asset wallet for storing, managing, and transacting assets securely, as a gateway into decentralized finance.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione Dream",
      href: "https://pionedream.com",
      dates: "",
      active: true,
      description:
        "A platform connecting technology startups with investors, with support for matching, pitching, and fundraising.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione House",
      href: "https://pionehouse.com",
      dates: "",
      active: true,
      description:
        "Blockchain identification and authentication for real estate, so property records and transactions are easier to verify.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione Mart",
      href: "https://pionemart.com",
      dates: "",
      active: true,
      description:
        "Decentralized e-commerce for safer shopping, with on-chain trust signals and secure payments.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione Swap",
      href: "https://pioneswap.com",
      dates: "",
      active: true,
      description:
        "A decentralized exchange for swapping assets, providing liquidity, and trading digital assets and security tokens.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "ExPione",
      href: "https://expione.com",
      dates: "",
      active: true,
      description:
        "Digital-asset and security-token trading, with AI used to improve execution efficiency and security.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione Zero",
      href: "https://zeroscan.org",
      dates: "",
      active: true,
      description:
        "A gas-free blockchain for practical business applications, with EVM compatibility and developer tooling.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione Charity",
      href: "https://pionecharity.com",
      dates: "",
      active: true,
      description:
        "A decentralized charity fund that records contributions on-chain so donations stay transparent.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Pione Bot",
      href: "https://pionebot.com",
      dates: "",
      active: true,
      description: "AI and automated trading for the Pione ecosystem.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Recruitment Management Platform",
      href: "",
      dates: "",
      active: true,
      description:
        "Internal hiring tool for job posts, candidates, and recruitment workflows, with validated forms and data tables.",
      technologies: [],
      links: [],
      image: "",
      video: "",
    },
  ],

  ecosystem: [
    {
      name: "Pione Chain",
      href: "https://pionechain.com",
      domain: "pionechain.com",
      description: "Blockchain for real-world asset tokenization.",
    },
    {
      name: "Pione NFT",
      href: "https://nft.pionewallet.com",
      domain: "nft.pionewallet.com",
      description: "NFT minting, holdings, and ecosystem rewards.",
    },
    {
      name: "Pione Trace",
      href: "https://pionetrace.com",
      domain: "pionetrace.com",
      description: "Blockchain traceability and RWA tokenization.",
    },
    {
      name: "Pione Wallet",
      href: "https://pionewallet.com",
      domain: "pionewallet.com",
      description: "Wallet for storing and transacting digital assets.",
    },
    {
      name: "Pione Dream",
      href: "https://pionedream.com",
      domain: "pionedream.com",
      description: "Platform connecting startups with investors.",
    },
    {
      name: "Pione House",
      href: "https://pionehouse.com",
      domain: "pionehouse.com",
      description: "Real-estate identification and authentication.",
    },
    {
      name: "Pione Mart",
      href: "https://pionemart.com",
      domain: "pionemart.com",
      description: "Decentralized e-commerce marketplace.",
    },
    {
      name: "Pione Swap",
      href: "https://pioneswap.com",
      domain: "pioneswap.com",
      description: "Decentralized exchange for digital assets.",
    },
    {
      name: "ExPione",
      href: "https://expione.com",
      domain: "expione.com",
      description: "Digital-asset trading with AI-assisted security.",
    },
    {
      name: "Pione Zero",
      href: "https://zeroscan.org",
      domain: "zeroscan.org",
      description: "Gas-free blockchain for business applications.",
    },
    {
      name: "Pione Charity",
      href: "https://pionecharity.com",
      domain: "pionecharity.com",
      description: "Transparent decentralized charity fund.",
    },
    {
      name: "Pione Solution",
      href: "https://pionesolution.com",
      domain: "pionesolution.com",
      description: "Tokenization, blockchain, and AI software.",
    },
    {
      name: "Pione Bot",
      href: "https://pionebot.com",
      domain: "pionebot.com",
      description: "AI and automated trading.",
    },
  ],

  personalProjects: [
    {
      title: "Phả hệ gia tộc",
      href: "https://genealogy-management-system.vercel.app/",
      description:
        "Frontend for a Vietnamese genealogy site, with a digital identity for each clan on Pione Trace.",
    },
    {
      title: "Verdora",
      href: "https://pionetrace-v2.vercel.app/",
      description:
        "Frontend for the traceability site: farm and lot identity, QR labels, and provenance from field to buyer.",
    },
    {
      title: "Pione Trace Store",
      href: "https://pionetrace-ecommerce.vercel.app/",
      description:
        "Frontend for the produce store, with lot identity and a blockchain origin lookup.",
    },
    {
      title: "Pione Group",
      href: "https://pione-group.vercel.app/",
      description:
        "Frontend for the company site covering products, services, and the Pione Group story.",
    },
    {
      title: "DreamForge",
      href: "https://hackathon-event-five.vercel.app/",
      description:
        "Independent demo of a hackathon event platform, with challenge tracks, a schedule, registration, and project submission.",
    },
    {
      title: "SCF Blue",
      href: "https://carbon-credits-flax.vercel.app/",
      description: "Web3 platform for carbon credits.",
    },
    {
      title: "Trầm Hương Lượng Tử",
      href: "https://agarwood-commerce.vercel.app/",
      description: "Commerce site for Trầm Hương Lượng Tử agarwood.",
    },
  ],

  activities: [
    {
      title: "Technical Judge – AI Hackathon Pione Dream 2025",
      description: "Evaluated projects in AI, Blockchain, and Web3.",
    },
    {
      title: "Semifinalist – VietChain Talents",
      description: "Reached the semifinals of a Blockchain competition.",
    },
  ],
} as const;
