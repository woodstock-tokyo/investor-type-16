import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TypesCarousel } from "@/components/types-carousel";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Types Carousel */}
      <TypesCarousel />

      <div className="container mx-auto px-4 pb-16 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            あなたの投資家タイプは？
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400">
            16の質問で見つける、あなたに最適な投資スタイル
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-500">
            リスク許容度、意思決定スタイル、時間軸、判断基準の4つの軸から、
            あなたの投資家タイプを診断します
          </p>
        </div>

        {/* CTA Button */}
        <Link href="/test?q=0&reset=true">
          <Button size="lg" className="text-lg px-8 py-6 mb-16">
            診断を始める
          </Button>
        </Link>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-3xl mb-2">📊</div>
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
                <div className="text-3xl mb-2">⏱️</div>
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
                <div className="text-3xl mb-2">🎯</div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-50">
            インベスタータイプ16とは？
          </h2>

          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="space-y-8">
                <p className="text-center text-lg text-slate-700 dark:text-slate-300 mb-8">
                  4つの軸の組み合わせで、あなたの投資スタイルを16タイプに分類します
                </p>

                {/* Risk Tolerance Axis */}
                <div className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    R / S - リスク許容度
                  </div>
                  <div className="space-y-2 text-slate-600 dark:text-slate-400 pl-4">
                    <p><strong className="text-slate-900 dark:text-slate-50">R (Risk-taking):</strong> 高リスク・高リターンを好み、積極的に投資機会を追求するタイプ</p>
                    <p><strong className="text-slate-900 dark:text-slate-50">S (Stable):</strong> 安定性を重視し、リスクを抑えた慎重な投資を好むタイプ</p>
                  </div>
                </div>

                {/* Decision Making Axis */}
                <div className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    I / D - 意思決定スタイル
                  </div>
                  <div className="space-y-2 text-slate-600 dark:text-slate-400 pl-4">
                    <p><strong className="text-slate-900 dark:text-slate-50">I (Intuitive):</strong> 直感や市場のトレンドを重視して投資判断を行うタイプ</p>
                    <p><strong className="text-slate-900 dark:text-slate-50">D (Data-driven):</strong> データや分析を基に論理的に投資判断を行うタイプ</p>
                  </div>
                </div>

                {/* Time Horizon Axis */}
                <div className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    L / S - 時間軸
                  </div>
                  <div className="space-y-2 text-slate-600 dark:text-slate-400 pl-4">
                    <p><strong className="text-slate-900 dark:text-slate-50">L (Long-term):</strong> 長期的な成長を見据えて、じっくりと資産を育てるタイプ</p>
                    <p><strong className="text-slate-900 dark:text-slate-50">S (Short-term):</strong> 短期的な利益を狙い、機動的に投資を行うタイプ</p>
                  </div>
                </div>

                {/* Value Judgment Axis */}
                <div className="space-y-3 pb-2">
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    P / V - 判断基準
                  </div>
                  <div className="space-y-2 text-slate-600 dark:text-slate-400 pl-4">
                    <p><strong className="text-slate-900 dark:text-slate-50">P (Profit):</strong> 利益の最大化を最優先に考えて投資を行うタイプ</p>
                    <p><strong className="text-slate-900 dark:text-slate-50">V (Value):</strong> 企業の理念や社会的価値も重視して投資を行うタイプ</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-center text-slate-700 dark:text-slate-300">
                    これらの4つの軸の組み合わせにより、<strong>16種類の投資家タイプ</strong>が生まれます
                    <br />
                    <span className="text-sm text-slate-500 dark:text-slate-500 mt-2 inline-block">例：RIDL、SDSP、RILV など</span>
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
