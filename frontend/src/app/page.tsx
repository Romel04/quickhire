import CategorySection from "@/components/home/CategorySection";
import CompanyLogos from "@/components/home/CompanyLogos";
import CTABanner from "@/components/home/CtaBanner";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import HeroSection from "@/components/home/Herosection";
import LatestJobs from "@/components/home/LatestJobs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CompanyLogos />
      <CategorySection />
      <CTABanner />
      <FeaturedJobs />
      <LatestJobs />
      <Footer />
    </div>
  )
}