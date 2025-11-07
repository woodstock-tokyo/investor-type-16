"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Share2 } from "lucide-react";

interface ShareButtonsProps {
  investorCode: string;
  investorName: string;
}

export function ShareButtons({ investorCode, investorName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/result/${investorCode}`
    : "";

  const shareText = `私の投資家タイプは「${investorName}」でした！ #投資家タイプ診断`;

  const handleCopyUrl = async () => {
    try {
      // モダンなClipboard APIを試す
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // フォールバック: 古い方法でコピー
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      // フォールバックも試す
      try {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (fallbackErr) {
        console.error("Fallback copy also failed:", fallbackErr);
      }
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "投資家タイプ診断結果",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    }
  };

  const supportsWebShare = typeof navigator !== "undefined" && navigator.share;

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <Button
        variant={copied ? "default" : "outline"}
        className="flex-1 transition-all"
        onClick={handleCopyUrl}
      >
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            コピーしました
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            URLをコピー
          </>
        )}
      </Button>

      <Button
        variant="outline"
        className="flex-1"
        onClick={handleTwitterShare}
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Xでシェア
      </Button>

      {supportsWebShare && (
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleWebShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          シェア
        </Button>
      )}
    </div>
  );
}
