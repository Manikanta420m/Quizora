import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from './providers';
import Footer from '@/components/ui/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Quizora | AI Quiz Generator & Learning Platform',
  description:
    'Generate adaptive assessments, practice technical skills, study with 3D flashcards, and compete on the global leaderboard. Built with 100% pure JavaScript.',
  keywords: ['Quizora', 'AI Quiz', 'Technical Learning Platform', 'JavaScript', 'React', 'Node.js', 'Flashcards', 'Leaderboard', 'Gamification'],
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('quizora-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col text-[#111827] antialiased selection:bg-[#2563EB]/15 selection:text-[#2563EB] relative">
        {/* Subtle Ambient Light Texture Layer */}
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: "url('/images/ambient-pattern.jpg')" }}
          aria-hidden="true"
        />
        <Providers>
          <div className="flex-1 flex flex-col relative z-10">{children}</div>
          <div className="relative z-10">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
