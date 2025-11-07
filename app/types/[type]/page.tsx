import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { INVESTOR_TYPES, InvestorCode } from "@/lib/investor-types";
import { getTypeImageUrl } from "@/lib/image-utils";

interface TypeDetailPageProps {
  params: Promise<{
    type: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(INVESTOR_TYPES).map((code) => ({
    type: code,
  }));
}

export default async function TypeDetailPage({ params }: TypeDetailPageProps) {
  const resolvedParams = await params;
  const typeCode = resolvedParams.type.toUpperCase() as InvestorCode;
  const typeData = INVESTOR_TYPES[typeCode];

  if (!typeData) {
    notFound();
  }

  const imageUrl = getTypeImageUrl(typeData.code);

  // description を段落ごとに分割（** で始まる行を見出しとして扱う）
  const descriptionLines = typeData.description.split("\n").filter((line) => line.trim());

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-3xl font-bold text-slate-500 dark:text-slate-400 mb-2">
            {typeData.code}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            {typeData.name}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {typeData.shortLabel}
          </p>
        </div>

        {/* Type Image */}
        <div className="flex justify-center mb-8">
          {imageUrl ? (
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={`${typeData.name}のイメージ`}
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
                  {typeData.code}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <Card className="mb-8">
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

        {/* Ideal Strategy */}
        {typeData.idealStrategy && (
          <Card className="mb-8">
            <CardContent className="pt-6 pb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">
                💡 理想の投資戦略
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                {typeData.idealStrategy}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Compatibility Section */}
        {(typeData.bestMatches || typeData.goodMatches || typeData.challengeMatches) && (
          <Card className="mb-8">
            <CardContent className="pt-6 pb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
                🤝 他のタイプとの相性
              </h3>

              <div className="space-y-4">
                {typeData.bestMatches && typeData.bestMatches.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                      ベストマッチ
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {typeData.bestMatches.map((code) => (
                        <Link key={code} href={`/types/${code}`}>
                          <Button variant="outline" size="sm" className="font-mono">
                            {code}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {typeData.goodMatches && typeData.goodMatches.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">
                      相性良好
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {typeData.goodMatches.map((code) => (
                        <Link key={code} href={`/types/${code}`}>
                          <Button variant="outline" size="sm" className="font-mono">
                            {code}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {typeData.challengeMatches && typeData.challengeMatches.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-2">
                      チャレンジ相性
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {typeData.challengeMatches.map((code) => (
                        <Link key={code} href={`/types/${code}`}>
                          <Button variant="outline" size="sm" className="font-mono">
                            {code}
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

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href="/types">
            <Button variant="outline" size="lg">
              タイプ一覧に戻る
            </Button>
          </Link>
          <Link href="/test?q=0&reset=true">
            <Button size="lg">診断を始める</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
