// POSTリクエストを受信すると実行される
function doPost(e) {

  // detect error
  // let sheet = SpreadsheetApp.getActive().getActiveSheet();
  // sheet.appendRow([new Date(), e.postData.contents]);

  // リクエストの入力値をチェック
  if (!e?.postData?.contents) {
    console.error('Value is required');
    // エラーレスポンスを返す
    return createGASResponse('error', 'Value is required');
  }

  const linePostData = JSON.parse(e.postData.contents).events[0];
  const lineReplyToken = linePostData.replyToken; // 返信用トークン
  const user_id = linePostData.source.userId; // ユーザーID

  // ヒアリング
  if (linePostData.type == 'postback') {
    hearing_flow(linePostData, lineReplyToken, user_id)
  }

  // 通常
  const lineMessageText = linePostData.message.text; // メッセージテキスト

  // 認証済みユーザーへの対応
  if (isUserRegistered(user_id)) {
    // ユーザーが、解約コードを送信した場合
    if (lineMessageText === 'tgelfdce') {
      removeUserFromSheet(user_id);
      replyLine(lineReplyToken, '解約完了しました。\nまたお話しできる機会を楽しみにしています😊');
    } 
    // ユーザーが「ヒアリング」と送信した場合
    else if (lineMessageText === 'ヒアリング') {
      clear_history(user_id)
      interview(lineReplyToken);
    }  
    else {
        const conversation_id = getConversationId(user_id, lineReplyToken,lineMessageText)
      const responseDify = callDify(lineMessageText, user_id,conversation_id);
      // LINEに返信する
      replyLine(lineReplyToken, responseDify);
    }
  // 非認証ユーザーの対応
  } else {
    // 認証メッセージを送信した場合、IDをスプレッドシートに格納
    if (lineMessageText === 'cnwlpxsl') {
      registerUser(user_id);
      replyLine(lineReplyToken, 'こんにちは！あなたのIDを登録しました。');
    } else {
      replyLine(lineReplyToken, 'あなたは認証されていません。認証キーを送ってください。');
    }
  }

  // 正常終了時のレスポンスを返す
  return createGASResponse('success', 'Value received');
}

// ユーザーIDがスプレッドシートに登録されているか確認する関数
function isUserRegistered(user_id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // 2列目（ユーザーID列）をチェック
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === user_id) { // 2列目の値がユーザーIDと一致するか確認
      return true;
    }
  }
  return false;
}

// ユーザーIDをスプレッドシートに登録する関数
function registerUser(user_id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date(), user_id, '']); // 空のconversation_idを追加
}

// ユーザーIDをスプレッドシートから削除する関数
function removeUserFromSheet(user_id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === user_id) { // 2列目がユーザーID
      sheet.deleteRow(i + 1); // 該当する行を削除
      break;
    }
  }
}


// ユーザーIDに対応するconversation_idを取得する関数
function getConversationId(user_id,lineReplyToken,lineMessageText) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === user_id) { // 2列目がユーザーID
      const timestamp = data[i][2]; // 3列目がタイムスタンプ
      const conversationId = data[i][3]; // 4列目がconversation_id
      
      // conversation_idが設定されているか確認
      if (conversationId) {
        const now = new Date();
        const registeredTime = new Date(timestamp);
        const elapsedTime = (now - registeredTime) / (1000 * 60 * 60); // 経過時間を時間単位で計算
        
        // 1時間以上経過していたらconversation_idを削除
        if (elapsedTime > 1) {
          sheet.getRange(i + 1, 3, 1, 2).clearContent(); // タイムスタンプとconversation_idを削除
          const responseDify = callDify(lineMessageText, user_id, "");
          // LINEに返信する
          
          replyLine_updated(lineReplyToken, responseDify);
          retur; //エラー発生させてその後の処理を行わないようにする
        }
      }
      return conversationId;
    }
  }
  return null; // 見つからなければnullを返す
}

// GASのレスポンスを生成する関数
function createGASResponse(status, message) {
  return {
    "status": status,
    "message": message
  };
}

// Difyに問い合わせ、回答を取得する関数
function callDify(message, user_id, conversation_id) {
  const payload = {
    "inputs": {},
    "query": message,
    "response_mode": "blocking",
    "conversation_id": conversation_id,
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

  if (response.getResponseCode() === 200) {
      const jsonResponse = JSON.parse(response.getContentText());

      // conversation_id を抽出
      const conversationId = jsonResponse.conversation_id;

      // 現在のアクティブなシートを取得
      let sheet = SpreadsheetApp.getActive().getActiveSheet();

      // スプレッドシートのデータを全て取得
      const data = sheet.getDataRange().getValues();
      
      // データをループして、user_id が見つかる行を探す
      for (let i = 0; i < data.length; i++) {
        if (data[i][1] === user_id) { // 2列目が user_id の列
          // 3列目に日時、4列目に conversation_id を設定
          sheet.getRange(i + 1, 3, 1, 2).setValues([[new Date(), conversationId]]);
          break;
        }
      }

      // API から取得した回答を返す
      const answer = jsonResponse.answer;
      return answer;

  } else {
      // エラーログを出力して、エラーメッセージを返す
      console.error('Error response from Dify API: ' + response.getContentText());
      return '岡本さんの呼び出しに失敗しました。';
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


// 新しいセッションで、LINEへメッセージを返信する関数
function replyLine_updated(replyToken, message) {
  const payload = {
    'replyToken': replyToken,
    'messages': [
            // { 'type': 'text', 'text': '1時間以上経過したので会話を新しく始めますね！' },
            { 'type': 'text', 'text': message} 
          ]
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