1. サービス概要
	•	サービス名(仮): 「らくがきカラー (Rakugaki Color)」
	•	コンセプト:
子供向けに、自由に「塗り絵」を楽しめる線画(白黒のラインアート)を生成できるWebアプリ。
手軽に「象さんの塗り絵がほしい」「車の塗り絵がほしい」のようなプロンプトを入力して生成し、
気に入らなければ再生成したり、完成した画像をダウンロードしたりできる。
	•	主な利用者:
	•	未就学児〜小学校低学年の子供(保護者が付き添って利用想定)
	•	もしくは塗り絵を気軽に楽しみたい一般ユーザー
	•	主な機能:
	1.	プロンプト入力 (例:「象」「車」「花」など)
	2.	画像生成 (線画のみ)
	3.	画像再生成 (気に入らない場合の再試行)
	4.	ダウンロード機能 (生成した画像を保存)
	5.	生成した画像のライブラリ (気に入った画像を一覧化)
	•	ログイン機能:
今回は不要(後々ユーザープロフィールや保存機能を拡充したい場合に実装を検討)

2. システム構成(ざっくり)
Next JSは,15.x.0~

flowchart LR
    A[Client(ブラウザ)] --> B[Next.js App Server]
    B -->|APIリクエスト| C[画像生成AIサービス(API)]
    C -->|生成された線画画像| B
    B --> A
    B -->|DB or Cloud Storage| D[画像・データ保管用ストレージ]

	1.	Next.js アプリケーション(フロント+バックエンド)
	•	API Routes(もしくはserverless function)を利用し、画像生成AIサービスへリクエスト
	•	生成した画像のURLやバイナリデータを返す
	•	結果をユーザーブラウザへ返却
	•	任意で、生成データやキャッシュをDB/クラウドストレージに保存（ライブラリ用）
	2.	画像生成AIサービス
	•	Stable DiffusionやDALL·E、もしくは線画変換AIなどを想定。
	•	プロンプト + “線画用のstyle”などを付加してAPI呼び出し
	3.	ブラウザ(フロント)
	•	Next.jsのPages/コンポーネントを利用
	•	プロンプトを入力→生成リクエスト→プレビュー表示→ダウンロード可能に
	•	ライブラリ一覧表示
	4.	ストレージ
	•	生成した画像のサムネイルやメタ情報を保存しておき、ライブラリ機能で利用  
	
3. 機能詳細

3.1 プロンプト入力フォーム
	•	入力欄: テキストボックス
	•	プレースホルダー例:「好きな動物や物の名前を入れてね」
	•	送信ボタン: 「画像生成」ボタン
	•	再生成ボタン: 画像が生成された後、ユーザーが気に入らない場合に再度生成リクエストを投げるボタン

3.2 画像生成
	•	処理フロー:
	1.	フロントが入力されたプロンプトをバックエンド(API Route)へ送信
	2.	バックエンドが外部の画像生成AIサービスへリクエスト
	•	テキストプロンプト ＋ 「outline」「line art」「simple black and white illustration」などのパラメータを含める
	3.	生成結果(画像URL or バイナリ)を受け取り、フロントへ返却
	•	画像の形式:
	•	PNG or JPEG (線画ならPNG推奨。背景透過にするならPNG)
	•	解像度はA4に印刷できる程度 (300dpi推奨だがコスト要因と応相談。最低 1024 x 1024px など)

3.3 画像プレビュー表示
	•	生成完了後、右カラムに画像を表示する
	•	気に入らない場合は「再生成」ボタン押下→再度API呼び出し

3.4 ダウンロード機能
	•	画像を右クリック＋「保存」でもよいが、UIとして「ダウンロード」ボタンをつける。
	•	クリック時にファイルとして保存できるように設定。
	•	ブラウザの<a href="..." download>機能などを利用

3.5 ライブラリ機能
	•	生成した過去の画像一覧を簡単に表示する機能
	•	サムネイルをクリックすると再度プレビュー表示→ダウンロードも可能
	•	（簡易実装）サーバーサイドのDBやクラウドストレージに保存し、一定期間保持
	•	（簡易実装）ひとまずブラウザのlocalStorage/sessionStorageで保持し、再読み込み時に表示するだけでもOK	

