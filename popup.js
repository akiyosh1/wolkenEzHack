// popup.js

// 今日の日付を取得
const today = new Date();

// カレンダーの開始日を設定（今月の1日）
const startDate = new Date(today.getFullYear(), today.getMonth(), 1);

// カレンダーの終了日を設定（翌月の0日＝今月の最終日）
const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

// カレンダーのタイトルを表示する<div>要素を取得
const titleDiv = document.getElementById('calendar-title');

// カレンダーのタイトルを生成
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentMonth = monthNames[startDate.getMonth()];
const currentYear = startDate.getFullYear();
titleDiv.textContent = `${currentMonth}`;

// カレンダーを表示する<div>要素を取得
const calendarDiv = document.getElementById('calendar');

// カレンダーのHTMLを生成
let calendarHTML = '<table>';
/*
calendarHTML += '<thead><tr>';
calendarHTML += '<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>';
calendarHTML += '</tr></thead>';
*/
calendarHTML += '<tbody>';

// 表示する月の初日まで空白のセルを追加
calendarHTML += '<tr>';
for (let i = 0; i < startDate.getDay(); i++) {
    calendarHTML += '<td></td>';
}

// 日付を1日から月末まで追加
for (let d = 1; d <= endDate.getDate(); d++) {
    calendarHTML += `<td>${d}</td>`;
    if ((startDate.getDay() + d) % 7 === 0) { // 週の終わりになったら新しい行を開始
        calendarHTML += '</tr><tr>';
    }
}

// 表示する月の最終日の後の空白のセルを追加
for (let i = endDate.getDay() + 1; i < 7; i++) {
    calendarHTML += '<td></td>';
}

calendarHTML += '</tr></tbody></table>';

// カレンダーを<div>要素に追加
calendarDiv.innerHTML = calendarHTML;



