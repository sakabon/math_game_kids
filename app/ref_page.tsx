import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/ganzi.png"
            alt=""
            width={1000}
            height={1000}
            priority
            className="rounded-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
          岩爺の計算ゲーム
        </h1>
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
