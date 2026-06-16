import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { features } from "@/config/features";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhruv Trivedi | Full-Stack & Systems Engineer",
  description:
    "Portfolio of Dhruv Trivedi — Full-stack engineer building distributed systems, cloud infrastructure, and production APIs.",
  keywords: [
    "Dhruv Trivedi",
    "Full-Stack Engineer",
    "Backend Engineer",
    "Systems Engineer",
    "Java",
    "Python",
    "AWS",
    "Kafka",
    "Portfolio",
  ],
  authors: [{ name: "Dhruv Trivedi" }],
  openGraph: {
    title: "Dhruv Trivedi | Full-Stack & Systems Engineer",
    description:
      "Building distributed systems, APIs, and cloud infrastructure with end-to-end product delivery.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon-light.svg", type: "image/svg+xml" }],
  },
};

const initScript = `
(function () {
  try {
    var aesthetic = '${features.aesthetic}';
    var stored = localStorage.getItem('theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var defaultTheme = aesthetic === 'neon' ? (prefersLight ? 'light' : 'dark') : 'light';
    var theme = stored === 'light' || stored === 'dark' ? stored : defaultTheme;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-aesthetic', aesthetic);
    var favicon = theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
    var iconLink = document.querySelector('link[data-theme-icon]') || document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.type = 'image/svg+xml';
    iconLink.setAttribute('data-theme-icon', 'true');
    iconLink.href = favicon;
    if (!iconLink.parentNode) document.head.appendChild(iconLink);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-aesthetic', '${features.aesthetic}');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-aesthetic={features.aesthetic}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
