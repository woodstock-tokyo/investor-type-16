import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TypesCarousel } from "@/components/types-carousel";
import { BarChart3, Clock, Target } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "インベスタータイプ16 - あなたの投資スタイル診断",
  description: "4つの軸から16タイプに分類。あなたに最適な投資戦略を見つけましょう。",
  openGraph: {
    type: "website",
    title: "インベスタータイプ16 - あなたの投資スタイル診断",
    description: "4つの軸から16タイプに分類。あなたに最適な投資戦略を見つけましょう。",
    images: [
      {
        url: "/image/ogp.png",
        width: 1200,
        height: 630,
        alt: "インベスタータイプ16",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "インベスタータイプ16 - あなたの投資スタイル診断",
    description: "4つの軸から16タイプに分類。あなたに最適な投資戦略を見つけましょう。",
    images: ["/image/ogp.png"],
  },
};

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Types Carousel */}
      <TypesCarousel />

      <div className="container mx-auto px-4 pb-16 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            あなたの投資家タイプは？
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400">
            16のタイプで見つける、あなたに最適な投資スタイル
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-500">
            リスク許容度、意思決定スタイル、時間軸、判断基準の4つの軸から、
            あなたの投資家タイプを診断します
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center mb-16">
          {/* 吹き出し */}
          <div className="animate-fade-in-down mb-3">
            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              <span className="font-bold text-xs">無料 & 登録なし</span>
              {/* 吹き出しの三角形 */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-indigo-500"></div>
            </div>
          </div>

          <Link href="/test?q=0&reset=true">
            <Button size="lg" className="text-lg px-8 py-6">
              診断を始める
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-2">
                  <BarChart3 className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="font-semibold text-lg">16タイプ診断</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  4つの軸から構成される16種類の投資家タイプを判定
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-2">
                  <Clock className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-semibold text-lg">所要時間1分</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  16の質問に答えるだけ。気軽に診断できます
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-2">
                  <Target className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className="font-semibold text-lg">最適な戦略</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  あなたのタイプに合った投資戦略をご提案
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What is Investor Type 16 Section */}
        <div className="mt-24 w-full max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-slate-900 dark:text-slate-50">
            インベスタータイプ16とは？
          </h2>

          <Card>
            <CardContent className="pt-6 md:pt-8 pb-6 md:pb-8 px-4 md:px-6">
              <div className="space-y-6 md:space-y-8">
                <p className="text-center text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  4つの軸の組み合わせで、あなたの投資スタイルを16タイプに分類します
                </p>

                {/* Risk Tolerance Axis */}
                <div className="space-y-3 md:space-y-4 border-b border-slate-200 dark:border-slate-700 pb-5 md:pb-6">
                  <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <span className="text-primary">①</span>
                    <span>R / S - リスク許容度</span>
                  </div>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300 pl-0 md:pl-4">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-50 mb-1">R (Risk-taking):</div>
                      <div className="leading-relaxed">高リスク・高リターンを好み、積極的に投資機会を追求するタイプ</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-50 mb-1">S (Stable):</div>
                      <div className="leading-relaxed">安定性を重視し、リスクを抑えた慎重な投資を好むタイプ</div>
                    </div>
                  </div>
                </div>

                {/* Decision Making Axis */}
                <div className="space-y-3 md:space-y-4 border-b border-slate-200 dark:border-slate-700 pb-5 md:pb-6">
                  <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <span className="text-primary">②</span>
                    <span>I / D - 意思決定スタイル</span>
                  </div>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300 pl-0 md:pl-4">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-50 mb-1">I (Intuitive):</div>
                      <div className="leading-relaxed">直感や市場のトレンドを重視して投資判断を行うタイプ</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-50 mb-1">D (Data-driven):</div>
                      <div className="leading-relaxed">データや分析を基に論理的に投資判断を行うタイプ</div>
                    </div>
                  </div>
                </div>

                {/* Time Horizon Axis */}
                <div className="space-y-3 md:space-y-4 border-b border-slate-200 dark:border-slate-700 pb-5 md:pb-6">
                  <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <span className="text-primary">③</span>
                    <span>L / S - 時間軸</span>
                  </div>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300 pl-0 md:pl-4">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-50 mb-1">L (Long-term):</div>
                      <div className="leading-relaxed">長期的な成長を見据えて、じっくりと資産を育てるタイプ</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-50 mb-1">S (Short-term):</div>
                      <div className="leading-relaxed">短期的な利益を狙い、機動的に投資を行うタイプ</div>
                    </div>
                  </div>
                </div>

                {/* Value Judgment Axis */}
                <div className="space-y-3 md:space-y-4 pb-2">
                  <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <span className="text-primary">④</span>
                    <span>P / V - 判断基準</span>
                  </div>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300 pl-0 md:pl-4">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-50 mb-1">P (Profit):</div>
                      <div className="leading-relaxed">利益の最大化を最優先に考えて投資を行うタイプ</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-50 mb-1">V (Value):</div>
                      <div className="leading-relaxed">企業の理念や社会的価値も重視して投資を行うタイプ</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-center text-slate-700 dark:text-slate-300 leading-relaxed">
                    これらの4つの軸の組み合わせにより、<strong className="text-slate-900 dark:text-slate-50">16種類の投資家タイプ</strong>が生まれます
                    <br />
                    <span className="text-sm text-slate-500 dark:text-slate-500 mt-3 inline-block">例：RIDL、SDSP、RILV など</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-sm text-slate-500 dark:text-slate-600">
          <p>診断結果はシェアできます</p>
        </div>
      </div>
    </div>
  );
}
