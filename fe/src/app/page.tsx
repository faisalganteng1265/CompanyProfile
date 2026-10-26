import LandingV2 from "@/components/landing-v2";
import "./landing-v2.css";

export default function Home() {
  return (
    <>
      <noscript>
        <style>{`.landing-intro{display:none!important}.home-v2[data-intro="loading"] .hero-copy{visibility:visible!important}`}</style>
      </noscript>
      <LandingV2 />
    </>
  );
}
