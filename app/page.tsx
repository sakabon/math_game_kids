import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="title-container flex min-h-screen flex-col items-center justify-end p-4 pb-5">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-sm rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <Link
            href="/normal-mode"
            className="block w-full bg-blue-500 font-bold text-white p-4 rounded text-2xl hover:bg-blue-600 transition-colors text-center"
          >
            サクッと 20問
          </Link>
          <Link
            href="/time-attack"
            className="block w-full bg-green-500 font-bold text-white p-4 rounded text-2xl hover:bg-green-600 transition-colors text-center"
          >
            20秒 タイムアタック
          </Link>
        </div>
      </div>
    </main>
  );
}
