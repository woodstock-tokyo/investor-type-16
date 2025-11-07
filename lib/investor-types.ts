// lib/investor-types.ts

// ==== 型定義 ====

export type RiskChar = "R" | "S";      // Risk / Secure
export type DecisionChar = "A" | "C";  // Autonomous / Collective
export type TimeChar = "T" | "L";      // Tactical / Long-term
export type JudgeChar = "D" | "V";     // Data / Value;

export type InvestorCode =
  `${RiskChar}${DecisionChar}${TimeChar}${JudgeChar}`;

type Axis = "risk" | "decision" | "time" | "judge";

// 5段階: 1=全くそう思わない / 3=どちらでもない / 5=とてもそう思う
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export interface InvestorQuestion {
  id: number;
  text: string;
  axis: Axis;
  /**
   * 回答(1〜5)から -2〜+2 に正規化した値に、このweightsを掛けてスコア加算する。
   * 対象になるのは該当軸の2文字のみ。
   *
   * 例:
   * axis: "risk", weights: { R: 1 }
   *   → 賛成側ならRにプラス、反対ならマイナス。
   *
   * axis: "risk", weights: { S: 1 }
   *   → 賛成側でSにプラス。
   */
  weights: Partial<Record<RiskChar | DecisionChar | TimeChar | JudgeChar, number>>;
}

export interface InvestorTypeMeta {
  code: InvestorCode;
  name: string;
  shortLabel: string;
  description: string; // 結果ページ用の長文ここに入れる
  idealStrategy?: string;
  ctaMessage?: string; // CTA用のメッセージ
  bestMatches?: InvestorCode[];
  goodMatches?: InvestorCode[];
  challengeMatches?: InvestorCode[];
}

// ==== 16タイプ定義（中身はあとで好きに埋めてOK） ====
// まずは骨組みだけ。codeとname/shortLabelを確定しとけば運用しやすい。

