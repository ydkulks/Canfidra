import { IcRoundVideocam, IcBaselineMic } from "./icons";
export default function FunctionalTray() {
  return (
    <div>
      <button className="p-2 dark:hover:text-slate-500">
        <IcRoundVideocam />
      </button>
      <button className="p-2 dark:hover:text-slate-500">
        <IcBaselineMic />
      </button>
    </div>
  );
}
