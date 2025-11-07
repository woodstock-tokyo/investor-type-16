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

  // description を段落ごとに分割（** で始まる行を見出しとして扱う）
  const descriptionLines = investorType.description.split("\n").filter((line) => line.trim());

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Result Header with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-4 order-2 lg:order-1">
              <div className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                {investorType.code}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
                {investorType.name}©
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
                {investorType.shortLabel}
              </p>
            </div>

            {/* Type Image */}
            <div className="flex justify-center order-1 lg:order-2">
              {imageUrl ? (
                <div className="relative w-full max-w-xs aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`${investorType.name}のイメージ`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full max-w-xs aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl">📊</div>
                    <p className="text-slate-500 dark:text-slate-400">
                      {investorType.code}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {descriptionLines.map((line, index) => {
                  // **で囲まれた見出しを処理
                  if (line.startsWith("**") && line.endsWith("**")) {
                    const heading = line.replace(/\*\*/g, "");
                    return (
                      <h3
                        key={index}
                        className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-6 mb-3 first:mt-0"
                      >
                        {heading}
                      </h3>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed whitespace-pre-line"
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Compatibility Section */}
          {(investorType.bestMatches || investorType.goodMatches || investorType.challengeMatches) && (
            <Card>
              <CardContent className="pt-6 pb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
                  🤝 他のタイプとの相性
                </h3>

                <div className="space-y-4">
                  {investorType.bestMatches && investorType.bestMatches.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                        ベストマッチ
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {investorType.bestMatches.map((code) => (
                          <Link key={code} href={`/types/${code}`}>
                            <Button variant="outline" size="sm">
                              <span className="font-mono mr-1.5">{code}</span>
                              <span>{INVESTOR_TYPES[code]?.name}©</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {investorType.goodMatches && investorType.goodMatches.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">
                        相性良好
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {investorType.goodMatches.map((code) => (
                          <Link key={code} href={`/types/${code}`}>
                            <Button variant="outline" size="sm">
                              <span className="font-mono mr-1.5">{code}</span>
                              <span>{INVESTOR_TYPES[code]?.name}©</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {investorType.challengeMatches && investorType.challengeMatches.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-2">
                        チャレンジ相性
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {investorType.challengeMatches.map((code) => (
                          <Link key={code} href={`/types/${code}`}>
                            <Button variant="outline" size="sm">
                              <span className="font-mono mr-1.5">{code}</span>
                              <span>{INVESTOR_TYPES[code]?.name}©</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          {investorType.ctaMessage && (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6 pb-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  次のステップへ
                </h3>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mb-4 max-w-2xl mx-auto px-4">
                  {investorType.ctaMessage}
                </p>
                <a
                  href="https://woodstock.go.link?adj_t=1g32x80c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full max-w-md px-4"
                >
                  <Button size="lg" className="text-sm md:text-base px-4 md:px-6 py-4 md:py-5 w-full">
                    woodstock.clubアプリをダウンロード
                  </Button>
                </a>
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
