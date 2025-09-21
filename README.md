# Level2 React Sample

このサンプルで学ぶこと：
- 画面をローカルで起動する（Vite）
- 問い合わせフォームからダミーAPIへPOSTする（JSONPlaceholder）
- Gitで履歴を作る → GitHubへpushする
- Vercelにデプロイする（環境変数を設定）

---

## 0. 前提
- Node.js と npm が入っていること（LTS 推奨）。
- Git が入っていること。

確認:
```bash
node -v
npm -v
git --version
```

## 1. セットアップと起動
```bash
npm install
cp .env.example .env   # Windowsは copy .env.example .env
npm run dev            # http://localhost:5173 を開く
```

`VITE_API_BASE_URL` は `.env` で設定します。初期値は `https://jsonplaceholder.typicode.com`（練習用の無料API）です。

## 2. 動作
- 画面のフォームから送信すると、`POST /posts` にJSONを送ります。
- 成功すると、返ってきたJSONを下に表示します。

## 3. GitHubへpush（新規リポジトリ想定）
GitHubで空のリポジトリを先に作成しておきます（例: `level2-react-sample`）。

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<YOUR_NAME>/<REPO>.git
git push -u origin main
```

## 4. Vercelへデプロイ
1) Vercelで「Import Git」を選び、GitHubのこのリポジトリを選択  
2) Framework Preset が Vite と自動認識されます（Build: `npm run build`, Output: `dist`）  
3) **Environment Variables** に `VITE_API_BASE_URL` を追加  
4) Deploy を押すと `*.vercel.app` が発行されます

以後は `git push` するたびに自動デプロイされます。

## 5. よくあるつまずき
- `.env` が効かない → 変数名は `VITE_` で始め、アプリでは `import.meta.env` から読みます。
- CORSやネットワークで失敗 → まずローカルで送信先URLをブラウザで開き、疎通を確認しましょう。
- Vercelで build / dist の設定エラー → Build は `npm run build`、出力は `dist` です。

---

## ライセンス
MIT