export const INVESTOR_TYPES: Record<InvestorCode, InvestorTypeMeta> = {
  // R + A + T + D
  RATD: {
    code: "RATD",
    name: "チャートスナイパー",
    shortLabel: "瞬発力の天才トレーダー",
    description: `**基本性格**
あなたは"瞬発力の天才"。
データとチャートを読み解き、タイミングを見極めて利益を取りに行く。
感情ではなく数字で判断し、自分のルールに忠実。
市場の波に乗ることに喜びを感じる、アクティブな投資家です。

**長所と短所**
分析力と決断力が高く、チャンスを逃さない。
ただし、短期売買による手数料や税金、そして精神的な疲労には注意が必要。
過信すると大きな損失を出すリスクも。

**理想の投資方針**
成長株＋テクニカル分析＋損切りルール徹底。
「素早く動き、素早く判断する」があなたのモットー`,
    idealStrategy: "成長株＋テクニカル分析＋損切りルール徹底",
    ctaMessage: "リアルタイムの市場分析で、さらに投資判断を磨きませんか？woodstock.clubで最新の投資情報とコミュニティを体験しましょう。",
    bestMatches: ["RATV", "SALD"],
    goodMatches: ["SALV"],
    challengeMatches: ["RCLV"],
  },
  // R + A + T + V
  RATV: {
    code: "RATV",
    name: "トレンドハンター",
    shortLabel: "嗅覚の鋭い開拓者",
    description: `**基本性格**
あなたは"嗅覚の鋭い開拓者"。
データだけでなく、直感や物語性を重視して投資先を選ぶ。
「これは来る！」と感じたテーマに素早く飛び込むタイプ。
市場の未来を読み、先回りすることにワクワクする冒険家です。

**長所と短所**
感性が鋭く、新しいトレンドをいち早くキャッチできる。
ただし、感情に流されやすく、バブルに巻き込まれるリスクも。
根拠が薄いまま動くと、痛手を負うことも。

**理想の投資方針**
テーマ株＋新興市場＋ポートフォリオ分散。
「未来を信じて、早めに動く」があなたのモットー`,
    idealStrategy: "テーマ株＋新興市場＋ポートフォリオ分散",
    ctaMessage: "次のトレンドを見逃さない。woodstock.clubで最新の投資テーマと成長企業の情報をいち早くチェックしましょう。",
    bestMatches: ["RATD"],
    goodMatches: ["RCLV"],
    challengeMatches: ["SCLV"],
  },
  // R + A + L + D
  RALD: {
    code: "RALD",
    name: "成長コレクター",
    shortLabel: "戦略的な資産家",
    description: `**基本性格**
あなたは"戦略的な資産家"。
長期的な視野を持ちながら、データを基に成長性の高い企業を選別。
じっくり育てることを楽しみつつ、必要に応じて柔軟に動ける。
時間を味方につけた、賢い投資家です。

**長所と短所**
冷静な分析力と長期視点を併せ持つバランス型。
ただし、短期の誘惑に負けると戦略がブレることも。
リスクを取りすぎて、調整局面で焦る可能性もある。

**理想の投資方針**
成長株＋長期保有＋定期的なリバランス。
「データで選び、時間で育てる」があなたのモットー`,
    idealStrategy: "成長株＋長期保有＋定期的なリバランス",
    ctaMessage: "長期投資を成功させるための最新の市場分析とポートフォリオ管理ツールを、woodstock.clubで体験してみませんか？",
    bestMatches: ["RCLD", "SALD"],
    goodMatches: ["RATD"],
    challengeMatches: ["RATV"],
  },
  // R + A + L + V
  RALV: {
    code: "RALV",
    name: "ビジョンドリーマー",
    shortLabel: "未来を描く夢想家",
    description: `**基本性格**
あなたは"未来を描く夢想家"。
企業のビジョンや社会的意義に共感して投資し、長期で応援する。
数字だけでなく、「この会社と一緒に成長したい」という思いが強い。
理念とリターンの両立を目指す、理想主義の投資家です。

**長所と短所**
ブレない軸を持ち、長期で成果を出せるポテンシャルが高い。
ただし、思い入れが強すぎて、冷静な判断を欠くこともある。
財務状況を軽視すると、思わぬ損失を被るリスクも。

**理想の投資方針**
ESG投資＋成長期待株＋長期ホールド。
「共感した企業と共に育つ」があなたのモットー`,
    idealStrategy: "ESG投資＋成長期待株＋長期ホールド",
    ctaMessage: "理念と利益を両立させる投資を。woodstock.clubで社会的価値の高い企業の最新情報を手に入れましょう。",
    bestMatches: ["RCLD"],
    goodMatches: ["RATD", "SALD"],
    challengeMatches: ["RCLV"],
  },
  // R + C + T + D
  RCTD: {
    code: "RCTD",
    name: "情報ハンター",
    shortLabel: "情報の目利きトレーダー",
    description: `**基本性格**
あなたは"情報の目利き"。
SNSやニュース、コミュニティから情報を集め、データで検証して動く。
みんなの意見を聞きつつ、最終判断は数字で下す。
情報収集力と分析力を兼ね備えた、現代的な投資家です。

**長所と短所**
多角的な視点を持ち、情報感度が高い。
ただし、情報過多で判断が遅れることも。
ノイズに惑わされ、振り回されるリスクもある。

**理想の投資方針**
話題株＋テクニカル分析＋情報ソース多様化。
「情報を集め、数字で決める」があなたのモットー`,
    idealStrategy: "話題株＋テクニカル分析＋情報ソース多様化",
    ctaMessage: "情報が武器。woodstock.clubの投資家コミュニティで、信頼できる情報と分析を手に入れましょう。",
    bestMatches: ["RATD", "RCLD"],
    goodMatches: ["RATV"],
    challengeMatches: ["SCLV"],
  },
  // R + C + T + V
  RCTV: {
    code: "RCTV",
    name: "バズライダー",
    shortLabel: "波乗り名人トレーダー",
    description: `**基本性格**
あなたは"波乗り名人"。
SNSやコミュニティのトレンドを敏感に察知し、共感した銘柄に素早く投資。
みんなが盛り上がっているものに乗ることで、勢いを味方につける。
社交性と行動力が武器の、モダンな投資家です。

**長所と短所**
タイミングが良く、話題株で利益を得やすい。
ただし、バブルに巻き込まれやすく、暴落に弱い。
流行に乗りすぎて、本質を見失うリスクも。

**理想の投資方針**
話題株＋短期売買＋損切り徹底。
「波に乗り、タイミングで勝つ」があなたのモットー`,
    idealStrategy: "話題株＋短期売買＋損切り徹底",
    ctaMessage: "トレンドの波に乗る。woodstock.clubで今話題の投資テーマとコミュニティの生の声をチェックしましょう。",
    bestMatches: ["RATD", "RATV"],
    goodMatches: ["RCLV"],
    challengeMatches: ["SALV"],
  },
  // R + C + L + D
  RCLD: {
    code: "RCLD",
    name: "チームビルダー",
    shortLabel: "仲間と築く資産形成",
    description: `**基本性格**
あなたは"チームプレイヤー"。
投資コミュニティや仲間と情報交換しながら、データで裏付けを取る。
長期的な視点で、みんなと一緒に成長していくスタイル。
協調性と分析力を兼ね備えた、信頼される投資家です。

**長所と短所**
多様な視点を取り入れ、リスク分散ができる。
ただし、集団心理に流されやすい面も。
自分の判断軸を失うと、成果が出にくい。

**理想の投資方針**
優良株＋長期保有＋コミュニティ活用。
「仲間と学び、データで決める」があなたのモットー`,
    idealStrategy: "優良株＋長期保有＋コミュニティ活用",
    ctaMessage: "仲間と一緒に学び成長する。woodstock.clubの投資家コミュニティで、知識と経験を共有しましょう。",
    bestMatches: ["RALV", "RALD"],
    goodMatches: ["RCTV"],
    challengeMatches: ["SALV"],
  },
  // R + C + L + V
  RCLV: {
    code: "RCLV",
    name: "共感エバンジェリスト",
    shortLabel: "理念の伝道師",
    description: `**基本性格**
あなたは"理念の伝道師"。
社会的意義や企業理念に共感し、仲間と一緒に長期で応援する。
利益だけでなく、「世界を良くしたい」という思いが投資の原動力。
情熱と理想を持った、次世代の投資家です。

**長所と短所**
ブレない価値観と長期視点で、意義ある投資ができる。
ただし、感情的になりすぎて、財務リスクを軽視することも。
仲間の意見に引っ張られ、冷静さを失うリスクもある。

**理想の投資方針**
ESG投資＋テーマ株＋長期ホールド。
「共感で選び、仲間と育てる」があなたのモットー`,
    idealStrategy: "ESG投資＋テーマ株＋長期ホールド",
    ctaMessage: "同じ理念を持つ仲間と繋がる。woodstock.clubで社会的価値を大切にする投資家コミュニティに参加しませんか？",
    bestMatches: ["RATV"],
    goodMatches: ["SCLV"],
    challengeMatches: ["RATD"],
  },
  // S + A + T + D
  SATD: {
    code: "SATD",
    name: "堅実ファイター",
    shortLabel: "慎重なチャレンジャー",
    description: `**基本性格**
あなたは"慎重なチャレンジャー"。
リスクを抑えつつ、データを見てタイミングよく動く。
損失を最小限に抑えながら、短期でも利益を狙う。
安全性と機動力を両立させた、バランス型の投資家です。

**長所と短所**
リスク管理が徹底しており、大きな損失を避けられる。
ただし、慎重すぎてチャンスを逃すことも。
短期売買の手数料や税金負担も考慮が必要。

**理想の投資方針**
配当株＋短期売買＋損切り徹底。
「守りながら攻める」があなたのモットー`,
    idealStrategy: "配当株＋短期売買＋損切り徹底",
    ctaMessage: "リスクを抑えながらも機動的に。woodstock.clubで安定性と収益性を両立する投資情報を入手しましょう。",
    bestMatches: ["SALD"],
    goodMatches: ["RATD"],
    challengeMatches: ["RCTV"],
  },
  // S + A + T + V
  SATV: {
    code: "SATV",
    name: "バランスマスター",
    shortLabel: "調和を極めた達人",
    description: `**基本性格**
あなたは"バランスの達人"。
安全性を重視しつつ、直感や共感も大切にする。
短期でも動けるけど、無理はしない。
柔軟性と慎重さを兼ね備えた、現実的な投資家です。

**長所と短所**
適度なリスクで、心地よく投資を楽しめる。
ただし、中途半端になりやすく、大きな成果が出にくい。
優柔不断で、タイミングを逃すことも。

**理想の投資方針**
バランス型ファンド＋少額の個別株＋現金比率確保。
「無理せず、楽しく続ける」があなたのモットー`,
    idealStrategy: "バランス型ファンド＋少額の個別株＋現金比率確保",
    ctaMessage: "無理なく楽しく続ける投資を。woodstock.clubで初心者にも優しい投資コミュニティに参加しましょう。",
    bestMatches: ["SALD", "SALV"],
    goodMatches: ["RCLV"],
    challengeMatches: ["RATV"],
  },
  // S + A + L + D
  SALD: {
    code: "SALD",
    name: "コツコツマスター",
    shortLabel: "堅実な資産家",
    description: `**基本性格**
あなたは"堅実な資産家"。
データに基づいて優良な投資先を選び、長期でコツコツ積み立てる。
焦らず、騒がず、淡々と資産を増やすタイプ。
時間と複利を味方につけた、王道の投資家です。

**長所と短所**
リスクが低く、長期で確実に成果を出しやすい。
ただし、退屈に感じたり、短期の誘惑に負けることも。
過度な安全志向は、インフレに負けるリスクもある。

**理想の投資方針**
インデックスファンド＋高配当株＋定期積立。
「焦らず、淡々と積み上げる」があなたのモットー`,
    idealStrategy: "インデックスファンド＋高配当株＋定期積立",
    ctaMessage: "堅実な資産形成をサポート。woodstock.clubで長期投資に役立つ情報とツールを活用しませんか？",
    bestMatches: ["SALV"],
    goodMatches: ["RATD", "RALD"],
    challengeMatches: ["RCTV"],
  },
  // S + A + L + V
  SALV: {
    code: "SALV",
    name: "ファミリーガーディアン",
    shortLabel: "守る強さを知る人",
    description: `**基本性格**
あなたは"守る強さ"を知っている。
リスクを理解しつつ、家族や将来のために動くタイプ。
浪費より貯蓄、投機より投資。
投資の目的は「増やすこと」ではなく「安心を維持すること」。
現実的な判断ができるあなたは、家庭やチームで頼られる存在です。

**長所と短所**
バランス感覚抜群で、地に足がついている。
ただし保守的になりすぎて、チャンスを逃すことも。
過剰な"安全志向"は資産を眠らせるリスクでもある。

**理想の投資方針**
高配当株＋インデックス＋現金比率20％。
「減らさず増やす」があなたのモットー`,
    idealStrategy: "高配当株＋インデックス＋現金比率20％",
    ctaMessage: "家族の未来を守る投資を。woodstock.clubで安心できる資産運用の情報を手に入れましょう。",
    bestMatches: ["SALD"],
    goodMatches: ["SCLD"],
    challengeMatches: ["RATV", "RCTV"],
  },
  // S + C + T + D
  SCTD: {
    code: "SCTD",
    name: "石橋ウォッチャー",
    shortLabel: "確認してから動く人",
    description: `**基本性格**
あなたは"確認してから動く人"。
みんなの意見を聞き、データで裏付けを取ってから投資する。
慎重だけど、短期のチャンスも見逃さない。
安全性と情報感度を兼ね備えた、堅実な投資家です。

**長所と短所**
多角的に情報を集め、リスクを最小限に抑えられる。
ただし、慎重すぎてタイミングを逃すことも。
情報収集に時間をかけすぎて、行動が遅れることもある。

**理想の投資方針**
優良株＋短期売買＋情報収集徹底。
「確認してから動く」があなたのモットー`,
    idealStrategy: "優良株＋短期売買＋情報収集徹底",
    ctaMessage: "慎重な判断をサポート。woodstock.clubで多角的な投資情報と分析データを確認しませんか？",
    bestMatches: ["RATD"],
    goodMatches: ["SCLV"],
    challengeMatches: ["RATV"],
  },
  // S + C + T + V
  SCTV: {
    code: "SCTV",
    name: "空気読みフォロワー",
    shortLabel: "空気を読む投資家",
    description: `**基本性格**
あなたは"空気を読む投資家"。
周りの雰囲気や共感できる企業に、慎重に投資する。
短期でも動くけど、無理はしない。
社交性と慎重さを兼ね備えた、共感型の投資家です。

**長所と短所**
周囲の意見を参考にでき、安心感を持って投資できる。
ただし、流行に流されやすく、自分の軸を失いがち。
感情的な判断で、損失を出すリスクもある。

**理想の投資方針**
話題株＋少額投資＋損切り徹底。
「共感しながら、慎重に動く」があなたのモットー`,
    idealStrategy: "話題株＋少額投資＋損切り徹底",
    ctaMessage: "共感できる投資を探す。woodstock.clubで話題の企業情報とコミュニティの意見をチェックしましょう。",
    bestMatches: ["RCLV"],
    goodMatches: ["RCTV"],
    challengeMatches: ["RATD"],
  },
  // S + C + L + D
  SCLD: {
    code: "SCLD",
    name: "成長シーカー",
    shortLabel: "学びながら成長する人",
    description: `**基本性格**
あなたは"学びながら成長する人"。
投資初心者から一歩進んで、データや周りの意見を参考に長期投資。
焦らず、着実に資産形成を目指すタイプ。
謙虚さと学習意欲を持った、成長型の投資家です。

**長所と短所**
リスクを抑えながら、着実に成果を出せる。
ただし、保守的すぎて、成長が遅いことも。
周りに依存しすぎると、自分の判断力が育たない。

**理想の投資方針**
インデックスファンド＋少額の個別株＋学習継続。
「学びながら、着実に積み上げる」があなたのモットー`,
    idealStrategy: "インデックスファンド＋少額の個別株＋学習継続",
    ctaMessage: "学びながら成長する投資を。woodstock.clubで初心者から中級者へステップアップしませんか？",
    bestMatches: ["SALD", "SALV"],
    goodMatches: ["SCLV"],
    challengeMatches: ["RCTV"],
  },
  // S + C + L + V
  SCLV: {
    code: "SCLV",
    name: "安心キーパー",
    shortLabel: "安心を求める仲間想い",
    description: `**基本性格**
あなたは"安心を求める仲間想い"。
周りの意見や企業の理念に共感し、長期で応援する。
リスクは最小限に、安心感を最優先。
慎重さと共感力を持った、優しい投資家です。

**長所と短所**
安心感を持って投資でき、精神的な負担が少ない。
ただし、保守的すぎて、大きな成果が出にくい。
周りに流されやすく、自分の判断軸が弱いことも。

**理想の投資方針**
インデックスファンド＋ESG投資＋現金比率30％。
「安心して、共感しながら続ける」があなたのモットー`,
    idealStrategy: "インデックスファンド＋ESG投資＋現金比率30％",
    ctaMessage: "安心して続けられる投資を。woodstock.clubで同じ価値観を持つ仲間と一緒に、堅実な資産形成を始めましょう。",
    bestMatches: ["SALV", "RCLV"],
    goodMatches: ["SCLD"],
    challengeMatches: ["RATV", "RCTV"],
  },
};

