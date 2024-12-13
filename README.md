=======
# neuro-care-tech-gas

##デプロイ方法
1. Google Apps ScriptにCode.gsを作成
2. GASの設定画面から環境変数を設定
     DIFY_API_KEY, LINE_ACCESS_TOKEN
3.　GASの画面右上からデプロイ
   右上のdeploy -> New Deployment -> Select Typeで Web appを選択 -> Who has accessをAnyoneに変更 -> Deploy
4. LineにWebhook URLを追加
   デプロイ後の画面から、Web app URLをコピーし、Messaging API設定のWebhook URLに貼り付け。

・LINE_ACCESS_TOKENの取得方法
  1. ボットを作成
  2. Line Developpersのコンソールを開く
  3. Messaging API設定から、チャネルアクセストークンを発行する。

https://note.com/curiousperson08/n/n0b13b951adb0
↑参考
