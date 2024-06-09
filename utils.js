//utils.js
console.info('INFO: utils.js is loaded.');
document.body.style.border = "4px solid red";

//Change text color by SR stats.
const COLOR_MAP = {
    'Pending-Support': '#FFC000',
    'Open-Customer Responded': '#900C3F',
    'Soft Closed-Reviewing Customer Response': '#900C3F',
    'Open-Reviewing Customer Response': '#900C3F',
    'Open-Assigned': '#C70039'
};

function checkInbound() {
    document.querySelectorAll('span.ellipsis.ng-star-inserted')
        .forEach(span => {
            const color = COLOR_MAP[span.textContent];
            if (color) {
                span.style.color = color;
            }
        });
}

const observer = new MutationObserver(checkInbound);
observer.observe(document.body, { childList: true, subtree: true });



/*
// ボタン要素を取得します
const button = document.querySelector('.resolution_submit');

// ボタンがクリックされた時の処理を定義します
button.addEventListener('click', () => {
    // input要素を取得します
    const inputElement = document.querySelector('input.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine.ng-valid');

    // input要素が存在するか確認します
    if (inputElement) {
        // 現在の値を取得します
        const currentValue = inputElement.value;

        // 値を"Japanese"に設定します
        inputElement.value = 'Japanese' + currentValue;
    }
});
*/