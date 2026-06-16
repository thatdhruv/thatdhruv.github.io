export const personal = {
  name: "Dhruv Trivedi",
  title: "Full-Stack & Systems Engineer",
  tagline:
    "I design and ship distributed systems, APIs, and cloud infrastructure — with the frontend polish to deliver complete products end to end.",
  email: "dhruvjit26@gmail.com",
  phone: "(346) 401-9609",
  location: "Houston, TX",
  links: {
    linkedin: "https://linkedin.com/in/thatdhruv",
    github: "https://github.com/thatdhruv",
    website: "https://thatdhruv.github.io",
    resume: "/Dhruvs-Resume.pdf",
  },
};

export const about = {
  paragraphs: [
    "I'm an MS Computer Science student at the University of Houston who builds production systems across the stack — from Kafka pipelines and Spring Boot services to React dashboards and cloud deployments on AWS.",
    "My recent work includes a metal additive manufacturing Digital Twin on AWS, a distributed trading engine processing 1,000+ events per second, and RAG platforms serving 500+ requests per second on Lambda.",
    "I care about reliability, observability, and clean interfaces. Whether it's gRPC microservices, Terraform infrastructure, or a Next.js client, I aim to ship software that teams can run and extend.",
  ],
  stats: [
    { value: "50GB+", label: "Research data pipelined via Spark & Airflow" },
    { value: "1,000+", label: "Matching events/sec in distributed engine" },
    { value: "8s → <1s", label: "API latency after Redis-backed caching" },
  ],
};

export const skillCategories = [
  {
    title: "Backend & APIs",
    highlight: true,
    skills: [
      "Spring Boot",
      "FastAPI",
      "ASP.NET Core",
      "gRPC",
      "GraphQL",
      "REST",
      "Node.js",
    ],
  },
  {
    title: "Data & Infrastructure",
    highlight: true,
    skills: [
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Apache Spark",
      "Airflow",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS",
      "Terraform",
      "GitHub Actions",
      "Lambda",
      "Prometheus",
      "Grafana",
      "Nginx",
    ],
  },
  {
    title: "Languages",
    skills: [
      "Java",
      "Python",
      "C++",
      "TypeScript",
      "C#",
      "Swift",
      "SQL",
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "React Native",
      "SwiftUI",
    ],
  },
  {
    title: "AI / ML",
    skills: [
      "PyTorch",
      "LangChain",
      "RAG",
      "MCP",
      "Pinecone",
      "scikit-learn",
    ],
  },
];

export const experience = [
  {
    role: "Research Assistant – ML Systems & Cloud",
    company: "University of Houston",
    location: "Houston, TX",
    period: "Jan 2026 – May 2026",
    highlights: [
      "Built a Digital Twin for metal additive manufacturing on AWS (EC2, S3) with auto-scaling and real-time process replication.",
      "Architected a C++/Kafka telemetry pipeline across a 3-broker cluster with microsecond-level synchronization.",
      "Deployed Physics-Informed Neural Networks with Docker, Lambda, Terraform, and GitHub Actions for automated retraining.",
    ],
    tags: ["AWS", "Kafka", "C++", "PyTorch", "Terraform"],
  },
  {
    role: "Research Assistant – Data Engineering & Backend",
    company: "Adani University",
    location: "Ahmedabad, India",
    period: "Jan 2024 – Jun 2024",
    highlights: [
      "Built Spark and Airflow ETL pipelines processing 50GB+ of research data into PostgreSQL.",
      "Developed FastAPI microservices over Kafka streams with Redis caching, reducing dashboard latency from 8s to under 1s.",
      "Delivered React analytics dashboards over GraphQL APIs so researchers could explore results without database access.",
    ],
    tags: ["FastAPI", "Kafka", "Spark", "PostgreSQL", "GraphQL"],
  },
  {
    role: "Software Engineer Intern – Full Stack & Systems",
    company: "DICOT Innovations",
    location: "Ahmedabad, India",
    period: "Dec 2020 – Jan 2024",
    highlights: [
      "Developed Spring Boot services and gRPC interfaces for industrial SCADA systems monitoring 200+ devices.",
      "Optimized Oracle PL/SQL procedures and indexing strategies, reducing critical query latency by 40%.",
      "Built React/Next.js and ASP.NET Core applications with Agile delivery and 85%+ automated test coverage.",
    ],
    tags: ["Spring Boot", "gRPC", "Oracle", "React", "Next.js"],
  },
];

export const projects = [
  {
    name: "Lumina Exchange",
    description:
      "Distributed trading engine in Java/Spring Boot processing 1,000+ matching events per second with Kafka, Redis, and gRPC — containerized on Kubernetes with Prometheus/Grafana observability.",
    tech: ["Java", "Spring Boot", "Kafka", "Kubernetes", "gRPC"],
    category: "Distributed Systems",
    featured: true,
    github: "https://github.com/thatdhruv/lumina-exchange",
  },
  {
    name: "DocuMind AI",
    description:
      "MCP-powered RAG platform using LangChain and Pinecone with 45% improved retrieval accuracy — serverless inference on AWS Lambda and API Gateway at 500+ req/s.",
    tech: ["Python", "LangChain", "Pinecone", "AWS Lambda"],
    category: "AI Platform",
    featured: true,
    github: "https://github.com/thatdhruv/documind-ai",
  },
  {
    name: "Digital Twin Platform",
    description:
      "Real-time metal additive manufacturing twin on AWS with auto-scaling EC2, S3 storage, and a high-frequency C++/Kafka telemetry pipeline for process replication.",
    tech: ["AWS", "Kafka", "C++", "PyTorch", "Terraform"],
    category: "Cloud & ML",
    featured: true,
  },
  {
    name: "Industrial SCADA Stack",
    description:
      "Spring Boot and gRPC services plus React/Next.js clients for monitoring 200+ industrial devices — with Oracle optimizations and comprehensive test suites.",
    tech: ["Spring Boot", "gRPC", "React", "Next.js", "Oracle"],
    category: "Full Stack",
    featured: false,
  },
  {
    name: "Hydrate",
    description:
      "Native iOS hydration-tracking app with SwiftUI, HealthKit, CoreData, and Charts — including notification scheduling and App Store deployment workflows.",
    tech: ["SwiftUI", "HealthKit", "CoreData", "Charts"],
    category: "Mobile",
    featured: false,
    github: "https://github.com/thatdhruv/hydrate",
  },
  {
    name: "Research Data Platform",
    description:
      "Spark/Airflow ETL into PostgreSQL with FastAPI services over Kafka and Redis — plus GraphQL-backed dashboards for experiment visualization.",
    tech: ["Spark", "Airflow", "FastAPI", "PostgreSQL", "GraphQL"],
    category: "Data Engineering",
    featured: false,
  },
];

export const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "University of Houston",
    location: "Houston, TX",
    period: "Aug 2024 – May 2026",
    detail: "GPA: 3.8",
  },
  {
    degree: "Bachelor of Engineering in ICT",
    school: "Adani University",
    location: "Ahmedabad, India",
    period: "Nov 2020 – Jul 2024",
    detail: null,
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const heroStack = [
  "Java",
  "Python",
  "AWS",
  "Kafka",
  "Spring Boot",
  "React",
];