4.1 トップページ (メインページ)	  
-----------------------------------------------------------------------
| らくがきカラー (仮)                                              |
-----------------------------------------------------------------------
| 左カラム: プロンプト入力                |   右カラム: 生成プレビュー     |
|-----------------------------------------|-------------------------------|
| [テキスト入力欄]                        |  生成される画像が表示         |
|  例: 「ぞう」 「車」など                |   [   (画像プレビュー)   ]    |
|                                         |                               |
| [生成ボタン] [再生成ボタン]             |  [ダウンロード] [再生成]      |
|  (再生成ボタンは画像生成後のみ有効)      |                               |
|-----------------------------------------|-------------------------------|
| 下部にライブラリ表示(サムネイル一覧)                                     |
| (過去に生成した画像の一覧)                                              |
| [サムネイル] [サムネイル] [サムネイル] ...                               |
| (クリックすると右カラムのプレビューに反映)                               |
-----------------------------------------------------------------------

	1.	ヘッダー
	•	サイトロゴ or サイト名のみ。右上に余裕があれば「使い方」のリンクなど。
	2.	メインコンテンツ
	•	左カラム: プロンプト入力・生成ボタン
	•	右カラム: 生成画像プレビュー・ダウンロードボタン・再生成ボタン
	3.	フッター
	•	利用規約や著作権表示のリンクを配置(必要なら)

5. 非機能要件
	1.	レスポンシブ対応:
	•	スマホやタブレットで子供が使う場合も多いため、レスポンシブ/モバイル対応必須
	2.	性能:
	•	画像生成AIサービスへのリクエスト時間が発生 (数秒〜十数秒)
	•	大きな負荷が想定されない限り、サーバーはServerless(Next.js on Vercel など)でもOK
	3.	可用性:
	•	画像生成AIサービスのSLAに依存
	•	万が一APIがダウンしているときのエラーハンドリングを準備
	4.	拡張性:
	•	後からログイン機能を追加し、ユーザー個別の履歴を保存してもよい
	•	画像のカラーリング機能(ブラウザ上で色塗りする)などの拡張も可能	

6. 画面遷移(シンプルフロー)
	1.	ユーザーがトップページを開く
	2.	左カラムの入力欄に「ぞう」などのキーワードを入れ、[生成ボタン]をクリック
	3.	API経由で画像生成 → 右カラムにプレビュー表示
	4.	気に入れば[ダウンロード]ボタン押下 → 画像を保存
	5.	気に入らなければ[再生成]ボタン押下 → 画像再生成(同じプロンプト or 新プロンプト)
	6.	生成した画像はライブラリ一覧にもサムネイルとして追加表示される
	7.	ライブラリ内の画像をクリックすると再プレビュー可能	

7. 実装のポイント
	1.	AIサービスとの連携方法
	•	Next.jsのAPI Route(/api/generate)などを作成。
	•	そこからStable Diffusion/DALL·E等へリクエスト (APIキー管理を.envやVercelの環境変数で行う)
	•	レスポンス(画像URL or base64)をFrontへ返す。
	2.	線画に特化したプロンプトの組み立て
	•	ユーザー入力 + "line drawing", "outline", "kid's coloring book style"などのキーワードを合成
	•	出力画像が白黒で線が太めになるようにパラメータを調整
	3.	ライブラリ保存
	•	まずはDB不要なら FrontのlocalStorageにサムネイル(Base64) or URLを保存するだけでも実現可能。
	•	削除機能や名前を付けるなど拡張可能。
	4.	ダウンロード
	•	Next.jsの場合、生成画像をBlobに変換して <a download> させるか、URLを直接リンクで落とす。
	•	画像を一時的にS3などにアップして署名付きURLで返却しダウンロードさせる方法もある。	

8. ディレクトリ構成例	
my-coloring-app/
├─ pages/
│  ├─ index.tsx        // メインページ(左プロンプト,右プレビュー)
│  └─ api/
│     └─ generate.ts   // 画像生成のAPI Route
├─ components/
│  ├─ PromptForm.tsx   // プロンプト入力フォーム
│  ├─ PreviewArea.tsx  // プレビュー＆ダウンロードボタン
│  └─ LibraryList.tsx  // ライブラリ(サムネイル一覧)
├─ public/             // 静的ファイル(必要に応じて)
├─ styles/
│  └─ globals.css
├─ utils/
│  └─ aiClient.ts      // AIサービスへリクエストするロジック
├─ .env                // APIキー等
└─ package.json

9. まとめ
	•	仕様書としては上記のとおり、
	•	左にプロンプト入力、右にプレビュー + ダウンロードボタン
	•	生成した画像に気に入らなければ再生成可能
	•	生成画像のライブラリー(サムネイル表示)があり、いつでも再ダウンロード可能
	•	非ログインでも使用できる構成。
	•	今後必要に応じてユーザーアカウントやクラウドへの恒久保存を検討可能。
	•	これで子供でも気軽に塗り絵用の線画を生成＆ダウンロードできるWebアプリが実現できる。

以上が大まかな仕様書と画面構成(ワイヤーフレーム)の提案です。