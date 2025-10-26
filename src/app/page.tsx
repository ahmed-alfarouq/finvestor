import AboutUs from "@/components/features/home/about-us";
import HomeNavbar from "@/components/features/home/home-navbar";
import MainBanner from "@/components/features/home/main-banner";
import OurFeatures from "@/components/features/home/our-features";
import SuccessStories from "@/components/features/home/success-stories";

const HomePage = () => {
  return (
    <>
      <HomeNavbar />
      <MainBanner />
      <OurFeatures />
      <AboutUs />
      <SuccessStories />
      <footer className="mt-16 shadow-sm dark:shadow-white p-5 text-center">
        <p>&copy; {new Date().getFullYear()} Finvestor. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;
