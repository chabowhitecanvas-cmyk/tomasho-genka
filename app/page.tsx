import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #cc1a1a 0%, #991414 60%, #6b0e0e 100%)",
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-center pt-12 pb-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white">
            {/* トマちゃん画像: public/tomachan.png を配置すると表示されます */}
            <img
              src="/tomachan.svg"
              alt="トマちゃん"
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-wider drop-shadow-lg">
              苫食原価検索システム
            </h1>
            <p className="text-red-200 mt-2 text-sm tracking-widest">
              TOMASHO COST PRICE SEARCH SYSTEM
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md space-y-4 fade-in">
          {/* Search button */}
          <Link href="/search" className="block">
            <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-5 cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-2xl">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#cc1a1a" }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">原価検索</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  商品名・商品コードで原価を検索
                </p>
              </div>
              <div className="ml-auto text-gray-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Info card */}
          <div className="bg-white bg-opacity-15 rounded-2xl p-5 text-white border border-white border-opacity-20">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-red-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-semibold text-red-100">
                システム情報
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-red-200">データ年度</div>
              <div className="font-semibold">2026年</div>
              <div className="text-red-200">登録商品数</div>
              <div className="font-semibold">260件</div>
              <div className="text-red-200">最終更新</div>
              <div className="font-semibold">2026年5月</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-red-300 text-xs">
        © 2026 苫食株式会社
      </footer>
    </div>
  );
}
