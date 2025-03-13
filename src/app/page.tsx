import AboutUs from "@/components/features/AboutUs";
import HomeHeader from "@/components/features/HomeHeader";
import MainBanner from "@/components/features/MainBanner";
import OurFeatures from "@/components/features/OurFeatures";
import SuccessStories from "@/components/features/SuccessStories";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
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
