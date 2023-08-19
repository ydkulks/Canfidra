import Link from "next/link";
export default function Navbar() {
  return (
    <div className="p-2 flex justify-end">
      <Link className="pr-5 dark:hover:text-slate-500" href="/">Home</Link>
      <Link className="pr-5 dark:hover:text-slate-500" href="/dashboard">Dashboard</Link>
    </div>
  );
}
