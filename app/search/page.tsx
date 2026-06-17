"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Product = {
  code: string;
  name: string;
  unchin: string;
  genka: string;
  kanrihi: string;
  oroshi: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    import("@/data/products.json").then((data) => {
      setAllProducts(data.default as Product[]);
    });
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = !q
    ? allProducts
    : allProducts.filter(
        (p) => p.name.toLowerCase().includes(q) || p.code.includes(q)
      );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header
        className="flex items-center gap-3 px-4 py-3 shadow-md"
        style={{ backgroundColor: "#cc1a1a" }}
      >
        <Link
          href="/"
          className="text-white hover:text-red-200 transition-colors flex-shrink-0"
          aria-label="トップへ戻る"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-white text-lg font-bold tracking-wide flex-1">原価検索</h1>
        <span className="text-red-200 text-sm">{filtered.length}件</span>
      </header>

      {/* Search bar */}
      <div className="px-4 py-3 bg-white shadow-sm sticky top-0 z-10">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            inputMode="search"
            placeholder="商品名または商品コードで検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent text-gray-800 text-base"
            style={{ "--tw-ring-color": "#cc1a1a" } as React.CSSProperties}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <main className="flex-1 px-3 py-3">
        <div className="max-w-2xl mx-auto">
          {allProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-300">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-red-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm">読み込み中...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg font-medium">該当する商品が見つかりません</p>
              <p className="text-sm mt-1">別のキーワードで検索してください</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((product) => (
                <div
                  key={product.code}
                  className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
                >
                  <div className="font-bold text-gray-800 text-base mb-1">
                    <Highlight text={product.name} query={query} />
                  </div>
                  <div className="text-xs text-gray-400 font-mono mb-3">
                    {product.code}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg py-2 px-1">
                      <div className="text-xs text-gray-400 mb-0.5">運賃(ｱｲｱｲﾃｰ)</div>
                      <div className="text-sm font-semibold text-gray-700">
                        ¥{Number(product.unchin).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg py-2 px-1">
                      <div className="text-xs text-gray-400 mb-0.5">原価</div>
                      <div className="text-sm font-semibold text-gray-700">
                        ¥{Number(product.genka).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg py-2 px-1">
                      <div className="text-xs text-gray-400 mb-0.5">一般管理費</div>
                      <div className="text-sm font-semibold text-gray-700">
                        ¥{Number(product.kanrihi).toFixed(2)}
                      </div>
                    </div>
                    <div className="rounded-lg py-2 px-1" style={{ backgroundColor: "#fff0f0" }}>
                      <div className="text-xs mb-0.5" style={{ color: "#cc1a1a", opacity: 0.7 }}>最低卸売</div>
                      <div className="text-sm font-bold" style={{ color: "#cc1a1a" }}>
                        ¥{Number(product.oroshi).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;
  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="rounded px-0.5" style={{ backgroundColor: "#fcd34d", color: "#1a1a1a" }}>
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </span>
  );
}
