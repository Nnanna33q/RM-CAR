import { AccentSpinner } from "./spinner";

export default function Preloader() {
    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center overflow-hidden bg-black">
            <span className="text-accent-color flex items-baseline text-3xl">L<AccentSpinner />ading...</span>
        </div>
    )
}