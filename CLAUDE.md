# 名古屋青年税理士連盟 創立60周年記念特設サイト

## プロジェクト概要
名古屋青年税理士連盟（名青税）の創立60周年記念事業の特設サイト。
- **サイトURL**: https://60th.rta.nagoya/
- **リポジトリ**: https://github.com/dna2468/60th
- **デプロイ**: GitHub → Netlify 自動デプロイ（mainブランチにマージで公開）
- **メインサイト**: https://www.meiseizei.gr.jp/

## 組織情報
- **正式名称**: 名古屋青年税理士連盟
- **創立**: 昭和42年（1967年）
- **会員数**: 約570名超
- **活動の3本柱**: 研鑽・親睦・制度改善
- **所在地**: 名古屋市千種区池下1-8-18 仲田ビル1F

## 記念式典情報
- **日時**: 令和9年（2027年）1月23日（土）
- **式典**: 16:00〜（受付 15:30〜）※時間は予定
- **懇親会**: 17:00〜
- **会場**: ANAクラウンプラザホテルグランコート名古屋（〒460-0023 愛知県名古屋市中区金山町1-1-1）
- **現会長（60代）**: 大澤 輝高

## サイト構成

### 現在の状態: ティザー公開中
本公開前のため、`index.html` はティザーページ（カウントダウン＋式典情報）。
本公開時は `index-full.html` → `index.html` にリネームするだけで切り替え可能。

### ファイル構成
```
index.html          ← ティザーページ（現在公開中）
index-full.html     ← フルサイト（本公開用、リネームして使う）
past-presidents.html ← 歴代会長挨拶（第49代〜第59代、写真は実データ、挨拶は仮）
sponsors.html       ← ご協賛者芳名一覧（config.jsのデータで生成）
css/style.css       ← フルサイト用スタイルシート
js/config.js        ← サイト設定（カルーセル画像、協賛者データ、金額）
js/main.js          ← メインJS（GSAP/Lenis/カルーセル/ローディング）
js/presidents.js    ← 歴代会長ページ用JS
js/sponsors.js      ← 芳名一覧ページ用JS
images/             ← 画像（すべてローカルホスティング）
  carousel/         ← カルーセル画像（01〜08）
  presidents/       ← 歴代会長写真（president-49〜59.jpg）
  og-image.jpg      ← OGP画像
  president.png     ← 現会長写真
  favicon.ico       ← ファビコン
  paypay-qr.svg     ← PayPay QRコード
  site-qr.svg       ← 特設サイトURL QRコード
flyer.html          ← フライヤー（モダンミニマル版）
flyer-dark.html     ← フライヤー（ダーク版）
flyer-pop.html      ← フライヤー（ポップ版）
flyer-festive.html  ← フライヤー（フェスティブ版）
serve.js            ← ローカル開発用HTTPサーバー
```

## 技術スタック
- **静的HTML/CSS/JS**（フレームワークなし）
- **GSAP + ScrollTrigger**: スクロールアニメーション
- **Lenis**: スムーススクロール
- **Google Fonts**: Shippori Mincho + Noto Sans JP
- **アクセントカラー**: #C5A059（ゴールド）

## 開発メモ

### ローカルプレビュー
```bash
node serve.js
# → http://localhost:8080/
```

### 本公開への切り替え手順
1. `index-full.html` を `index.html` にリネーム
2. ティザーの `index.html` は `index-teaser.html` 等にリネームして保持
3. mainにpush → Netlifyが自動デプロイ

### 未完了・仮データの箇所
- **会長挨拶（index-full.html）**: `...（略）` のまま。実際の挨拶文を差し替え必要
- **歴代会長の挨拶文（past-presidents.html）**: 仮テキスト。各会長から実際の原稿を受領して差し替え
- **History「〇〇〇〇」テーマ**: 60周年記念事業のテーマが決まったら差し替え
- **銀行振込情報（index-full.html）**: 〇〇銀行/〇〇支店のまま
- **PayPay QRコード**: ダミー（実際のPayPayリンクに差し替え必要）
- **記念式典 参加登録ボタン**: href="#" のまま（Googleフォーム未設定）
- **記念誌PDF**: magazine-dummy.pdf が存在しない（リンク切れ）
- **協賛者データ（config.js）**: ダミー名。実際の協賛者情報に更新必要

### Git運用
- mainブランチへの直pushはNG（PRを作成してマージ）
- コミットメッセージは日本語
- ブランチ名: `fix/`, `feature/`, `content/` プレフィックス
