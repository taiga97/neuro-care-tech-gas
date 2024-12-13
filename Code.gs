// LINEからWebhookを受け取り、Difyへメッセージを送信し、DifyのレスポンスをLINEへ送信するスクリプト

// POSTリクエストを受信すると実行される
function doPost(e) {
  
  // リクエストの入力値をチェック
  if (!e?.postData?.contents) {
    console.error('Value is required');
    // エラーレスポンスを返す
    return createGASResponse('error', 'Value is required');
  }
  // デバッグ用
  // let sheet = SpreadsheetApp.getActive().getActiveSheet();
  // sheet.appendRow([new Date(), e.postData.contents]);
  
  const linePostData = JSON.parse(e.postData.contents).events[0];
  const lineReplyToken = linePostData.replyToken; // 返信用トークン
  const lineMessageText = linePostData.message.text; // メッセージテキスト
  const user_id = linePostData.source.userId 

  // デバッグ用
  // sheet.appendRow([new Date(), user_id]);
  
  // LINEから受け取ったメッセージをDifyへ転送
  responseDify = callDify(lineMessageText,user_id);
  
  // LINEに返信する
  replyLine(lineReplyToken, responseDify);

  // 正常終了時のレスポンスを返す
  return createGASResponse('success', 'Value received');
}

// GASのレスポンスを生成する関数
function createGASResponse(status, message) {
  return {
    "status": status,
    "message": message
  };
}

// Difyに問い合わせ、回答を取得する関数
function callDify(message,user_id) {
  const payload = {
    "inputs": {},
    "query": message,
    "response_mode": "blocking",
    "conversation_id": "",
    "user": user_id,
    "files": []
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('DIFY_API_KEY')
    },
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  const url = 'https://api.dify.ai/v1/chat-messages';
  const response = UrlFetchApp.fetch(url, options);

  // sheet.appendRow([new Date(), response.getResponseCode()]);

  
  if (response.getResponseCode() === 200) {
    // let sheet = SpreadsheetApp.getActive().getActiveSheet();
    const jsonResponse = JSON.parse(response.getContentText());
    // sheet.appendRow([new Date(), "jsonResponse",jsonResponse]);
    const answer = jsonResponse.answer;
    // sheet.appendRow([new Date(), "answer", answer]);
    return answer;
  } else {
    console.error('Error response from Dify API: ' + response.getContentText());
    return 'Dify の呼び出しに失敗しました。再度実行してください。';
  }
}

// LINEへメッセージを返信する関数
function replyLine(replyToken, message) {
  const payload = {
    'replyToken': replyToken,
    'messages': [{ 'type': 'text', 'text': message }]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN'),
    },
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  const url = 'https://api.line.me/v2/bot/message/reply';
  const response = UrlFetchApp.fetch(url, options);
  const statusCode = response.getResponseCode();
  if (statusCode !== 200) {
    console.error('Failed to send message to LINE. Status code: ' + statusCode + ', Response body: ' + response.getContentText());
  }
}
