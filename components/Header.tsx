import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Title */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <span className="text-sm sm:text-base md:text-xl font-bold text-slate-900 dark:text-slate-50 whitespace-nowrap">
            インベスタータイプ16
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/types">
            <Button variant="ghost" size="sm">
              タイプ一覧
            </Button>
          </Link>
          <Link href="/test?q=0&reset=true">
            <Button size="sm">
              診断する
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
