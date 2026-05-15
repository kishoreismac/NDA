import "./globals.css";

export const metadata = {
  title: "NDAFlow AI — Intelligent NDA Management",
  description:
    "AI-powered NDA intake, risk scoring, review, signature and tracking platform.",
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