// ==== 質問定義 ====
// 16問構成（4軸 × 各4問）
// value: 1〜5 を -2〜+2 にマップして weights に掛ける仕様。

export const INVESTOR_QUESTIONS: InvestorQuestion[] = [
  // --- Risk: R vs S ---
  {
    id: 1,
    axis: "risk",
    text: "大きなリターンが期待できるなら、多少の値動きは気にせずチャレンジしたい。",
    weights: { R: 1.5 }, // より本質的なリスク許容度を測る
  },
  {
    id: 2,
    axis: "risk",
    text: "投資で一番避けたいのは、大きな損失で夜眠れなくなる状況だ。",
    weights: { S: 1.5 }, // 安全性への強い嗜好
  },
  {
    id: 3,
    axis: "risk",
    text: "新しい商品やテーマに早めに乗る方だ。",
    weights: { R: 1.2 }, // 行動面でのリスク志向
  },
  {
    id: 4,
    axis: "risk",
    text: "元本割れの可能性が高いものには、基本的に手を出したくない。",
    weights: { S: 1.3 }, // 損失回避の明確な意思
  },

  // --- Decision: A vs C ---
  {
    id: 5,
    axis: "decision",
    text: "最終的な投資判断は、自分で調べて自分で決めたい。",
    weights: { A: 1.5 }, // 自律性の核心
  },
  {
    id: 6,
    axis: "decision",
    text: "SNSやインフルエンサー、友人の意見をかなり参考にする。",
    weights: { C: 1.3 }, // 集団志向の行動
  },
  {
    id: 7,
    axis: "decision",
    text: "専門家や他人のおすすめより、自分のルールや基準を優先する。",
    weights: { A: 1.4 }, // 強い独立性
  },
  {
    id: 8,
    axis: "decision",
    text: "みんなが買っているものには安心感を覚える。",
    weights: { C: 1.5 }, // 集団への依存度
  },

  // --- Time: T vs L ---
  {
    id: 9,
    axis: "time",
    text: "数週間〜1年程度の値動きを見ながら、柔軟に売買したい。",
    weights: { T: 1.3 }, // 短期志向の行動
  },
  {
    id: 10,
    axis: "time",
    text: "10年単位で積み立てて育てる投資が自分には合っていると思う。",
    weights: { L: 1.5 }, // 長期投資の本質的な志向
  },
  {
    id: 11,
    axis: "time",
    text: "短期で結果が出ないとモチベーションが下がりやすい。",
    weights: { T: 1.4 }, // 短期的な成果への欲求
  },
  {
    id: 12,
    axis: "time",
    text: "日々の値動きより、長期トレンドや将来像を重視する。",
    weights: { L: 1.4 }, // 長期視点の明確さ
  },

  // --- Judge: D vs V ---
  {
    id: 13,
    axis: "judge",
    text: "PER、売上成長率、チャートなどの数字を見て判断することが多い。",
    weights: { D: 1.5 }, // データ重視の本質
  },
  {
    id: 14,
    axis: "judge",
    text: "企業理念やストーリー、好きかどうかが投資判断に影響する。",
    weights: { V: 1.4 }, // 価値観による判断
  },
  {
    id: 15,
    axis: "judge",
    text: "財務データがよくても、応援したくない企業には投資したくない。",
    weights: { V: 1.5 }, // 価値観優先の強い意思
  },
  {
    id: 16,
    axis: "judge",
    text: "ニュース・指標・チャートを組み合わせて、論理的に結論を出す方だ。",
    weights: { D: 1.3 }, // 論理的アプローチ
  },
];

