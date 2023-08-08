import { IcRoundVideocam, IcBaselineMic } from "./icons";
export default function FunctionalTray() {
  return (
    <div>
      <button>
        <IcRoundVideocam />
      </button>
      <button>
        <IcBaselineMic />
      </button>
    </div>
  );
}
