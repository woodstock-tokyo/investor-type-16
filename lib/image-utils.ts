import { InvestorCode } from "./investor-types";

// 利用可能な画像のリスト
const AVAILABLE_IMAGES: InvestorCode[] = [
  "RALD",
  "RALV",
  "RATD",
  "RATV",
  "RCLD",
  "RCLV",
  "RCTD",
  "RCTV",
  "SALD",
  "SATD",
  "SATV",
];

/**
 * タイプコードから画像URLを取得
 * 画像がない場合はnullを返す
 */
export function getTypeImageUrl(code: InvestorCode): string | null {
  if (AVAILABLE_IMAGES.includes(code)) {
    return `/image/${code}.png`;
  }
  return null;
}

/**
 * 画像が存在するかチェック
 */
export function hasTypeImage(code: InvestorCode): boolean {
  return AVAILABLE_IMAGES.includes(code);
}
