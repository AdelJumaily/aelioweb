
export const metadata = {
  title: "About Aelio | Agency",
  description: "We're a remote-first web agency obsessed with performance and design.",
};

export default function AgencyPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <article className="pt-40 pb-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[1.05] mb-6 text-[#0A0A0A]">
              About Aelio
            </h1>
            <p className="text-xl text-[#6B6B6B]">
              We&apos;re a remote-first web agency obsessed with performance and design.
            </p>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#FF5722] to-[#E64A19]">
            {/* Placeholder for team image */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              Team Photo
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#0A0A0A]">Our Story</h2>
            <p className="text-lg leading-relaxed text-[#0A0A0A] mb-4">
              Aelio was founded on a simple belief: websites should be fast, beautiful, and built to convert. We started as a small team of designers and developers frustrated with bloated, slow websites that looked good but performed poorly.
            </p>
            <p className="text-lg leading-relaxed text-[#0A0A0A] mb-4">
              Today, we work with ambitious brands who understand that their website is their best salesperson. We combine editorial design sensibilities with cutting-edge web technology to create experiences that don&apos;t just look good—they drive results.
            </p>
            <p className="text-lg leading-relaxed text-[#0A0A0A]">
              Every project we take on is an opportunity to push boundaries, challenge conventions, and deliver something exceptional. We don&apos;t build many sites—we build the right ones.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-[#0A0A0A]">What We Believe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Performance First",
                  description: "Speed isn't optional. Every millisecond counts when it comes to user experience and conversions.",
                },
                {
                  title: "Design with Purpose",
                  description: "Beauty that converts. Every design decision serves a business goal.",
                },
                {
                  title: "Code Quality",
                  description: "Clean, maintainable, scalable code that stands the test of time.",
                },
                {
                  title: "Transparency",
                  description: "No surprises, clear communication, and honest timelines from day one.",
                },
              ].map((value, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <h3 className="text-xl font-bold mb-3 text-[#0A0A0A]">
                    {value.title}
                  </h3>
                  <p className="text-base text-[#6B6B6B]">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FF5722] text-white p-16 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Want to work with us?</h2>
            <p className="text-xl opacity-90 mb-8">
              We&apos;re always looking for ambitious brands to partner with.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-[#0A0A0A] rounded-lg font-medium hover:bg-[#FAFAF8] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

