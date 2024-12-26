import { Header } from "../navigation/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 safe-padding scroll-touch">
        {children}
      </main>
    </div>
  );
};