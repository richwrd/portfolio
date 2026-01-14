import dynamic from "next/dynamic";
// import { getDevToPosts } from "@/lib/devto";
import CustomCursor from "@/components/ui/CustomCursor";

const MouseSpotlight = dynamic(() => import("@/components/effects/MouseSpotlight"), {
  loading: () => null,
});

const NoiseOverlay = dynamic(() => import("@/components/effects/NoiseOverlay"), {
  loading: () => null,
});

const FloatingElements = dynamic(
  () => import("@/components/effects/FloatingElements"),
  {
    loading: () => null,
  }
);

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  loading: () => null,
});

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  loading: () => null,
});

// const About = dynamic(() => import("@/components/sections/About"), {
//   loading: () => null,
// });

// const Contact = dynamic(() => import("@/components/sections/Contact"), {
//   loading: () => null,
// });

// const Process = dynamic(() => import("@/components/sections/Process"), {
//   loading: () => null,
// });

// const ReadyToStart = dynamic(() => import("@/components/sections/ReadyToStart"), {
//   loading: () => null,
// });

// const SkillsShowcase = dynamic(() => import("@/components/sections/SkillsShowcase"), {
//   loading: () => null,
// });


const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => null,
});

export default async function Home() {

  // const posts = await getDevToPosts();

  return (
    <>
      {/* <NoiseOverlay /> */}

      {/* <CustomCursor /> */}

      <MouseSpotlight />
      <Navbar />

      <main className="text-foreground selection:bg-primary/30 relative">
        <FloatingElements />
        <Hero />

        {/* <About />
        <Process />
        <SkillsShowcase />
        <ReadyToStart />
        <DevToPosts posts={posts} />
        <Contact /> */}

        <Footer />
      </main>
    </>
  );
}
