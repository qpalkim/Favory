import HeroSection from "./HeroSection";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

export default function MainArticle() {
  return (
    <article className="from-black-500 bg-gradient-to-b via-green-500 to-green-100">
      <section className="mx-auto max-w-[1168px] min-w-[312px] space-y-[210px] pb-40 md:space-y-[300px] md:py-60 lg:space-y-[400px] lg:py-100">
        <HeroSection />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </section>
    </article>
  );
}
