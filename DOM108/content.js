document.body.style.border = "4px solid red";
//console.log("Hello from contents.js!");

let prevStatus = null;
const statuses = ["1", "2", "3", "4", "10"];　// 1Online,2Checkedin,3Away,4CheckedOut,5OutofOffice

function changeStatus(newStatus) {
    const statuses = ["1", "2", "3", "4", "10"];
    for (const status of statuses) {
        const elements = document.getElementsByClassName(`mat-menu-trigger user-status-container status-${status} ng-star-inserted`);
        if (elements.length > 0) {
            elements[0].click();
            const subelements = document.getElementsByClassName(`mat-menu-item user-online-menu status-${newStatus}`);
            if (subelements.length > 0) {
                subelements[0].click();
                return; // Click the first found element and end the process.
            } else {
                console.log(`ERROR: Failed to change status. Subelements not found for status ${newStatus}`);
            }
        } else {
            console.log(`ERROR: Failed to change status. Elements not found for status ${status}`);
        }
    }
    console.log('ERROR: The corresponding element was not found.');
}


function getCurrentTime() {
    return new Date();
}

function checkBusinessHours() {
    // 現在の日時を取得
    var currentDate = getCurrentTime();
    // Day of the week" (0: 日曜日, 1: 月曜日, ..., 6: 土曜日)
    var dayOfWeek = currentDate.getDay();
    // Time portion
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    // Check Business Our
    var isOpen = (dayOfWeek >= 1 && dayOfWeek <= 5) && // 月曜日から金曜日
        ((hours === 9 && minutes > 14) || // 9:13から
        (hours > 9 && hours < 17) || // 9:15から17:00まで
        (hours === 17 && minutes < 28)); // 17:00から17:29まで（分が29分以下）
    console.log(`INFO: CurTime: ${hours}:${minutes}:${seconds}`);
    return isOpen ? "open" : "closed";
}

function logBusinessStatus() {
    const status = checkBusinessHours();
    if (status !== prevStatus) {
        if (prevStatus !== null) {
            console.log(`INFO: 営業状況が変化しました：${prevStatus} → ${status}`);
            if (status == 'open') {
                console.log('INFO: チェックインします');
                changeStatus(2); //2=CHECKEDIN
            } else if (status == 'closed') {
                console.log('INFO: チェックアウトします');
                changeStatus(4); //4=CHECKEDOUT
            }
        } else {
            console.log(`INFO: 初めての営業状況：${status}`);
        }
        prevStatus = status;
    } else {
        console.log(`INFO: 営業状況が変化なし'： ${status}`);
    }
}


function checkInbound() {
    // すべての対象の span 要素を選択
    const spans = document.querySelectorAll('span.ellipsis.ng-star-inserted');

    // 各 span 要素を処理
    spans.forEach(span => {
        // テキスト内容に応じて文字色を変更
        if (span.textContent === 'Pending-Support') {
            span.style.color = '#FFC000'; // 橙色
        } else if (span.textContent === 'Open-Customer Responded' || 
                   span.textContent === 'Soft Closed-Reviewing Customer Response' ||
                   span.textContent === 'Open-Reviewing Customer Response'){
            span.style.color = '#900C3F'; // 赤紫色
        } else if (span.textContent === 'Open-Assigned') {
            span.style.color = '#C70039'; // 赤色
        }
    });     
}





//MAIN
//Check text color for detecting inbound
const observer = new MutationObserver(function() {
    checkInbound();
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});


//AutoCheckin / Checkout
//初回の表示
logBusinessStatus();
// 1分ごとに時間を更新
setInterval(logBusinessStatus, 60000);
