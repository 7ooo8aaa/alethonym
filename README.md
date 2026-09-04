# ALETHONYM 公式サイト（`site/`）

`alethonym.com` 用の静的サイトのソースです。ビルドツール・npm 依存はありません。
HTML / CSS / 最小限の素の JS のみで構成しています。

**現在の状態：ローカル制作段階（未公開）。** 公開・デプロイ・DNS 変更・外部登録・購入・
`git push` は、いずれも owner の承認が必要な操作であり、現時点では行いません。

---

## ディレクトリ構成

```
site/
  README.md                    このファイル
  robots.txt                   本番公開時に配信（全クローラ許可 + sitemap 宣言）
  sitemap.xml                  収録URL一覧（記事追加時に <url> を追記）
  index.html                   トップページ
  about.html                   ALETHONYMについて / 運営者情報
  contact.html                 お問い合わせ（mailto のみ）
  privacy.html                 プライバシーポリシー
  disclaimer.html              免責事項
  advertising-policy.html      広告・アフィリエイトポリシー
  esim/
    index.html                 「海外eSIM」カテゴリの記事一覧
    kaigai-esim-osusume-hikaku-2026.html   比較メイン記事（公開前ドラフト）
  assets/
    css/style.css              全ページ共通スタイル（デザインシステム）
    js/site.js                 ナビ開閉・年号のみ（外部読み込みなし）
    img/logo.svg               ワードマーク
    img/favicon.svg            モノグラム（favicon）
    img/og-default.svg         OGP 仮画像（公開前に PNG へ差し替え）
  _templates/
    page.html                  汎用ページ雛形
    article.html               記事雛形
```

`_templates/` 配下は公開対象外です。`sitemap.xml` には載せません。

---

## ローカルでの確認方法

`site/` ディレクトリで簡易サーバーを起動し、ブラウザで開きます（macOS 標準の `python3` で動作、追加インストール不要）。

```
cd site
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開く。ルート相対リンク（`/`）を正しく解決するため、
ファイルを直接開く（`file://`）のではなく、必ずサーバー経由で確認してください。

---

## 記事を追加する手順

1. `_templates/article.html` を `site/<カテゴリ>/<スラッグ>.html` にコピーする
   （例：`site/esim/korea-esim-guide.html`）。
2. ファイル内のプレースホルダ（`{{TITLE}}` など）をすべて置換する。
   相対パスはカテゴリ配下（1階層）前提で `../` を使用。
3. 一覧ページ（例：`esim/index.html`）に `<article class="card">…</article>` を1枚追記する。
4. `sitemap.xml` に `<url><loc>…</loc><lastmod>…</lastmod></url>` を追記する。
5. 未確認の料金・通信品質・キャンペーン等は本文に書かない（「公式で確認」と明記）。
   アフィリエイトリンクは提携取得後にのみ設置し、取得前はダミーリンクを作らない。

## ページを追加する手順

`_templates/page.html` を `site/` 直下（または任意の階層）へコピーし、
同様にプレースホルダを置換して `sitemap.xml` に追記する。

---

## 設計方針の要点

- **コンセプト**：高級旅行メディア × ミニマル × モダン。余白・タイポグラフィ・濃淡・写真・
  レイアウトで質感を出す（装飾やアクセントカラーで飾らない）。
- **配色**：3色のみ。Deep Navy `#0F1724` ／ Soft White `#F5F7FB` ／ Blue Gray `#9AA8BA`。
  トーンの差は同じ3色の不透明度（opacity）で表現する。ゴールド等のアクセント色は使わない。
- **フォント**：ワードマーク「Alethonym」は **Arial Black**（システムフォント、`--wordmark` 変数）。
  英字ラベル（Featured / More / Editorial、カード見出しのキッカー等）は **Manrope**、
  日本語の見出し・本文・ナビは **Noto Sans JP** を Google Fonts から読み込む
  （`assets/css/style.css` 冒頭の `@import`）。フォールバックにシステムフォントを指定しており、
  読み込めない環境でも表示は崩れない。画像・スクリプト等その他のアセットはすべてローカル。
  ※将来、Manrope をローカルに同梱（self-host）して外部依存を無くす選択肢あり。
- **ワードマーク**：`font-family: "Arial Black", Arial, sans-serif` / `font-weight: 400`
  （Arial Black 本来の太さ）/ `letter-spacing: 0`。
  ヘッダー・トップ・フッター・`logo.svg`・`og-default.svg` で統一。
- **semantic HTML**：`header` / `nav` / `main` / `article` / `footer`、1ページ1 `h1`、パンくず。
- **SEO / OGP**：各ページ固有の `title` / `description` / `canonical` / Open Graph / Twitter Card、
  JSON-LD（`WebSite` / `Organization` / `Article` / `BreadcrumbList`）。
- **アクセシビリティ**：スキップリンク、可視フォーカス、コントラスト、`alt`、`aria-*`。
- **モバイルファースト**：`clamp()` の流体タイポグラフィ、Grid、44px 以上のタップ領域。
- **フレームワーク・有料サービスは追加しない。**

## アクセス解析

各ページの `<head>` に `<!-- analytics: … -->` のコメント枠があります。将来、解析タグを
入れる場合はこの位置に設置し、**`privacy.html` の「アクセス解析」節の記述も更新**してください。

---

## 公開前 TODO（未完了）

- [ ] eSIM 記事の最終ファクトチェック（各社公式で料金・対応国・提供条件を確認して反映）
- [ ] 実施中キャンペーンの有無を確認
- [ ] アフィリエイトリンクの取得 → 記事内の `<span class="cta cta--pending">` を
      `<a class="cta" href="（正式URL）" target="_blank" rel="sponsored nofollow noopener">` に差し替え
- [ ] PR 表記への更新（記事冒頭の注記 / `advertising-policy.html` / `privacy.html`）
- [ ] OG 画像を 1200×630 の PNG または JPG で用意し、`og:image` を差し替え（現状は SVG 仮）
- [ ] 運営者情報の最終確認（法人ではないため法人表記をしない方針を維持。ASP 審査で実名・住所の
      提出を求められた場合は owner 判断。公開ページには個人の実名・住所を出さない想定）
- [ ] アクセス解析の導入可否を判断し、導入時は `privacy.html` を更新
- [ ] `robots.txt` / `sitemap.xml` / 各 `canonical` を本番ドメインで最終確認
- [ ] ホスティング先の決定と、公開そのものの owner 承認

---

## 現時点で行わないこと

- `alethonym.com` への公開・外部ホスティングへのデプロイ
- サーバー契約・有料サービス契約・DNS 変更
- A8.net 等の登録・ASP 提携申請
- 外部へのメール送信・SNS 投稿
- `git commit` / `git push`
