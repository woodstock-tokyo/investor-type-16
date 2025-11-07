import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { INVESTOR_TYPES } from "@/lib/investor-types";
import { Button } from "@/components/ui/button";
import { getTypeImageUrl } from "@/lib/image-utils";

export default function TypesListPage() {
  const types = Object.values(INVESTOR_TYPES);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            16の投資家タイプ
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            あなたはどのタイプ？クリックして詳細を確認しましょう
          </p>
          <Link href="/">
            <Button variant="outline">トップに戻る</Button>
          </Link>
        </div>

        {/* Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {types.map((type) => {
            const imageUrl = getTypeImageUrl(type.code);
            return (
              <Link key={type.code} href={`/types/${type.code}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer overflow-hidden py-0 gap-0">
                  <CardContent className="p-0">
                    <div>
                      {/* Image or Placeholder */}
                      <div className="relative w-full aspect-[4/3] bg-white dark:bg-slate-800">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={`${type.name}のイメージ`}
                            fill
                            className="object-contain p-4"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-4xl mb-2">📊</div>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {type.code}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Text Content */}
                      <div className="text-center px-4 py-3 space-y-3">
                        <div>
                          <div className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">
                            {type.code}
                          </div>
                          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">
                            {type.name}©
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {type.shortLabel}
                          </p>
                        </div>
                        <Button size="sm" className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-0 text-slate-900 dark:text-slate-50">
                          詳しくみる
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            あなたのタイプを診断してみませんか？
          </p>
          <Link href="/test?q=0&reset=true">
            <Button size="lg">診断を始める</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
