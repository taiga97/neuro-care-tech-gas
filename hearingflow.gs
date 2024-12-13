function hearing_flow(linePostData, lineReplyToken, user_id ) {
  const postbackData = linePostData.postback.data;
  let replyMessage = '';
  if (postbackData === '0-wrong' || postbackData === '0-correct') {
    question_number= 0
    replyMessage = '１、時間の見当識';
    if (postbackData === '0-wrong'){
        let sheet = SpreadsheetApp.getActive().getActiveSheet();
        let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
        let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
        let targetRow = -1;                     // 更新する行番号を初期化

        // B列からユーザーIDと一致する行を見つける
        for (let i = 0; i < userIds.length; i++) {
          if (userIds[i][0] === user_id) {
            targetRow = i + 2;  // シートの行番号は1から始まるので+2
            break;
          }}
        // ユーザーIDが見つかった場合に該当箇所に点数を加える。
        if (targetRow !== -1) {
          add_one_category(sheet, targetRow, 55, 1)
        }
        // else
          // エラーメッセージの送信
      end_brain_interview(lineReplyToken)}
    if (postbackData === '0-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)
    }
  }
  if (postbackData === '1-wrong' || postbackData === '1-correct') {
    question_number= 1
    replyMessage = '２、場所の見当識';
    position1 = 5
    point1 = 1
    position2 = 6
    point2 = 2
    if (postbackData === '1-wrong'){
      hearing_two(user_id, question_number, replyMessage, position1, point1, position2, point2, lineReplyToken)}
    if (postbackData === '1-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}
  
  if (postbackData === '2-wrong' || postbackData === '2-correct') {
    question_number= 2
    replyMessage = '３、即時想起';
    position1 = 9
    point1 = 2
    position2 = 10
    point2 = 3
    if (postbackData === '2-wrong'){
      hearing_two(user_id, question_number, replyMessage, position1, point1, position2, point2, lineReplyToken)}
    if (postbackData === '2-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}
  
  if (postbackData === '3-wrong' || postbackData === '3-correct') {
    question_number= 3
    replyMessage = '４、計算';
    position1 = 10
    point1 = 2
    if (postbackData === '3-wrong'){
      hearing_one(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    if (postbackData === '3-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}
  
  if (postbackData === '4-wrong' || postbackData === '4-correct') {
    question_number= 4
    replyMessage = '５、遅延再生';
    position1 = 6
    point1 = 2
    if (postbackData === '4-wrong'){
      hearing_one(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    if (postbackData === '4-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}

  if (postbackData === '5-wrong' || postbackData === '5-correct') {
    question_number= 5
    replyMessage = '６、物品呼称';
    position1 = 7
    point1 = 2
    position2 = 10
    point2 = 1
    if (postbackData === '5-wrong'){
      hearing_two(user_id, question_number, replyMessage, position1, point1, position2, point2, lineReplyToken)}
    if (postbackData === '5-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}

  if (postbackData === '6-wrong' || postbackData === '6-correct') {
    question_number= 6
    replyMessage = '７、文の復唱';
    position1 = 5
    point1 = 1
    position2 = 9
    point2 = 3
    if (postbackData === '6-wrong'){
      hearing_two(user_id, question_number, replyMessage, position1, point1, position2, point2, lineReplyToken)}
    if (postbackData === '6-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}

  if (postbackData === '7-wrong' || postbackData === '7-correct') {
    question_number= 7
    replyMessage = '８、口頭指示（言語理解）';
    position1 = 5
    point1 = 1
    if (postbackData === '7-wrong'){
      hearing_one(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    if (postbackData === '7-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}

  if (postbackData === '8-wrong' || postbackData === '8-correct') {
    question_number= 8
    replyMessage = '９、書字指示（文章理解）';
    position1 = 5
    point1 = 1
    if (postbackData === '8-wrong'){
      hearing_one(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    if (postbackData === '8-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}

  if (postbackData === '9-wrong' || postbackData === '9-correct') {
    question_number= 9
    replyMessage = '10、自発書字';
    position1 = 5
    point1 = 1
    if (postbackData === '9-wrong'){
      hearing_one(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    if (postbackData === '9-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}

  if (postbackData === '10-wrong' || postbackData === '10-correct') {
    question_number= 10
    replyMessage = '11、図形模写';
    position1 = 5
    point1 = 1
    position2 = 8
    point2 = 2
    if (postbackData === '10-wrong'){
      hearing_two(user_id, question_number, replyMessage, position1, point1, position2, point2, lineReplyToken)}
    if (postbackData === '10-correct'){
      interview_brain(lineReplyToken,replyMessage,question_number)}}

  if (postbackData === '11-wrong' || postbackData === '11-correct') {
    question_number= 11
    position1 = 11
    point1 = 5
    if (postbackData === '11-wrong'){
      hearing_one_no_message(user_id, position1, point1)}
      end_brain_interview(lineReplyToken)
    if (postbackData === '11-correct'){
      end_brain_interview(lineReplyToken)}}

// 過去の病気について
  if (postbackData === '21-wrong' || postbackData === '21-correct') {
    question_number= 21
    replyMessage = '膵臓の病気';
    position1 = 12
    point1 = 1
    if (postbackData === '21-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '22-wrong' || postbackData === '22-correct') {
    question_number= 22
    replyMessage = '脳の病気 ';
    position1 = 13
    point1 = 1
    if (postbackData === '22-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '23-wrong' || postbackData === '23-correct') {
    question_number= 23
    replyMessage = '肺の病気 ';
    position1 = 14
    point1 = 1
    if (postbackData === '23-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}     
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '24-wrong' || postbackData === '24-correct') {
    question_number= 24
    replyMessage = '肝臓の病気 ';
    position1 = 15
    point1 = 1
    position2 = 40
    point2 = 1
    if (postbackData === '24-wrong'){
      hearing_add_counter(user_id)
      hearing_two_organ(user_id, question_number, replyMessage, position1, point1, position2, point2, lineReplyToken)}
    if (postbackData === '24-correct'){
      interview_organ(lineReplyToken,replyMessage,question_number)}
  }
  if (postbackData === '25-wrong' || postbackData === '25-correct') {
    question_number= 25
    replyMessage = '胆のうの病気 ';
    position1 = 17
    point1 = 1
    if (postbackData === '25-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '26-wrong' || postbackData === '26-correct') {
    question_number= 26
    replyMessage = '胃の病気';
    position1 = 18
    point1 = 1
    if (postbackData === '26-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '27-wrong' || postbackData === '27-correct') {
    question_number= 27
    replyMessage = '子宮の病気（男性は患ったことないと回答してください）';
    position1 = 19
    point1 = 1
    if (postbackData === '27-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '28-wrong' || postbackData === '28-correct') {
    question_number= 28
    replyMessage = '腸の病気';
    position1 = 20
    point1 = 2
    if (postbackData === '28-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '29-wrong' || postbackData === '29-correct') {
    question_number= 29
    replyMessage = '泌尿器(腎臓)の病気';
    position1 = 21
    point1 = 1
    if (postbackData === '29-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '30-wrong' || postbackData === '30-correct') {
    question_number= 30
    replyMessage = '副腎の病気';
    position1 = 22
    point1 = 1
    if (postbackData === '30-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '31-wrong' || postbackData === '31-correct') {
    question_number= 31
    replyMessage = '免疫系の病気';
    position1 = 23
    point1 = 1
    if (postbackData === '31-wrong'){
      hearing_add_counter(user_id)
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)}
    interview_organ(lineReplyToken,replyMessage,question_number)
  }
  if (postbackData === '32-wrong' || postbackData === '32-correct') {
    question_number= 32
    replyMessage = '糖尿病';
    if (postbackData === '32-wrong'){
        hearing_add_counter(user_id)    
        let sheet = SpreadsheetApp.getActive().getActiveSheet();
        let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
        let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
        let targetRow = -1;                     // 更新する行番号を初期化

        // B列からユーザーIDと一致する行を見つける
        for (let i = 0; i < userIds.length; i++) {
          if (userIds[i][0] === user_id) {
            targetRow = i + 2;  // シートの行番号は1から始まるので+2
            break;
          }}
        // ユーザーIDが見つかった場合に該当箇所に点数を加える。
        if (targetRow !== -1) {
          add_one_category(sheet, targetRow, 22, 1)
          add_one_category(sheet, targetRow, 17, 1)
          add_one_category(sheet, targetRow, 21, 1)
          add_one_category(sheet, targetRow, 16, 1)
        }
        // else
          // エラーメッセージの送信

        interview_organ(lineReplyToken,replyMessage,question_number)
      }
      if (postbackData === '32-correct'){
        interview_organ(lineReplyToken,replyMessage,question_number)}
  }
  if (postbackData === '33-wrong' || postbackData === '33-correct') {
    question_number= 33
    if (postbackData === '33-wrong'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 17, 1)
        add_one_category(sheet, targetRow, 21, 1)
        add_one_category(sheet, targetRow, 13, 1)
      }
      // else
        // エラーメッセージの送信

      end_organ_interview(lineReplyToken)
    }
    if (postbackData === '33-correct'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      if (targetRow !== -1) { //すべて当てはまらない
        let currentValue = sheet.getRange(targetRow, 25, 1, 1).getValues()[0][0];
        if (currentValue == "") {   
          add_one_category(sheet, targetRow, 22, 2)
          add_one_category(sheet, targetRow, 17, 2)
          add_one_category(sheet, targetRow, 13, 2)        
        }
      }
      end_organ_interview(lineReplyToken)}
  }

  // 次に、食生活についての質問していきます。1週間で小麦製品を食べる頻度を教えてください。
  if (postbackData === '40-1' || postbackData === '40-2'|| postbackData === '40-3'|| postbackData === '40-4') {
    question_number= 40
    if (postbackData === '40-2'|| postbackData === '40-3'|| postbackData === '40-4'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 51, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_kanshoku(lineReplyToken, question_number)
  }
// 1週間で間食する頻度を教えてください。
  if (postbackData === '41-1' || postbackData === '41-2'|| postbackData === '41-3'|| postbackData === '41-4') {
    question_number= 41
    if (postbackData === '41-2'|| postbackData === '41-3'|| postbackData === '41-4'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 52, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_milk(lineReplyToken, question_number)
  }

// 1週間で乳製品を食べる頻度を教えてください。
  if (postbackData === '42-1' || postbackData === '42-2'|| postbackData === '42-3'|| postbackData === '42-4') {
    question_number= 42
    if (postbackData === '42-2'|| postbackData === '42-3'|| postbackData === '42-4'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 53, 1)
      }
      // else
        // エラーメッセージの送信
    }
    end_food_interview(lineReplyToken)
  }

  if (postbackData === '50-1' || postbackData === '50-2') {
    question_number= 50
    replyMessage1 = '以下の内容の中で当てはまるものを教えてください。';
    replyMessage2 = '汗をかきにくい。'
    if (postbackData === '50-1'){
      hearing_one_no_message(user_id, 12, 1)
      hearing_one_no_message(user_id, 22, 1)
      //「はい」の場合は、次の質問は飛ばし、「水以外に口にする飲み物について教えてください！」へ行く。
      // 医者からの指示がありに+1する。
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 26, 1)
      }
      // else
        // エラーメッセージの送信

      question_number= 60
      replyMessage1 = '次は、水以外に口にする飲み物について教えてください！(複数の回答可)'
      replyMessage2 = 'カフェイン系(コーヒー、お茶)';
      interview_water2(lineReplyToken, replyMessage1, replyMessage2, question_number)
    }
    if (postbackData === '50-2'){    
      interview_water2(lineReplyToken, replyMessage1, replyMessage2, question_number)
    }
  }
  if (postbackData === '51-yes' || postbackData === '51-no') {
    question_number= 51
    replyMessage = 'まぶたがむくんでいる';
    if (postbackData === '51-yes'){
      hearing_one_no_message(user_id, 27, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '52-yes' || postbackData === '52-no') {
    question_number= 52
    replyMessage = '二重あごである';
    if (postbackData === '52-yes'){
      hearing_one_no_message(user_id, 28, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '53-yes' || postbackData === '53-no') {
    question_number= 53
    replyMessage = '鼻水やくしゃみが多い';
    if (postbackData === '53-yes'){
      hearing_one_no_message(user_id, 29, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '54-yes' || postbackData === '54-no') {
    question_number= 54
    replyMessage = '舌がボテッとしている。舌の縁に歯形がある。';
    if (postbackData === '54-yes'){
      hearing_one_no_message(user_id, 30, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '55-yes' || postbackData === '55-no') {
    question_number= 55
    replyMessage = '体の冷えを感じる。手足が冷たい。';
    if (postbackData === '55-yes'){
      hearing_one_no_message(user_id, 31, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '56-yes' || postbackData === '56-no') {
    question_number= 56
    replyMessage = 'おなかに触ると冷たい。';
    if (postbackData === '56-yes'){
      hearing_one_no_message(user_id, 32, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '57-yes' || postbackData === '57-no') {
    question_number= 57
    replyMessage = '下痢もしくは便秘が多い。';
    if (postbackData === '57-yes'){
      hearing_one_no_message(user_id, 33, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '58-yes' || postbackData === '58-no') {
    question_number= 58
    replyMessage = '下肢にむくみがある。大根足。';
    if (postbackData === '58-yes'){
      hearing_one_no_message(user_id, 34, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '59-yes' || postbackData === '59-no') {
    question_number= 59
    replyMessage = '昼寝する。日中眠気に襲われる。';
    if (postbackData === '59-yes'){
      hearing_one_no_message(user_id, 35, 1)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '60-yes' || postbackData === '60-no') {
    question_number= 60
    replyMessage1 = '次は、水以外に口にする飲み物について教えてください！(複数の回答可)';
    replyMessage2 = 'カフェイン系(コーヒー、お茶)';
    if (postbackData === '60-yes'){
      hearing_one_no_message(user_id, 36, 1)
    }
    interview_water2(lineReplyToken, replyMessage1, replyMessage2, question_number)
  }
  //水以外に口にする飲み物について教えてください！
  if (postbackData === '61-yes' || postbackData === '61-no') {
    question_number= 61
    replyMessage = '甘味系(ジュースなど)';
    position1 = 23
    point1 = 2
    if (postbackData === '61-yes'){
      hearing_one_organ(user_id, question_number, replyMessage, position1, point1, lineReplyToken)
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
  if (postbackData === '62-yes' || postbackData === '62-no') {
    question_number= 62
    replyMessage = 'アルコール類';
    if (postbackData === '62-yes'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 13, 1)
        add_one_category(sheet, targetRow, 17, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_water(lineReplyToken, replyMessage, question_number)
  }
if (postbackData === '63-yes' || postbackData === '63-no') {
    question_number= 63
    if (postbackData === '63-yes'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 17, 1)
        add_one_category(sheet, targetRow, 21, 1)
        add_one_category(sheet, targetRow, 19, 1)
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 23, 2)
      }
      // else
        // エラーメッセージの送信
    }
    interview_ben(lineReplyToken, question_number)
  }
  // 1週間で排便はどのくらいありますか？
  if (postbackData === '64-1' || postbackData === '64-2'|| postbackData === '64-3'|| postbackData === '64-4') {
    question_number= 64
    if (postbackData === '64-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 19, 1)
        add_one_category(sheet, targetRow, 24, 1)
        add_one_category(sheet, targetRow, 21, 1)
        add_one_category(sheet, targetRow, 20, 1)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '64-3'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 19, 2)
        add_one_category(sheet, targetRow, 24, 2)
        add_one_category(sheet, targetRow, 21, 2)
        add_one_category(sheet, targetRow, 20, 2)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '64-4'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 19, 3)
        add_one_category(sheet, targetRow, 24, 3)
        add_one_category(sheet, targetRow, 21, 3)
        add_one_category(sheet, targetRow, 20, 3)
      }
      // else
        // エラーメッセージの送信
    }
    interview_drug(lineReplyToken, question_number)
  }

  // 薬は何種類飲んでいますか？
  if (postbackData === '65-1' || postbackData === '65-2'|| postbackData === '65-3'|| postbackData === '65-4') {
    question_number= 65
    if (postbackData === '65-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 17, 1)
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 21, 1)
        add_one_category(sheet, targetRow, 19, 1)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '65-3'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 17, 2)
        add_one_category(sheet, targetRow, 22, 2)
        add_one_category(sheet, targetRow, 21, 2)
        add_one_category(sheet, targetRow, 19, 2)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '65-4'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 17, 3)
        add_one_category(sheet, targetRow, 22, 3)
        add_one_category(sheet, targetRow, 21, 3)
        add_one_category(sheet, targetRow, 19, 3)
      }
      // else
        // エラーメッセージの送信
    }
    interview_exercise(lineReplyToken, question_number)
  }

  // 1週間でどれくらい運動してますか？
  if (postbackData === '66-1' || postbackData === '66-2'|| postbackData === '66-3'|| postbackData === '66-4') {
    question_number= 66
    if (postbackData === '66-1'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 15, 2)
        add_one_category(sheet, targetRow, 12, 2)
        add_one_category(sheet, targetRow, 22, 2)
        add_one_category(sheet, targetRow, 20, 2)
        add_one_category(sheet, targetRow, 37, 1)
        for (let i = 39; i <= 48; i++) {
          add_one_category(sheet, targetRow, i, 2);
        }
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '66-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 15, 1)
        add_one_category(sheet, targetRow, 12, 1)
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 20, 1)
        add_one_category(sheet, targetRow, 37, 2)
        for (let i = 39; i <= 48; i++) {
          add_one_category(sheet, targetRow, i, 1);
        }
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '66-3'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 15, 1)
        add_one_category(sheet, targetRow, 12, 1)
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 20, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_exercise_intense(lineReplyToken, question_number)
  }

 // 運動強度についても教えてください！
  if (postbackData === '67-1' || postbackData === '67-2'|| postbackData === '67-3') {
    question_number= 67
    if (postbackData === '67-1'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 15, 1)
        add_one_category(sheet, targetRow, 12, 1)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '67-3'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 15, 1)
        add_one_category(sheet, targetRow, 39, 1)
        add_one_category(sheet, targetRow, 40, 1)
        add_one_category(sheet, targetRow, 41, 1)
        add_one_category(sheet, targetRow, 42, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_body1(lineReplyToken, question_number)
  }
// むくみがあるかどうか教えてください！
  if (postbackData === '68-1' || postbackData === '68-2'|| postbackData === '68-3') {
    question_number= 68
    if (postbackData === '68-1'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 12, 1)
        add_one_category(sheet, targetRow, 17, 1)
        add_one_category(sheet, targetRow, 43, 1)
        add_one_category(sheet, targetRow, 44, 1)
        add_one_category(sheet, targetRow, 45, 1)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '68-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 22, 2)
        add_one_category(sheet, targetRow, 12, 2)
        add_one_category(sheet, targetRow, 17, 2)
        add_one_category(sheet, targetRow, 43, 2)
        add_one_category(sheet, targetRow, 44, 2)
        add_one_category(sheet, targetRow, 45, 2)
      }
      // else
        // エラーメッセージの送信
    }
    interview_body2(lineReplyToken, question_number)
  }
// 食欲はありますか？
  if (postbackData === '69-1' || postbackData === '69-2'|| postbackData === '69-3') {
    question_number= 69
    if (postbackData === '69-1'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 19, 2)
        add_one_category(sheet, targetRow, 21, 2)
        add_one_category(sheet, targetRow, 17, 2)
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 23, 1)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '69-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 19, 1)
        add_one_category(sheet, targetRow, 21, 1)
        add_one_category(sheet, targetRow, 17, 1)
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 23, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_body3(lineReplyToken, question_number)
  }

// 肌は乾燥していますか？
  if (postbackData === '70-1' || postbackData === '70-2'|| postbackData === '70-3') {
    question_number= 70
    if (postbackData === '70-1'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 15, 2)
        add_one_category(sheet, targetRow, 20, 2)
        add_one_category(sheet, targetRow, 21, 2)
        add_one_category(sheet, targetRow, 22, 2)
        add_one_category(sheet, targetRow, 42, 1)
        add_one_category(sheet, targetRow, 40, 2)
        add_one_category(sheet, targetRow, 41, 1)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '70-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 15, 1)
        add_one_category(sheet, targetRow, 20, 1)
        add_one_category(sheet, targetRow, 21, 1)
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 40, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_body4(lineReplyToken, question_number)
  }
// 意欲低下や倦怠感はありますか？
  if (postbackData === '71-1' || postbackData === '71-2'|| postbackData === '71-3') {
    question_number= 71
    if (postbackData === '71-1'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 23, 2)
        add_one_category(sheet, targetRow, 17, 2)
        add_one_category(sheet, targetRow, 13, 2)
        add_one_category(sheet, targetRow, 18, 1)
        add_one_category(sheet, targetRow, 39, 2)
        add_one_category(sheet, targetRow, 46, 2)
        add_one_category(sheet, targetRow, 47, 2)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '71-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 23, 1)
        add_one_category(sheet, targetRow, 17, 1)
        add_one_category(sheet, targetRow, 13, 1)
        add_one_category(sheet, targetRow, 18, 1)
        add_one_category(sheet, targetRow, 39, 1)
        add_one_category(sheet, targetRow, 46, 1)
        add_one_category(sheet, targetRow, 47, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_body5(lineReplyToken, question_number)
  }

// 手足の冷えはありますか？
  if (postbackData === '72-1' || postbackData === '72-2'|| postbackData === '72-3') {
    question_number= 72
    if (postbackData === '72-1'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 12, 2)
        add_one_category(sheet, targetRow, 22, 2)
        add_one_category(sheet, targetRow, 15, 2)
        add_one_category(sheet, targetRow, 16, 2)
        add_one_category(sheet, targetRow, 45, 2)
        add_one_category(sheet, targetRow, 44, 2)
        add_one_category(sheet, targetRow, 40, 1)
        add_one_category(sheet, targetRow, 41, 1)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '72-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 12, 1)
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 15, 1)
        add_one_category(sheet, targetRow, 16, 1)
        add_one_category(sheet, targetRow, 45, 1)
        add_one_category(sheet, targetRow, 44, 1)
      }
      // else
        // エラーメッセージの送信
    }
    interview_body6(lineReplyToken, question_number)
  }

// 腰痛や肩こりはありますか？
  if (postbackData === '73-1' || postbackData === '73-2'|| postbackData === '73-3') {
    question_number= 73
    if (postbackData === '73-1'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 22, 2)
        add_one_category(sheet, targetRow, 17, 2)
        add_one_category(sheet, targetRow, 19, 2)
        add_one_category(sheet, targetRow, 12, 2)
        add_one_category(sheet, targetRow, 16, 1)
        add_one_category(sheet, targetRow, 39, 2)
        add_one_category(sheet, targetRow, 48, 2)
        add_one_category(sheet, targetRow, 47, 2)
        add_one_category(sheet, targetRow, 42, 2)
      }
      // else
        // エラーメッセージの送信
    }
    if (postbackData === '73-2'){
      let sheet = SpreadsheetApp.getActive().getActiveSheet();
      let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
      let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
      let targetRow = -1;                     // 更新する行番号を初期化

      // B列からユーザーIDと一致する行を見つける
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user_id) {
          targetRow = i + 2;  // シートの行番号は1から始まるので+2
          break;
        }}
      // ユーザーIDが見つかった場合に該当箇所に点数を加える。
      if (targetRow !== -1) {
        add_one_category(sheet, targetRow, 22, 1)
        add_one_category(sheet, targetRow, 17, 1)
        add_one_category(sheet, targetRow, 19, 1)
        add_one_category(sheet, targetRow, 12, 1)
        add_one_category(sheet, targetRow, 39, 1)
        add_one_category(sheet, targetRow, 48, 1)
        add_one_category(sheet, targetRow, 47, 1)
        add_one_category(sheet, targetRow, 42, 1)
      }
      // else
        // エラーメッセージの送信
    }
    
    // Get index
    let sheet = SpreadsheetApp.getActive().getActiveSheet();
    let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
    let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
    let targetRow = -1;                     // 更新する行番号を初期化

    // B列からユーザーIDと一致する行を見つける
    for (let i = 0; i < userIds.length; i++) {
      if (userIds[i][0] === user_id) {
        targetRow = i + 2;  // シートの行番号は1から始まるので+2
        break;
      }}

    if (targetRow !== -1) {
      // prefrontal
      let MSE_Value = sheet.getRange(targetRow, 55, 1, 1).getValues()[0][0];
      let fValue = sheet.getRange(targetRow, 6, 1, 1).getValues()[0][0];
      let gValue = sheet.getRange(targetRow, 7, 1, 1).getValues()[0][0];
      let hValue = sheet.getRange(targetRow, 8, 1, 1).getValues()[0][0];

      let brain_url = "https://drive.google.com/file/d/1qv3c0cjh32MDe7IMw71n0n41oFBldLJW/view?usp=drive_link"

      if (MSE_Value == ""){
        // 比較して最も大きい値の列名を取得
        let maxColumn = '0';  // デフォルトはF列に設定
        let maxValue = fValue;

        if (gValue > maxValue) {
          maxColumn = '1';
          maxValue = gValue;
        }
        if (hValue > maxValue) {
          maxColumn = '2';
        }
        let prefrontal_index = maxColumn
        
        // brain
        let brain_value_one = sheet.getRange(targetRow, 5, 1, 1).getValues()[0]; 
        let brain_values_multi = sheet.getRange(targetRow, 9, 1, 3).getValues()[0]; 
        let brain_values = brain_value_one.concat(brain_values_multi); 
        let brain_columnNames = ['0', '1', '2', '3'];

        // 最も大きい値とその列名を初期化
        maxColumn = brain_columnNames[0];
        maxValue = brain_values[0];

        // 値を比較して最も大きい値を持つ列名を抽出
        for (let i = 1; i < brain_values.length; i++) {
          if (brain_values[i] > maxValue) {
            maxValue = brain_values[i];
            maxColumn = brain_columnNames[i];
          }
        }
        let brain_index = maxColumn

        if (prefrontal_index == 0 && brain_index == 0) {
          brain_url =  "https://drive.google.com/file/d/1jvnCeWjED07nNWt2Cadg5MyDMK12n0ni/view?usp=drive_link";
        }
        if (prefrontal_index == 0 && brain_index == 1) {
          brain_url =  "https://drive.google.com/file/d/1WfZw-j1wH2zIHMmlq7WabqDi5D3y-bux/view?usp=drive_link";
        }
        if (prefrontal_index == 0 && brain_index == 2) {
          brain_url =  "https://drive.google.com/file/d/1gqdNKsiIDj6BM920cmgRmd4xqcnK7DPU/view?usp=drive_link";
        }  
        if (prefrontal_index == 0 && brain_index == 3) {
          brain_url =  "https://drive.google.com/file/d/1DI3TC9O_DbiDHI49IsfQ7lU-fqkyTuXO/view?usp=drive_link";
        }
        if (prefrontal_index == 1 && brain_index == 0) {
          brain_url =  "https://drive.google.com/file/d/1VIwqFpHt6ifCqRAValp1HnlUlrYOX3e1/view?usp=drive_link";
        }
        if (prefrontal_index == 1 && brain_index == 1) {
          brain_url =  "https://drive.google.com/file/d/1leHbDK_b956p3alWREoH4yicJKdm7ZpE/view?usp=drive_link";
        }
        if (prefrontal_index == 1 && brain_index == 2) {
          brain_url =  "https://drive.google.com/file/d/15KVnQWjA56QglE1oaj2viSk8GW8887fM/view?usp=drive_link";
        }
        if (prefrontal_index == 1 && brain_index == 3) {
          brain_url =  "https://drive.google.com/file/d/1p4tSyNeJvoTOLX1I1_MueUEw-F_N9xeV/view?usp=drive_link";
        }
        if (prefrontal_index == 2 && brain_index == 0) {
          brain_url =  "https://drive.google.com/file/d/1Qy4y2zNtP9tbZvihKukK1UuyJcX4-ZSc/view?usp=drive_link";
        }  
        if (prefrontal_index == 2 && brain_index == 1) {
          brain_url =  "https://drive.google.com/file/d/1pJMFJ1_bvnzmUMiwSqiPjSxefg10DLFB/view?usp=drive_link";
        }
        if (prefrontal_index == 2 && brain_index == 2) {
          brain_url =  "https://drive.google.com/file/d/1QkPHNKPV70QjDkGQorxmoDckSPayDTrw/view?usp=drive_link";
        }
        if (prefrontal_index == 2 && brain_index == 3) {
          brain_url =  "https://drive.google.com/file/d/11sgBvy5BvEy56A7mQ65BRXSUJrQYpwZj/view?usp=drive_link";
        }                
      }

      // organ 
      let organ_values = sheet.getRange(targetRow, 12, 1, 13).getValues()[0]; 
      let organ_columnNames = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

      // Reorder organ_columnNames
      let new_organ_columnNames = ['22','17','21','15', '24', '19','12', '20', '23', '13', '18', '16', '14'];

      // Create a mapping to rearrange organ_values according to the new organ_columnNames
      let new_organ_values = new_organ_columnNames.map(col => {
        let index = organ_columnNames.indexOf(col); 
        return organ_values[index]; 
      });

      // 最も大きい値と二番目に大きい値、それらの列名を初期化
      let organ_maxColumn = new_organ_columnNames[0];
      let organ_secondMaxColumn = new_organ_columnNames[1];
      let organ_maxValue = new_organ_values[0];
      let organ_secondMaxValue = new_organ_values[1]; // 非常に小さい値で初期化
      // sheet.appendRow([new Date(), organ_secondMaxValue]);
      // 値を比較して最も大きい値と二番目に大きい値を持つ列名を抽出
      for (let i = 1; i < new_organ_values.length; i++) {
        // sheet.appendRow([new Date(), new_organ_values[i]]);
        if (new_organ_values[i] > organ_maxValue) {
          // sheet.appendRow([new Date(), new_organ_values[i]]);
          organ_secondMaxValue = organ_maxValue;
          organ_secondMaxColumn = organ_maxColumn;

          organ_maxValue = new_organ_values[i];
          organ_maxColumn = new_organ_columnNames[i];
        } else if (new_organ_values[i] > organ_secondMaxValue) {
          organ_secondMaxValue = new_organ_values[i];
          organ_secondMaxColumn = new_organ_columnNames[i];
        }
      }
      // sheet.appendRow([new Date(), organ_maxValue]);
      // sheet.appendRow([new Date(), organ_secondMaxValue]);
      let organ_index = organ_maxColumn;
      let second_organ_index = organ_secondMaxColumn;

      // Google Drive URLs for max organ
      if (organ_index == '12') {
        organ_url = "https://drive.google.com/file/d/1hh2UvQ6ISyUZt1J4iuBUSWdZNJ2VKPIf/view?usp=drive_link";
      } else if (organ_index == '13') {
        organ_url = "https://drive.google.com/file/d/10Yh5vB3ElIsTCCMQtg1UNjtFaVMPriHE/view?usp=drive_link";
      } else if (organ_index == '14') { //脳はたぶん間違いだからあとで削除
        organ_url = "https://drive.google.com/file/d/1hh2UvQ6ISyUZt1J4iuBUSWdZNJ2VKPIf/view?usp=drive_link";
      } else if (organ_index == '15') {
        organ_url = "https://drive.google.com/file/d/12AWIOa82PGJzGNRU8XlVT2r_f3Md-UCP/view?usp=drive_link";
      } else if (organ_index == '16') { 
        organ_url = "https://drive.google.com/file/d/1oi-W5w1zn28gjVIBxnzGSd8N9Tfi6lRt/view?usp=drive_link";
      } else if (organ_index == '17') {
        organ_url = "https://drive.google.com/file/d/120AtYvlGEb1J-0uwMtbJEGdSR6qHCaq-/view?usp=drive_link";
      } else if (organ_index == '18') {
        organ_url = "https://drive.google.com/file/d/14cLqjW3nj2LJ9L9xO1kiIGY1RpA58R1h/view?usp=drive_link";
      } else if (organ_index == '19') {
        organ_url = "https://drive.google.com/file/d/1zNWH50BMxfX_yfNeEvnZXbqrKHiUQutr/view?usp=drive_link";
      } else if (organ_index == '20') {
        organ_url = "https://drive.google.com/file/d/11hB9c05cPN-HusmmENEpj_3F4BKk6vB8/view?usp=drive_link";
      } else if (organ_index == '21') {
        organ_url = "https://drive.google.com/file/d/1u5dovfvMrWwPulBE0IZHVHTaAmKNsJMm/view?usp=drive_link";
      } else if (organ_index == '22') {
        organ_url = "https://drive.google.com/file/d/1MeexNGwXNz1ucrhM1jhZp8-yUB6FTfmp/view?usp=drive_link";
      } else if (organ_index == '23') {
        organ_url = "https://drive.google.com/file/d/1_UxyGADQ7f2-VuDH1Gt9gcQskeSWJQFC/view?usp=drive_link";
      } else if (organ_index == '24') {
        organ_url = "https://drive.google.com/file/d/1oi-W5w1zn28gjVIBxnzGSd8N9Tfi6lRt/view?usp=drive_link";
      } 

      // Google Drive URLs for second organ
      if (second_organ_index == '12') {
        second_organ_url = "https://drive.google.com/file/d/1hh2UvQ6ISyUZt1J4iuBUSWdZNJ2VKPIf/view?usp=drive_link";
      } else if (second_organ_index == '13') {
        second_organ_url = "https://drive.google.com/file/d/10Yh5vB3ElIsTCCMQtg1UNjtFaVMPriHE/view?usp=drive_link";
      } else if (second_organ_index == '14') {
        second_organ_url = "https://drive.google.com/file/d/1hh2UvQ6ISyUZt1J4iuBUSWdZNJ2VKPIf/view?usp=drive_link";
      } else if (second_organ_index == '15') {
        second_organ_url = "https://drive.google.com/file/d/12AWIOa82PGJzGNRU8XlVT2r_f3Md-UCP/view?usp=drive_link";
      } else if (second_organ_index == '16') {
        second_organ_url = "https://drive.google.com/file/d/1hh2UvQ6ISyUZt1J4iuBUSWdZNJ2VKPIf/view?usp=drive_link";
      } else if (second_organ_index == '17') {
        second_organ_url = "https://drive.google.com/file/d/120AtYvlGEb1J-0uwMtbJEGdSR6qHCaq-/view?usp=drive_link";
      } else if (second_organ_index == '18') {
        second_organ_url = "https://drive.google.com/file/d/14cLqjW3nj2LJ9L9xO1kiIGY1RpA58R1h/view?usp=drive_link";
      } else if (second_organ_index == '19') {
        second_organ_url = "https://drive.google.com/file/d/1zNWH50BMxfX_yfNeEvnZXbqrKHiUQutr/view?usp=drive_link";
      } else if (second_organ_index == '20') {
        second_organ_url = "https://drive.google.com/file/d/11hB9c05cPN-HusmmENEpj_3F4BKk6vB8/view?usp=drive_link";
      } else if (second_organ_index == '21') {
        second_organ_url = "https://drive.google.com/file/d/1u5dovfvMrWwPulBE0IZHVHTaAmKNsJMm/view?usp=drive_link";
      } else if (second_organ_index == '22') {
        second_organ_url = "https://drive.google.com/file/d/1MeexNGwXNz1ucrhM1jhZp8-yUB6FTfmp/view?usp=drive_link";
      } else if (second_organ_index == '23') {
        second_organ_url = "https://drive.google.com/file/d/1_UxyGADQ7f2-VuDH1Gt9gcQskeSWJQFC/view?usp=drive_link";
      }
      
      // muscle
      let muscle_values = sheet.getRange(targetRow, 39, 1, 10).getValues()[0];
      let muscle_columnNames = ['39', '40', '41', '42', '43', '44', '45', '46', '47', '48'];

      // 新しい順序に並べ替えるための新しい列名
      let new_muscle_columnNames = ['44', '45', '40', '42', '39', '41', '43', '46', '47', '48'];

      // 新しい順序に基づいてmuscle_valuesを並べ替え
      let new_muscle_values = new_muscle_columnNames.map(col => {
          let index = muscle_columnNames.indexOf(col);  // 元のインデックスを取得
          return muscle_values[index];  // 対応する値を取得
      });
      // 最も大きい値と二番目に大きい値、それらの列名を初期化
      maxColumn = new_muscle_columnNames[0];
      secondMaxColumn = new_muscle_columnNames[1];
      maxValue = new_muscle_values[0];
      secondMaxValue = new_muscle_values[1]; // 非常に小さい値で初期化

      // 値を比較して最も大きい値と二番目に大きい値を持つ列名を抽出
      for (let i = 1; i < new_muscle_values.length; i++) {
        if (new_muscle_values[i] > maxValue) {
          secondMaxValue = maxValue;
          secondMaxColumn = maxColumn;

          maxValue = new_muscle_values[i];
          maxColumn = new_muscle_columnNames[i];
        } else if (new_muscle_values[i] > secondMaxValue) {
          secondMaxValue = new_muscle_values[i];
          secondMaxColumn = new_muscle_columnNames[i];
        }
      }

      let muscle_index = maxColumn;
      let second_muscle_index = secondMaxColumn;


if (muscle_index == '39') {
        muscle_url = "https://drive.google.com/file/d/1sCKut15liEXe5ftLCyC158Ofe8viWFQ4/view?usp=drive_link";
      } else if (muscle_index == '40') {
        muscle_url = "https://drive.google.com/file/d/1obkCbM0s3ACTn1OWkDasfihnf4LWCGat/view?usp=drive_link";
      } else if (muscle_index == '41') {
        muscle_url = "https://drive.google.com/file/d/1D9_i6o0khAecO-JDCbmJUB3s6iubz5Ab/view?usp=drive_link";
      } else if (muscle_index == '42') {
        muscle_url = "https://drive.google.com/file/d/14tnNTpQxRJLkVWLFxFkizq-pGuEraj-E/view?usp=drive_link";
      } else if (muscle_index == '43') {
        muscle_url = "https://drive.google.com/file/d/1osCcbMjvrLlILNAwTGQS46wFR9uR2vgF/view?usp=drive_link";
      } else if (muscle_index == '44') {
        muscle_url = "https://drive.google.com/file/d/14k4PvL1pDsss2sNY7_CPtDozsENz-bRo/view?usp=drive_link";
      } else if (muscle_index == '45') {
        muscle_url = "https://drive.google.com/file/d/1cz3Nh8xCxdYvjxgo5cp5QOZN51kcmZiK/view?usp=drive_link";
      } else if (muscle_index == '46') {
        muscle_url = "https://drive.google.com/file/d/18c8G014QXvur-uUnuzyPA7CfVR6xfTOz/view?usp=drive_link";
      } else if (muscle_index == '47') {
        muscle_url = "https://drive.google.com/file/d/17IhJoSEyHDMA5XoWKaZQXJ5lPDPI-h57/view?usp=drive_link";
      } else if (muscle_index == '48') {
        muscle_url = "https://drive.google.com/file/d/1PKQ6DtrXucMu4xj3cnu90MRkRDwWorA6/view?usp=drive_link";
      } 

      // Google Drive URLs for second muscle
      if (second_muscle_index == '39') {
        second_muscle_url = "https://drive.google.com/file/d/1sCKut15liEXe5ftLCyC158Ofe8viWFQ4/view?usp=drive_link";
      } else if (second_muscle_index == '40') {
        second_muscle_url = "https://drive.google.com/file/d/1obkCbM0s3ACTn1OWkDasfihnf4LWCGat/view?usp=drive_link";
      } else if (second_muscle_index == '41') {
        second_muscle_url = "https://drive.google.com/file/d/1D9_i6o0khAecO-JDCbmJUB3s6iubz5Ab/view?usp=drive_link";
      } else if (second_muscle_index == '42') {
        second_muscle_url = "https://drive.google.com/file/d/14tnNTpQxRJLkVWLFxFkizq-pGuEraj-E/view?usp=drive_link";
      } else if (second_muscle_index == '43') {
        second_muscle_url = "https://drive.google.com/file/d/1osCcbMjvrLlILNAwTGQS46wFR9uR2vgF/view?usp=drive_link";
      } else if (second_muscle_index == '44') {
        second_muscle_url = "https://drive.google.com/file/d/14k4PvL1pDsss2sNY7_CPtDozsENz-bRo/view?usp=drive_link";
      } else if (second_muscle_index == '45') {
        second_muscle_url = "https://drive.google.com/file/d/1cz3Nh8xCxdYvjxgo5cp5QOZN51kcmZiK/view?usp=drive_link";
      } else if (second_muscle_index == '46') {
        second_muscle_url = "https://drive.google.com/file/d/18c8G014QXvur-uUnuzyPA7CfVR6xfTOz/view?usp=drive_link";
      } else if (second_muscle_index == '47') {
        second_muscle_url = "https://drive.google.com/file/d/17IhJoSEyHDMA5XoWKaZQXJ5lPDPI-h57/view?usp=drive_link";
      } else if (second_muscle_index == '48') {
        second_muscle_url = "https://drive.google.com/file/d/1PKQ6DtrXucMu4xj3cnu90MRkRDwWorA6/view?usp=drive_link";
      } 


      // exercise
      let exercise_value = sheet.getRange(targetRow, 37, 1, 1).getValues()[0][0];
      let exercise_url = "https://drive.google.com/file/d/1xS3Dg31QyFkYSzKzJNzeO96EogHwlZYc/view?usp=drive_link"
      if (exercise_value == "1"){
        exercise_url = "https://drive.google.com/file/d/1YbRaPnhv5G_7zvblH_lryob7NTGgL_h9/view?usp=drive_link"
      } else if (exercise_value == "2"){
        exercise_url = "https://drive.google.com/file/d/1_hBzemrvmwxTrGf3g7uWX9_-wwIJQ74p/view?usp=drive_link"
      }

      
      // meal
      let wheat_value = sheet.getRange(targetRow, 51, 1, 1).getValues()[0][0];
      let snack_value = sheet.getRange(targetRow, 52, 1, 1).getValues()[0][0];
      let milk_value = sheet.getRange(targetRow, 53, 1, 1).getValues()[0][0];
      let meal_url = "https://drive.google.com/file/d/1y3_ThQ4Pl2yPQaZ_d1KGj6vhlH7hLYIG/view?usp=drive_link"
      if (wheat_value == "" && snack_value == "" && milk_value == "1"){
        meal_url = "https://drive.google.com/file/d/16PylfC78XLwBr3XSpGNY0EXWMOV8-fJh/view?usp=drive_link"
      } else if (wheat_value == "" && snack_value == "1" && milk_value == ""){
        meal_url = "https://drive.google.com/file/d/1zBdhGxOKeAzN9EgzvWvz0EDwq2BemVna/view?usp=drive_link"
      } else if (wheat_value == "" && snack_value == "1" && milk_value == "1"){
        meal_url = "https://drive.google.com/file/d/1b-V660szV5nO8q9ytzIz52SOyCaReDHZ/view?usp=drive_link"
      } else if (wheat_value == "1" && snack_value == "" && milk_value == ""){
        meal_url = "https://drive.google.com/file/d/1nx9q5NfgGyOdJIBxCsiFNe82JNQW1Du8/view?usp=drive_link"
      } else if (wheat_value == "1" && snack_value == "" && milk_value == "1"){
        meal_url = "https://drive.google.com/file/d/1KTPMz8g3pR-HToYXAvqoTcOK3wtSFiyq/view?usp=drive_link"
      } else if (wheat_value == "1" && snack_value == "1" && milk_value == ""){
        meal_url = "https://drive.google.com/file/d/1g8MuECKPMknii8n0YqfBiDHUhTi_MN1B/view?usp=drive_link"
      } else if (wheat_value == "1" && snack_value == "1" && milk_value == "1"){
        meal_url = "https://drive.google.com/file/d/1qNn5AA1NuhN6fqcqCx78beobyqBnTiv1/view?usp=drive_link"
      }

      // water   
      let doctor_value = sheet.getRange(targetRow, 26, 1, 1).getValues()[0][0];
      let water_values = sheet.getRange(targetRow, 27, 1, 10).getValues()[0];

      // 合計を格納する変数を初期化
      let water_sum = 0;

      // forループでwater_valuesの各要素を数値に変換して合計
      for (let i = 0; i < water_values.length; i++) {
        water_sum += Number(water_values[i]);  // 数値に変換して合計
      }

      let water_url = "https://drive.google.com/file/d/1BW-5tLZl9z1k8MwbNWnU4Hhkwb-xJB6Z/view?usp=drive_link"
      if (doctor_value == 1){
        water_url ="https://drive.google.com/file/d/17d145pAWY93zYcdTHK9pKI7veK3SB6Jq/view?usp=drive_link"
      } else if (water_sum >= 6){
        water_url = "https://drive.google.com/file/d/1RCdXDtv6iPyQ5W0wOMuCK1hcCAggXDRA/view?usp=drive_link"
      } else if (water_sum == 4 || water_sum == 5){
        water_url = "https://drive.google.com/file/d/1YSL7TMvuYZCrb7dWrqIoJsTxtts_CJ-y/view?usp=drive_link"
      } else if (water_sum == 2 || water_sum == 3){
        water_url = "https://drive.google.com/file/d/1839FduTlUQsOlkjir3CyAX0gelA5ipIo/view?usp=drive_link"
      } else if (water_sum == 1){
        water_url = "https://drive.google.com/file/d/1dp-CCHDl2MagDRBipJxX3RFp6JGKyZFP/view?usp=drive_link"
      } else if (water_sum == 0){
        water_url = "https://drive.google.com/file/d/1BW-5tLZl9z1k8MwbNWnU4Hhkwb-xJB6Z/view?usp=drive_link"
      }

      
      let final_file1 = `【1週目】\n・卓上療法：${brain_url}\n・内臓へのアプローチ：${organ_url}\n・筋へのアプローチ：${muscle_url}\n・運動のアプローチ：${exercise_url}\n・食事のアプローチ：${meal_url}\n・水分補給のアプローチ：${water_url}\n\n【2週目】\n・卓上療法：${brain_url}\n・内臓へのアプローチ：${organ_url}\n・筋へのアプローチ：${muscle_url}\n・運動のアプローチ：${exercise_url}\n・食事のアプローチ：${meal_url}\n・水分補給のアプローチ：${water_url}
      `;     

      let final_file2 = `【3週目】\n・卓上療法：${brain_url}\n・内臓へのアプローチ1：${organ_url}\n・内臓へのアプローチ2：${second_organ_url}\n・筋へのアプローチ1：${muscle_url}\n・筋へのアプローチ2：${second_muscle_url}\n・運動のアプローチ：${exercise_url}\n・食事のアプローチ：${meal_url}\n・水分補給のアプローチ：${water_url}\n\n【4週目】\n・卓上療法：${brain_url}\n・内臓へのアプローチ1：${organ_url}\n・内臓へのアプローチ2：${second_organ_url}\n・筋へのアプローチ1：${muscle_url}\n・筋へのアプローチ2：${second_muscle_url}\n・運動のアプローチ：${exercise_url}\n・食事のアプローチ：${meal_url}\n・水分補給のアプローチ：${water_url}
      `;     


    end_interview(lineReplyToken, final_file1, final_file2)
    }
  }
}