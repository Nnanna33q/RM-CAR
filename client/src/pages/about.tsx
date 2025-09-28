import AboutUs from "@/components/ui/about-us";
import StopBy from "@/components/ui/stop-by";
import Location from "@/components/ui/location";
import Footer from "@/components/ui/footer";
import Testimonials from "@/components/ui/testimonials";

export default function About() {
    return (
        <div>
            <AboutUs />
            <StopBy />
            <Location />
            <Testimonials backgroundColor={'#282828'} cardBackgroundColor="black" />
            <Footer />
        </div>
    )
}