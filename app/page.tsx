import Navbar from "./components/layout/Navbar";
import PageContent from "./components/sections/PageContent";
import Footer from "./components/layout/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#f5f1e8] min-h-screen">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