// ==== ロジック本体 ====

// 回答: { [questionId]: 1〜5 }
export type InvestorAnswers = Record<number, AnswerValue>;

interface ScoreState {
  risk: { R: number; S: number };
  decision: { A: number; C: number };
  time: { T: number; L: number };
  judge: { D: number; V: number };
}

/**
 * 5段階回答を -2〜+2 に変換
 */
function normalize(value: AnswerValue): number {
  // 1→-2, 2→-1, 3→0, 4→+1, 5→+2
  return value - 3;
}

/**
 * 回答から16タイプの4文字コードを算出
 */
export function calculateInvestorCode(answers: InvestorAnswers): InvestorCode {
  const score: ScoreState = {
    risk: { R: 0, S: 0 },
    decision: { A: 0, C: 0 },
    time: { T: 0, L: 0 },
    judge: { D: 0, V: 0 },
  };

  for (const q of INVESTOR_QUESTIONS) {
    const raw = answers[q.id];
    if (!raw) continue;

    const norm = normalize(raw);

    // normが0(=どちらでもない)なら何も加算しない
    if (norm === 0) continue;

    for (const key in q.weights) {
      const k = key as keyof typeof q.weights;
      const weight = q.weights[k];
      if (!weight) continue;

      const delta = norm * weight;

      switch (q.axis) {
        case "risk":
          if (k === "R" || k === "S") {
            // @ts-ignore
            score.risk[k] += delta;
          }
          break;
        case "decision":
          if (k === "A" || k === "C") {
            // @ts-ignore
            score.decision[k] += delta;
          }
          break;
        case "time":
          if (k === "T" || k === "L") {
            // @ts-ignore
            score.time[k] += delta;
          }
          break;
        case "judge":
          if (k === "D" || k === "V") {
            // @ts-ignore
            score.judge[k] += delta;
          }
          break;
      }
    }
  }

  const riskChar: RiskChar = score.risk.R >= score.risk.S ? "R" : "S";
  const decisionChar: DecisionChar =
    score.decision.A >= score.decision.C ? "A" : "C";
  const timeChar: TimeChar = score.time.T >= score.time.L ? "T" : "L";
  const judgeChar: JudgeChar =
    score.judge.D >= score.judge.V ? "D" : "V";

  const code = `${riskChar}${decisionChar}${timeChar}${judgeChar}` as InvestorCode;

  // 念のため安全に
  if (!INVESTOR_TYPES[code]) {
    // 想定外パターン出たら無難なタイプにフォールバック
    return "SALD";
  }

  return code;
}

/**
 * コードからタイプ情報を取得
 */
export function getInvestorType(code: string): InvestorTypeMeta | null {
  const key = code.toUpperCase() as InvestorCode;
  return INVESTOR_TYPES[key] ?? null;
}
