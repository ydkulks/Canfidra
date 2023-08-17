import { IcRoundVideocam, IcBaselineMic, IcRoundScreenShare } from "./icons";
// Declaring prop type
interface FunctionalTrayProps {
  screenShare: boolean;
  setScreenShare: any;
  mic: boolean;
  setMic: any;
  camera: boolean;
  setCamera: any;
}
const FunctionalTray: React.FC<FunctionalTrayProps> = ({
  screenShare,
  setScreenShare,
  mic,
  setMic,
  camera,
  setCamera,
}) => {
  return (
    <div className="flex justify-center">
      <button
        className="p-2 rounded-full hover:dark:bg-slate-700"
        onClick={() => setCamera(!camera)}
      >
        <IcRoundVideocam />
      </button>
      <button
        className="p-2 rounded-full hover:dark:bg-slate-700"
        onClick={() => setMic(!mic)}
      >
        <IcBaselineMic />
      </button>
      <button
        className="p-2 rounded-full hover:dark:bg-slate-700"
        onClick={() => setScreenShare(!screenShare)}
      >
        <IcRoundScreenShare />
      </button>
    </div>
  );
};

export default FunctionalTray;
