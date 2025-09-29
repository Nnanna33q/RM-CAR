import ListingsComponent from "@/components/ui/listings"
import Footer from "@/components/ui/footer";
import { useEffect } from "react";

export default function Listings() {
    useEffect(() => {
        document.title = 'Listings';
    }, []);

    return (
        <div>
            <ListingsComponent />
            <Footer />
        </div>
    )
}