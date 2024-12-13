// ユーザーが画像を送信してきたときの処理
function process_image(user_id, image_id, lineReplyToken){
  // 現在のアクティブなシートを取得
  let sheet = SpreadsheetApp.getActive().getActiveSheet();
  // スプレッドシートのデータを全て取得
  const data = sheet.getDataRange().getValues();
  
  // データをループして、user_id が見つかる行を探す
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === user_id) {
      sheet.getRange(i + 1, 59).setValue(image_id); 
      break;
    }
  }
  replyLine_image(lineReplyToken)
}


// 画像を送ってきたときに、LINEへメッセージを返信する関数
function replyLine_image(replyToken) {
  const payload = {
    'replyToken': replyToken,
    'messages': [
            { 'type': 'text', 'text': 'この画像についてどのようなことが聞きたいですか？' },
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


// ユーザーIDに対応するimage_idを取得する関数
function getImageId(user_id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === user_id) { // 2列目がユーザーID
      const imageId = data[i][58]; // 59列目がimage_id
      return imageId;
    }
  }
  return null; // 見つからなければnullを返す
}


// Difyに画像とクエリを入力し、回答を得る
function callImageDify(image_url, message, user_id,conversation_id){
  // let sheet23 = SpreadsheetApp.getActive().getActiveSheet();
  // sheet23.appendRow([new Date(), image_url]);

  // testImageUrl(image_url, sheet23)

  let revised_image_url = getDirectImageUrl(image_url)

  // testImageUrl(revised_image_url, sheet23)

  const payload = {
    "inputs": {},
    "query": message,
    "response_mode": "blocking",
    "conversation_id": conversation_id,
    "user": user_id,
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": revised_image_url
      }
    ]
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
      sheet23.appendRow([new Date(), response.getResponseCode()]);
      return '岡本さんの呼び出しに失敗しました（画像）';
  }
}

// Blob形式の画像をラインのサーバーから取得する
function fetchImageBlob(imageId) {
  const url = `https://api-data.line.me/v2/bot/message/${imageId}/content`;

  const options = {
    'method': 'get',
    'headers': {
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN'),
    },
    'muteHttpExceptions': true,
  };

  const response = UrlFetchApp.fetch(url, options);

  if (response.getResponseCode() === 200) {
    return response.getBlob(); // LINE APIからBlob形式で取得
  } else {
    throw new Error(`Failed to fetch image: ${response.getResponseCode()} - ${response.getContentText()}`);
  }
}


// 画像の形式変換(Blobからjpg）と画像の保存
function FormatImage(imageBlob) {
  let sheet2 = SpreadsheetApp.getActive().getActiveSheet();

  const folderId = '19FJ9YJMzqd43lCSr3UxLSHftFPzkcrJk'; // 実際のフォルダIDを設定
  const folder = DriveApp.getFolderById(folderId); // フォルダを取得
  const fileName = `LINE_Image_${new Date().toISOString()}.jpg`; // ファイル名を生成
  const file = folder.createFile(imageBlob); // フォルダにファイルを保存
  file.setName(fileName); // ファイル名を設定
  return file.getUrl(); // 保存したファイルのURLを返す
}

// 画像リンクをダウンロードリンクに変換
function getDirectImageUrl(googleDriveUrl) {
  // ファイルIDを正規表現で抽出
  const match = googleDriveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  } else {
    throw new Error('Invalid Google Drive URL');
  }
}

function delete_imageid(user_id){
  // 現在のアクティブなシートを取得
  let sheet = SpreadsheetApp.getActive().getActiveSheet();
  // スプレッドシートのデータを全て取得
  const data = sheet.getDataRange().getValues();
  
  // データをループして、user_id が見つかる行を探す
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === user_id) {
      sheet.getRange(i + 1, 59).setValue(''); 
      break;
    }
  }
}

function deleteImageFile(fileUrl) {
  try {
    // URLからファイルIDを抽出
    const fileId = fileUrl.match(/[-\w]{25,}/)[0]; // ファイルIDを正規表現で抽出
    const file = DriveApp.getFileById(fileId); // ファイルを取得
    // ファイルを削除（ゴミ箱に移動）
    file.setTrashed(true);
    Logger.log(`Deleted file: ${file.getName()}`); // ログ出力
  } catch (error) {
    Logger.log(`Error deleting file: ${error.message}`); // エラーログ
  }
}


// ユーザーIDに対応するconversation_idを取得する関数
function getConversationId_image(user_id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === user_id) { // 2列目がユーザーID
      const timestamp = data[i][2]; // 3列目がタイムスタンプ
      let conversationId = data[i][3]; // 4列目がconversation_id
      
      // conversation_idが設定されているか確認
      if (conversationId) {
        const now = new Date();
        const registeredTime = new Date(timestamp);
        const elapsedTime = (now - registeredTime) / (1000 * 60 * 60); // 経過時間を時間単位で計算
        
        // 1時間以上経過していたらconversation_idを削除
        if (elapsedTime > 1) {
          sheet.getRange(i + 1, 3, 1, 2).clearContent(); // タイムスタンプとconversation_idを削除
          conversationId = ""
        }
      
      }
      return conversationId;
    }
  }
  return null; // 見つからなければnullを返す
}



// for debug
function testImageUrl(image_url, sheet) {
  const response = UrlFetchApp.fetch(image_url);
  sheet.appendRow([new Date(), response.getResponseCode()]);
  sheet.appendRow([new Date(), response.getHeaders()['Content-Type']]);
}



