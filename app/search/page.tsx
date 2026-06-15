"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import products from "@/data/products.json";

type Product = {
  code: string;
  name: string;
  genka: string;
  kanrihi: string;
  oroshi: string;
};

const allProducts = products as Product[];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.code.includes(q)
    );
  }, [query]);

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
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <h1 className="text-white text-lg font-bold tracking-wide flex-1">
          原価検索
        </h1>
        <span className="text-red-200 text-sm">{filtered.length}件</span>
      </header>

      {/* Search bar */}
      <div className="px-4 py-3 bg-white shadow-sm sticky top-0 z-10">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            placeholder="商品名または商品コードで検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent text-gray-800 text-base"
            style={{ "--tw-ring-color": "#cc1a1a" } as React.CSSProperties}
            autoFocus
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

      {/* Table */}
      <main className="flex-1 px-2 py-3 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg font-medium">該当する商品が見つかりません</p>
              <p className="text-sm mt-1">別のキーワードで検索してください</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Table header */}
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#cc1a1a" }} className="text-white">
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">商品コード</th>
                    <th className="px-3 py-3 text-left font-semibold">商品名</th>
                    <th className="px-3 py-3 text-right font-semibold whitespace-nowrap">原価</th>
                    <th className="px-3 py-3 text-right font-semibold whitespace-nowrap">一般管理費</th>
                    <th className="px-3 py-3 text-right font-semibold whitespace-nowrap">最低卸売金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((product, idx) => (
                    <tr
                      key={product.code}
                      className={
                        idx % 2 === 0
                          ? "bg-white hover:bg-red-50 transition-colors"
                          : "bg-gray-50 hover:bg-red-50 transition-colors"
                      }
                    >
                      <td className="px-3 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">
                        {product.code}
                      </td>
                      <td className="px-3 py-3 text-gray-800 font-medium">
                        <Highlight text={product.name} query={query} />
                      </td>
                      <td className="px-3 py-3 text-right text-gray-700 font-mono whitespace-nowrap">
                        ¥{Number(product.genka).toFixed(2)}
                      </td>
                      <td className="px-3 py-3 text-right text-gray-700 font-mono whitespace-nowrap">
                        ¥{Number(product.kanrihi).toFixed(2)}
                      </td>
                      <td className="px-3 py-3 text-right font-bold whitespace-nowrap" style={{ color: "#cc1a1a" }}>
                        ¥{Number(product.oroshi).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
