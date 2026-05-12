import type { Metadata } from "next";
import type { ReactNode } from "react";
import { services } from "@/lib/content/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return { title: "Service Not Found | Aelio" };
  return {
    title: `${service.title} Services — DMV Web Design | Aelio`,
    description: `${service.title} by Aelio — boutique web design studio serving the DMV. ${service.description.slice(0, 80).trimEnd()}...`,
  };
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  const serviceSchema = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "ProfessionalService",
          name: "Aelio",
          url: "https://aelio.dev",
        },
        url: `https://aelio.dev/services/${service.id}`,
        serviceType: service.title,
        areaServed: "DMV — Washington DC, Northern Virginia, Maryland",
      }
    : null;

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {children}
    </>
  );
}
