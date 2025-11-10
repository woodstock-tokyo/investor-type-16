import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  INVESTOR_TYPES,
  InvestorCode,
  getCodeMeanings
} from "@/lib/investor-types";
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

export async function generateMetadata({ params }: TypeDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const typeCode = resolvedParams.type.toUpperCase() as InvestorCode;
  const typeData = INVESTOR_TYPES[typeCode];

  if (!typeData) {
    return {
      title: "投資家タイプが見つかりません",
    };
  }

  return {
    title: `${typeData.name} (${typeData.code}) | 投資家タイプ一覧`,
    description: `投資家タイプ「${typeData.name}」(${typeData.shortLabel})の詳細情報。${typeData.idealStrategy}`,
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
}

export default async function TypeDetailPage({ params }: TypeDetailPageProps) {
  const resolvedParams = await params;
  const typeCode = resolvedParams.type.toUpperCase() as InvestorCode;
  const typeData = INVESTOR_TYPES[typeCode];

  if (!typeData) {
    notFound();
  }

  const imageUrl = getTypeImageUrl(typeData.code);

  // description を処理してセクション分けする
  const parseDescription = (desc: string) => {
    const lines = desc.split("\n").filter((line) => line.trim());
    const sections: Array<{ type: 'heading' | 'paragraph' | 'list'; content: string | string[] }> = [];
    let currentList: string[] = [];

    lines.forEach((line) => {
      // 【】で囲まれた見出し
      if (line.match(/^【.+】$/)) {
        // 前のリストを保存
        if (currentList.length > 0) {
          sections.push({ type: 'list', content: currentList });
          currentList = [];
        }
        sections.push({ type: 'heading', content: line.replace(/【|】/g, '') });
      }
      // ・で始まる箇条書き
      else if (line.startsWith('・')) {
        currentList.push(line.substring(1).trim());
      }
      // 通常の段落
      else {
        // 前のリストを保存
        if (currentList.length > 0) {
          sections.push({ type: 'list', content: currentList });
          currentList = [];
        }
        sections.push({ type: 'paragraph', content: line });
      }
    });

    // 最後に残ったリストを保存
    if (currentList.length > 0) {
      sections.push({ type: 'list', content: currentList });
    }

    return sections;
  };

  const descriptionSections = parseDescription(typeData.description);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-4 order-2 lg:order-1">
            <div className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              {typeData.code}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {typeData.name}©
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
              {typeData.shortLabel}
            </p>
          </div>

          {/* Type Image */}
          <div className="flex justify-center order-1 lg:order-2">
            {imageUrl ? (
              <div className="relative w-full max-w-xs aspect-square rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`${typeData.name}のイメージ`}
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
                    {typeData.code}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Meanings */}
        <Card className="mb-8">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {getCodeMeanings(typeData.code).map((meaning: string, index: number) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {meaning}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {descriptionSections.map((section, index) => {
                if (section.type === 'heading') {
                  return (
                    <h3
                      key={index}
                      className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-8 mb-4 first:mt-0 border-b-1 border-slate-300 dark:border-slate-700 pb-2"
                    >
                      {section.content as string}
                    </h3>
                  );
                }
                if (section.type === 'list') {
                  return (
                    <ul
                      key={index}
                      className="space-y-2 mb-6 list-none pl-0"
                    >
                      {(section.content as string[]).map((item, i) => (
                        <li
                          key={i}
                          className="text-slate-700 dark:text-slate-300 leading-relaxed pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-slate-900 dark:before:text-slate-50 before:font-bold"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed"
                  >
                    {section.content as string}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>

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
                    <h4 className="text-sm font-semibold text-black dark:text-green-400 mb-2">
                      💖 ベストマッチ
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {typeData.bestMatches.map((code) => (
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

                {typeData.goodMatches && typeData.goodMatches.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-black dark:text-blue-400 mb-2">
                      👍 相性良好
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {typeData.goodMatches.map((code) => (
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

                {typeData.challengeMatches && typeData.challengeMatches.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-black dark:text-orange-400 mb-2">
                      🌀 チャレンジ相性
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {typeData.challengeMatches.map((code) => (
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
        {typeData.ctaMessage && (
          <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6 pb-6 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                米国株24時間取引なら、ウッドストック
              </h3>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mb-4 max-w-2xl mx-auto px-4">
                {typeData.ctaMessage}
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

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
          <Link href="/types" className="w-full sm:w-auto flex justify-center">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              タイプ一覧に戻る
            </Button>
          </Link>
          <Link href="/test?q=0&reset=true" className="w-full sm:w-auto flex justify-center">
            <Button size="lg" className="w-full sm:w-auto">診断を始める</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
