import AboutUs from "@/components/features/home/AboutUs";
import HomeNavbar from "@/components/features/home/HomeNavbar";
import MainBanner from "@/components/features/home/MainBanner";
import OurFeatures from "@/components/features/home/OurFeatures";
import SuccessStories from "@/components/features/home/SuccessStories";

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
