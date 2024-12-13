// 問診の履歴を削除する関数
function clear_history(user_id){
  let sheet = SpreadsheetApp.getActive().getActiveSheet();
  let dataRange = sheet.getRange('B2:B');  // B列のユーザーID範囲（B2以降すべて）
  let userIds = dataRange.getValues();     // B列の全ユーザーIDを取得
  let targetRow = -1;                     // 更新する行番号を初期化

  // B列からユーザーIDと一致する行を見つける
  for (let i = 0; i < userIds.length; i++) {
    if (userIds[i][0] === user_id) {
      targetRow = i + 2;  // シートの行番号は1から始まるので+2
      break;
    }
  }

  if (targetRow !== -1) {
    // targetRowの5列目以降をすべて空白にする
    let range = sheet.getRange(targetRow, 5, 1, sheet.getLastColumn() - 4);  // 5列目から最終列までの範囲
    range.clear();  // 範囲をクリア（空白にする）
  } else {
    // エラーメッセージの送信など（任意）
    Logger.log("指定されたユーザーIDが見つかりませんでした。");
  }
}


// 問診を開始する関数
function interview(replyToken) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': '今から、１ヶ月間のアプローチとその計画を作っていきます。色々聴いていくので、答えてくださいね！\n\n10分間くらい質問をするので、ちょっとだけ頑張ってみてください！'
      },
      { 
        'type': 'text', 
        'text': 'まずは、MMSEの点数についてお聴きします。MMSEを行ってから、質問に答えてください。'
      },
      { 
        'type': 'text', 
        'text': 'MMSEを実施しましたか？（実施いただいてから回答いただくことでより正確なメニュー提供ができます）',
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': '実施した',
                'data': '0-correct',// 0-correct
                'displayText': '実施した'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '実施していない',
                'data': '0-wrong',// 0-wrong
                'displayText': '実施していない'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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


// 脳についての問診を続ける関数
function interview_brain(replyToken,question, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': question,
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': '間違えた',
                'data': `${question_number+1}-wrong`,
                'displayText': '間違えた'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '正解した',
                'data': `${question_number+1}-correct`,
                'displayText': '正解した'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

// 内臓についての問診を続ける関数
function interview_organ(replyToken,question, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': question,
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': '患ったことはない',
                'data': `${question_number+1}-correct`,
                'displayText': '患ったことはない'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '患ったことがある',
                'data': `${question_number+1}-wrong`,
                'displayText': '患ったことがある'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

// 水分についての問診を続ける関数
function interview_water(replyToken,question, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': question,
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'はい',
                'data': `${question_number+1}-yes`,
                'displayText': 'はい'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'いいえ',
                'data': `${question_number+1}-no`,
                'displayText': 'いいえ'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_water2(replyToken,replyMessage1, replyMessage2, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': replyMessage1
      },
      { 
        'type': 'text', 
        'text': replyMessage2,
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'はい',
                'data': `${question_number+1}-yes`,
                'displayText': 'はい'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'いいえ',
                'data': `${question_number+1}-no`,
                'displayText': 'いいえ'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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


function interview_kanshoku(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "1週間で間食する頻度を教えてください。",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'ほぼ食べない(0日)',
                'data': `${question_number+1}-1`,
                'displayText': 'ほぼ食べない(0日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'あまり食べない(1日～2日)',
                'data': `${question_number+1}-2`,
                'displayText': 'あまり食べない(1日～2日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'まあまあ食べる(3日～4日)',
                'data': `${question_number+1}-3`,
                'displayText': 'まあまあ食べる(3日～4日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'ほぼ毎日(6日以上)',
                'data': `${question_number+1}-3`,
                'displayText': 'ほぼ毎日(6日以上)'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_milk(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "1週間で乳製品を食べる頻度を教えてください。",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'ほぼ食べない(0日)',
                'data': `${question_number+1}-1`,
                'displayText': 'ほぼ食べない(0日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'あまり食べない(1日～2日)',
                'data': `${question_number+1}-2`,
                'displayText': 'あまり食べない(1日～2日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'まあまあ食べる(3日～4日)',
                'data': `${question_number+1}-3`,
                'displayText': 'まあまあ食べる(3日～4日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'ほぼ毎日(6日以上)',
                'data': `${question_number+1}-3`,
                'displayText': 'ほぼ毎日(6日以上)'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_ben(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "疲れていませんか？\n\n次は、ちょっと聞きにくいんですが、便秘について聞かせてください！"
      },
      { 
        'type': 'text', 
        'text': "1週間で排便はどのくらいありますか？",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': '毎日',
                'data': `${question_number+1}-1`,
                'displayText': '毎日'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '2-3日に一回',
                'data': `${question_number+1}-2`,
                'displayText': '2-3日に一回'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '4-5日に一回',
                'data': `${question_number+1}-3`,
                'displayText': '4-5日に一回'
              }
            },                 
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '6日以上でないことがある',
                'data': `${question_number+1}-4`,
                'displayText': '6日以上でないことがある'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_drug(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': '次は、服薬状況について教えてください！'
      },
      { 
        'type': 'text', 
        'text': "薬は何種類飲んでいますか？",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': '0種類',
                'data': `${question_number+1}-1`,
                'displayText': '0種類'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '1～3種類',
                'data': `${question_number+1}-2`,
                'displayText': '1～3種類'
              }
            }, 
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '4～5種類',
                'data': `${question_number+1}-3`,
                'displayText': '4～5種類'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '６種類以上',
                'data': `${question_number+1}-4`,
                'displayText': '６種類以上'
              } 
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_exercise(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "ありがとうございます！\n\n結構質問してますが、飽きてませんか？"
      },
      { 
        'type': 'text', 
        'text': "では、運動について聞いていきますね！"
      },
      { 
        'type': 'text', 
        'text': "1週間でどれくらい運動してますか？",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'ほぼしない(0日)',
                'data': `${question_number+1}-1`,
                'displayText': 'ほぼしない(0日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'あまりしない(1日～2日)',
                'data': `${question_number+1}-2`,
                'displayText': 'あまりしない(1日～2日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'まあまあする(3日～4)日',
                'data': `${question_number+1}-3`,
                'displayText': 'まあまあする(3日～4)日'
              }
            },                 
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'しっかりする(6日以上)',
                'data': `${question_number+1}-4`,
                'displayText': 'しっかりする(6日以上)'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_exercise_intense(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "運動強度についても教えてください！",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': '口呼吸になるくらいの強度',
                'data': `${question_number+1}-1`,
                'displayText': '口呼吸になるくらいの強度'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'なんとか鼻呼吸ができる強度',
                'data': `${question_number+1}-2`,
                'displayText': 'なんとか鼻呼吸ができる強度'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '全然しんどくない強度',
                'data': `${question_number+1}-3`,
                'displayText': '全然しんどくない強度'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_body1(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "次は、身体の状態を確認していきますね！"
      },
      { 
        'type': 'text', 
        'text': "むくみがあるかどうか教えてください！",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': '少しある',
                'data': `${question_number+1}-1`,
                'displayText': '少しある'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'しっかりむくんでいる',
                'data': `${question_number+1}-2`,
                'displayText': 'しっかりむくんでいる'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'ない',
                'data': `${question_number+1}-3`,
                'displayText': 'ない'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_body2(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "食欲はありますか？",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'まったくない',
                'data': `${question_number+1}-1`,
                'displayText': 'まったくない'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'あまりない',
                'data': `${question_number+1}-2`,
                'displayText': 'あまりない'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'ある',
                'data': `${question_number+1}-3`,
                'displayText': 'ある'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_body3(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': '肌の乾燥状態についてお聴きします。'
      },
      { 
        'type': 'text', 
        'text': "肌は乾燥していますか？",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'とても乾燥している',
                'data': `${question_number+1}-1`,
                'displayText': 'とても乾燥している'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '少し乾燥している',
                'data': `${question_number+1}-2`,
                'displayText': '少し乾燥している'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '乾燥していない',
                'data': `${question_number+1}-3`,
                'displayText': '乾燥していない'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_body4(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "意欲低下や倦怠感はありますか？",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'とてもある',
                'data': `${question_number+1}-1`,
                'displayText': 'とてもある'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '少しある',
                'data': `${question_number+1}-2`,
                'displayText': '少しある'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'ない',
                'data': `${question_number+1}-3`,
                'displayText': 'ない'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_body5(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "手足の冷えはありますか？",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'とてもある',
                'data': `${question_number+1}-1`,
                'displayText': 'とてもある'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '少しある',
                'data': `${question_number+1}-2`,
                'displayText': '少しある'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'ない',
                'data': `${question_number+1}-3`,
                'displayText': 'ない'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function interview_body6(replyToken, question_number) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': "腰痛や肩こりはありますか？",
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'ある',
                'data': `${question_number+1}-1`,
                'displayText': 'ある'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'ある時とない時がある',
                'data': `${question_number+1}-2`,
                'displayText': 'ある時とない時がある'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'ない・ない時の方が多い',
                'data': `${question_number+1}-3`,
                'displayText': 'ない・ない時の方が多い'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function hearing_one(user_id, question_number, replyMessage, position, point, lineReplyToken){
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
  // ユーザーIDが見つかり、正解の場合、F列に+1する
  if (targetRow !== -1) {
    add_one_category(sheet, targetRow, position, point)
  }
  // else
    // エラーメッセージの送信

  interview_brain(lineReplyToken,replyMessage,question_number)
}

function hearing_one_organ(user_id, question_number, replyMessage, position, point, lineReplyToken){
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
  // ユーザーIDが見つかり、正解の場合、F列に+1する
  if (targetRow !== -1) {
    add_one_category(sheet, targetRow, position, point)
  }
  // else
    // エラーメッセージの送信
}

// ポイントをシートに加える
function hearing_one_no_message(user_id, position, point){
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
  // ユーザーIDが見つかり、正解の場合、F列に+1する
  if (targetRow !== -1) {
    add_one_category(sheet, targetRow, position, point)
  }
  // else
    // エラーメッセージの送信
}


function add_one_category(sheet, targetRow, position, point){
  let brainCell = sheet.getRange(targetRow, position);  
  let currentValue = brainCell.getValue();       // 現在の値を取得
  brainCell.setValue(currentValue + point);    
}


function hearing_two(user_id, question_number, replyMessage, position1, point1, position2, point2, lineReplyToken){
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
  // ユーザーIDが見つかり、正解の場合、F列に+1する
  if (targetRow !== -1) {
    add_one_category(sheet, targetRow, position1, point1)
    add_one_category(sheet, targetRow, position2, point2)
  }
  // else
    // エラーメッセージの送信

  interview_brain(lineReplyToken,replyMessage,question_number)
}

function hearing_two_organ(user_id, question_number, replyMessage, position1, point1, position2, point2, lineReplyToken){
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
  // ユーザーIDが見つかり、正解の場合、F列に+1する
  if (targetRow !== -1) {
    add_one_category(sheet, targetRow, position1, point1)
    add_one_category(sheet, targetRow, position2, point2)
  }
  // else
    // エラーメッセージの送信

  interview_organ(lineReplyToken,replyMessage,question_number)
}

function hearing_add_counter(user_id){
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
    add_one_category(sheet, targetRow, 25, 1)
  }
}

function end_brain_interview(replyToken) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': 'MMSEについては以上です！'
      },
      { 
        'type': 'text', 
        'text': '次は、過去と現在の病気についてです！'
      },
      { 
        'type': 'text', 
        'text': '過去に患ったことがある、現在患っている病気で当てはまるものを選択してください。(複数回答可)' 
      }, 
      { 
        'type': 'text', 
        'text': '心疾患 ',
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': '患ったことはない',
                'data': '21-correct',
                'displayText': '患ったことはない'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': '患ったことがある',
                'data': '21-wrong',
                'displayText': '患ったことがある'
              }
            }
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function end_organ_interview(replyToken) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': '次に、食生活についての質問をしていきます。合計3つの質問に答えてください。'
      },
      { 
        'type': 'text', 
        'text': '1週間で小麦製品を食べる頻度を教えてください。',
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'ほぼ食べない(0日)',
                'data': '40-1',
                'displayText': 'ほぼ食べない(0日)'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'あまり食べない(1日～2日)',
                'data': '40-2',
                'displayText': 'あまり食べない(1日～2日)'
              }
            },
                        {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'まあまあ食べる(3日～4)日',
                'data': '40-3',
                'displayText': 'まあまあ食べる(3日～4)日'
              }
            },
                        {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'まあまあ食べる(3日～4)日',
                'data': '40-4',
                'displayText': 'ほぼ毎日(6日以上)'
              }
            },
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function end_food_interview(replyToken) { 
  const payload = {
    'replyToken': replyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': 'では、水分摂取量とその内容について聴いてきます！'
      },
      { 
        'type': 'text', 
        'text': 'お医者さんから水分摂取の制限を受けていますか？',
        'quickReply': { 
          'items': [
            {
              'type': 'action', 
              'action': {
                'type': 'postback',
                'label': 'はい',
                'data': '50-1',
                'displayText': 'はい'
              }
            },
            {
              'type': 'action',
              'action': {
                'type': 'postback',
                'label': 'いいえ',
                'data': '50-2',
                'displayText': 'いいえ'
              }
            },
          ]
        } 
      }
    ]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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

function end_interview(lineReplyToken, final_file1, final_file2) { 
  const payload = {
    'replyToken': lineReplyToken,
    'messages': [
      { 
        'type': 'text', 
        'text': 'ありがとうございました！\nこれで質問は以上になります。\n\nおつかれさまでした！'
      },
      { 
        'type': 'text', 
        'text': '🌟認知症状改善のためのアプローチと1ヶ月の計画ができました❗\nこちらになります！🌟\n\nアプローチは1週間ごとに分けています。\n卓上療法で使用するメニューは以下のURLからアクセスすることができます❗\nhttps://pastoral-cook-e24.notion.site/7e2baff759314a57b28c4f50c80ceea1'
      },
      { 
        'type': 'text', 
        'text': final_file1
      },
      { 
        'type': 'text', 
        'text': final_file2
      }
    ]
  } 
    
  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN')
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