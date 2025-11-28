import Hero from './Hero';

export default function PageContent() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* New Shadow Headline Section */}
      <section className="relative bg-black text-white px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <p className="mb-5 text-xs tracking-[0.25em] text-white/40 uppercase">
            Below the fold
          </p>
          <h2 className="shadow-headline text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Built to make your brand
            <br />
            impossible to ignore.
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl">
            This space is where we’ll start your story-driven scroll experience — a calm,
            cinematic transition from the hero into the narrative of your brand, crafted
            for modern businesses that care about every pixel.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#solutions">Solutions</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#about">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Social Links</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="https://www.instagram.com/aelio.web?igsh=MWRicGNidHNlZXduaA==">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-white/70">info@aelio.dev</p>
            </div>
          </div>
          <div className="text-center text-white/50 text-sm">
            © {new Date().getFullYear()} Aelio. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

