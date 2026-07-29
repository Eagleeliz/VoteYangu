import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ChannelViz } from "@/components/home/ChannelViz";
import { StatsRow } from "@/components/home/StatsRow";

export default function HomePage() {
  return (
    <div className="page-transition">
      <HeroSection />
      <HowItWorks />
      <ChannelViz />
      <StatsRow />
    </div>
  );
}
