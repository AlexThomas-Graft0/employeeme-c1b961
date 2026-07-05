import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { DualPathHero } from "@/components/DualPathHero";
import { ImpactStats } from "@/components/ImpactStats";
import { HowItWorks } from "@/components/HowItWorks";
import { LiveTrialsBoard } from "@/components/LiveTrialsBoard";
import { MentoringOverview } from "@/components/MentoringOverview";
import { EmployerEnquiry } from "@/components/EmployerEnquiry";
import { SuccessStory } from "@/components/SuccessStory";
import { ContactHub } from "@/components/ContactHub";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"employeeme\",\"description\":\"we are a new type of company that helps young adults with little-to-no qualifications find skills and work without endless courses and dead-end jobs\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"merthyr tydfil\"},\"url\":\"https://employeeme-c1b961.duckbyte.co\"}" }} />
      <Navbar />
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <DualPathHero />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <ImpactStats />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <LiveTrialsBoard />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <MentoringOverview />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <EmployerEnquiry />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <SuccessStory />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <ContactHub />
      </Suspense>
      <Footer />
    </main>
  );
}
