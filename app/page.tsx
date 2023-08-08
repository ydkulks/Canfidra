import Navbar from "./navbar";
import Video_Audio from "./video_audio";
import FunctionalTray from "./functional_tray";
export default function Home() {
  return (
    <main className="p-10">
      <Navbar />
      <h3 className="text-3xl">Confidra</h3>
      <Video_Audio />
			<FunctionalTray/>
    </main>
  );
}
