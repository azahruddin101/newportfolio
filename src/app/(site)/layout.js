import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import CustomCursor from "@/components/chrome/CustomCursor";
import Preloader from "@/components/chrome/Preloader";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import BackToTop from "@/components/chrome/BackToTop";
import CommandPalette from "@/components/chrome/CommandPalette";

export default function SiteLayout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Preloader />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
