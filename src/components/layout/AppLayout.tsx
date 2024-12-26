import { Header } from "../navigation/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {children}
      </main>
    </div>
  );
};