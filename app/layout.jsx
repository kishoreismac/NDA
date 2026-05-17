import "./globals.css";

export const metadata = {
  title: "CLM — Contract Lifecycle Management",
  description:
    "AI-powered contract lifecycle management — request, draft, review, sign, store and renew. NDA, MSA, SOW, vendor and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
