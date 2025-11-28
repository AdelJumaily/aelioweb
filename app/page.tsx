import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <PageContent />
    </main>
  );
}
// End of file: app/page.tsx