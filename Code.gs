// POSTリクエストを受信すると実行される
function doPost(e) {
  var lineReplyToken = null;
  try {
    // エラー検出用
    // let sheet = SpreadsheetApp.getActive().getActiveSheet();
    // sheet.appendRow([new Date(), e.postData.contents]);

    // リクエストの入力値をチェック
    if (!e?.postData?.contents) {
      console.error('Value is required');
      // エラーレスポンスを返す
      return createGASResponse('error', 'Value is required');
    }

    var linePostData = JSON.parse(e.postData.contents);
    var lineReplyToken = linePostData.events[0].replyToken; // 返信用トークン
    const user_id = linePostData.events[0].source.userId; // ユーザーID

    // "events"配列から"type: image"を探す
    const imageEvent = linePostData.events.find(event => event.type === "message" && event.message.type === "image");

    // ヒアリング
    if (linePostData.events[0].type === 'postback') {
      hearing_flow(linePostData.events[0], lineReplyToken, user_id);
    }

    // 通常
    const lineMessageText = linePostData.events[0].message.text; // メッセージテキスト

    // 認証済みユーザーへの対応
    if (isUserRegistered(user_id)) {
      if (lineMessageText === 'tgelfdce') {
        removeUserFromSheet(user_id);
        replyLine(lineReplyToken, '解約完了しました。\nまたお話しできる機会を楽しみにしています😊');
      } else if (lineMessageText === 'ヒアリング') {
        clear_history(user_id);
        interview(lineReplyToken);
      } else {
        if (imageEvent) {
          const imageId = imageEvent.message.id;
          process_image(user_id, imageId, lineReplyToken);
        } else {
          const current_image_id = getImageId(user_id);
          if (current_image_id) {
            const conversation_id = getConversationId_image(user_id);
            const imageblob = fetchImageBlob(current_image_id);
            const image_url = FormatImage(imageblob);
            const responseDify = callImageDify(image_url, lineMessageText, user_id, conversation_id);
            delete_imageid(user_id);
            deleteImageFile(image_url);
            replyLine(lineReplyToken, responseDify);
          } else {
            const conversation_id = getConversationId(user_id, lineReplyToken, lineMessageText);
            const responseDify = callDify(lineMessageText, user_id, conversation_id);
            replyLine(lineReplyToken, responseDify);
          }
        }
      }
    } else {
      if (lineMessageText === 'cnwlpxsl') {
        registerUser(user_id);
        replyLine(lineReplyToken, 'こんにちは！あなたのIDを登録しました。');
      } else {
        replyLine(lineReplyToken, 'あなたは認証されていません。認証キーを送ってください。');
      }
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
    if (lineReplyToken) {
      replyLine(lineReplyToken, '少し時間を空けて，再度お試しください。');
    }
    else {
      var linePostData = JSON.parse(e.postData.contents);
      var lineReplyToken = linePostData.events[0].replyToken;
      replyLine(lineReplyToken, '少し時間を空けて，再度お試しください。')}
    return createGASResponse('error', 'An error occurred');
  }

  // 正常終了時のレスポンスを返す
  return createGASResponse('success', 'Value received');
}
