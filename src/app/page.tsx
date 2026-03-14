import dynamic from "next/dynamic";
// import { getDevToPosts } from "@/lib/devto";
import LoadingGate from "@/components/layout/LoadingGate";
import RenderOnInteraction from "@/components/layout/RenderOnInteraction";
import RenderOnView from "@/components/layout/RenderOnView";

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
    <LoadingGate>
      {/* <NoiseOverlay /> */}

      <Navbar />
      <RenderOnInteraction events={["pointermove", "pointerdown", "touchstart"]}>
        <SplashCursor />
      </RenderOnInteraction>

      <RenderOnInteraction>
        <MusicPlayer />
      </RenderOnInteraction>

      <main className="text-foreground selection:bg-primary/30 relative overflow-visible">
        <Hero />

        <RenderOnView anchorId="about" minHeightClassName="min-h-[90vh]">
          <About />
        </RenderOnView>

        <RenderOnView minHeightClassName="min-h-[100vh]">
          <ReadyToStart />
        </RenderOnView>

        <RenderOnView
          anchorId="skills"
          minHeightClassName="min-h-[800vh]"
          rootMargin="500px 0px"
        >
          <SkillsShowcase />
        </RenderOnView>


        {/* <Process /> */}
        {/* 
        <DevToPosts posts={posts} />
        <Contact /> */}

        <RenderOnView minHeightClassName="min-h-[280px]">
          <Footer />
        </RenderOnView>

      </main>

    </LoadingGate>
  );
}
