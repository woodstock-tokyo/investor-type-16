import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <Image
              src="/image/logo.svg"
              alt="インベスタータイプ16"
              width={100}
              height={32}
              className="h-5 md:h-7 w-auto"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              あなたの投資スタイルを4つの軸から診断。16種類のタイプから最適な投資戦略を見つけましょう。
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">
              リンク
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/types"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                >
                  タイプ一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/test?q=0&reset=true"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                >
                  診断を始める
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">
              注意事項
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              この診断は参考情報です。実際の投資判断は、ご自身の責任で行ってください。
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-sm text-slate-500 dark:text-slate-500">
            © {currentYear} Woodstock株式会社 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
