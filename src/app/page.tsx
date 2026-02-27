import dynamic from "next/dynamic";
// import { getDevToPosts } from "@/lib/devto";

const NoiseOverlay = dynamic(() => import("@/components/effects/NoiseOverlay"), {
  loading: () => null,
});


const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  loading: () => null,
});

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  loading: () => null,
});

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => null,
});

const SkillsShowcase = dynamic(() => import("@/components/sections/SkillsShowcase"), {
  loading: () => null,
});

const Process = dynamic(() => import("@/components/sections/Process"), {
  loading: () => null,
});

// const Contact = dynamic(() => import("@/components/sections/Contact"), {
//   loading: () => null,
// });

const ReadyToStart = dynamic(() => import("@/components/sections/ReadyToStart"), {
  loading: () => null,
});


const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => null,
});

const MusicPlayer = dynamic(() => import("@/components/ui/MusicPlayer"), {
  loading: () => null,
});

const SplashCursor = dynamic(() => import("@/components/effects/SplashCursor"), {
  loading: () => null,
});

export default async function Home() {

  // const posts = await getDevToPosts();

  return (
    <>
      {/* <NoiseOverlay /> */}

      <Navbar />
      <SplashCursor />
      <MusicPlayer />

      <main className="text-foreground selection:bg-primary/30 relative overflow-visible">
        <Hero />
        <About />
        <ReadyToStart />
        <SkillsShowcase />


        {/* <Process /> */}
        {/* 
        <DevToPosts posts={posts} />
        <Contact /> */}

        <Footer />

      </main>


    </>
  );
}
