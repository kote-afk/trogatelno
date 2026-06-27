import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Works from "@/components/Works";
import Reviews from "@/components/Reviews";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Works />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
