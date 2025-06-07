import { Navbar } from "@/components/Shared/Navbar";
import SliderVideo from "../streaming/(routes)/(home)/components/SliderVideo/SliderVideo";

export default function StreamingPage() {
    return (
      <div className="relative bg-zinc-900">
        <Navbar/>
        <SliderVideo/>
      </div>
  );
}
