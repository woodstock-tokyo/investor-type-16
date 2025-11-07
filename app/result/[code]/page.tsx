import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareButtons } from "@/components/share-buttons";
import { getInvestorType, INVESTOR_TYPES, type InvestorCode } from "@/lib/investor-types";
import { getTypeImageUrl } from "@/lib/image-utils";

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function ResultPage({ params }: PageProps) {
  const { code } = await params;
  const investorType = getInvestorType(code);

  if (!investorType) {
    notFound();
  }

  const imageUrl = getTypeImageUrl(investorType.code);

  const renderTypeList = (codes?: InvestorCode[]) => {
    if (!codes || codes.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-2">
        {codes.map((c) => (
          <Link key={c} href={`/result/${c}`}>
            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              {INVESTOR_TYPES[c]?.name || c}
              <span className="ml-1.5 text-xs opacity-70">({c})</span>
            </span>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Result Header */}
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-2">
              <span className="text-sm font-semibold text-primary">
                {investorType.code}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">
              {investorType.name}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {investorType.shortLabel}
            </p>
          </div>

          {/* Type Image */}
          <div className="flex justify-center">
            {imageUrl ? (
              <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={imageUrl}
                  alt={`${investorType.name}のイメージ`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full max-w-md aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-6xl">📊</div>
                  <p className="text-slate-500 dark:text-slate-400">
                    {investorType.code}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {investorType.description && (
            <Card>
              <CardHeader>
                <CardTitle>あなたのタイプについて</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {investorType.description || "このタイプの詳細な説明はまだ準備中です。"}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Ideal Strategy */}
          {investorType.idealStrategy && (
            <Card>
              <CardHeader>
                <CardTitle>理想的な投資戦略</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {investorType.idealStrategy || "理想的な戦略はまだ準備中です。"}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Compatibility */}
          {(investorType.bestMatches || investorType.goodMatches || investorType.challengeMatches) && (
            <Card>
              <CardHeader>
                <CardTitle>相性</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {investorType.bestMatches && investorType.bestMatches.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      ベストマッチ 💚
                    </h3>
                    {renderTypeList(investorType.bestMatches)}
                  </div>
                )}

                {investorType.goodMatches && investorType.goodMatches.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      相性が良い 👍
                    </h3>
                    {renderTypeList(investorType.goodMatches)}
                  </div>
                )}

                {investorType.challengeMatches && investorType.challengeMatches.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      チャレンジング 🤔
                    </h3>
                    {renderTypeList(investorType.challengeMatches)}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Share Section */}
          <div className="space-y-4">
            <h2 className="text-center text-lg font-semibold text-slate-900 dark:text-slate-100">
              結果をシェアする
            </h2>
            <div className="flex justify-center">
              <ShareButtons
                investorCode={investorType.code}
                investorName={investorType.name}
              />
            </div>
          </div>

          {/* Retry Button */}
          <div className="flex justify-center pt-8">
            <Link href="/test">
              <Button variant="outline" size="lg">
                もう一度診断する
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all investor types
export async function generateStaticParams() {
  const codes = Object.keys(INVESTOR_TYPES);
  return codes.map((code) => ({
    code,
  }));
}
