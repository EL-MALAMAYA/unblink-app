// src/app/layout.tsx
import './globals.css'; // Import global styles if you have any

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>UnBlink App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
