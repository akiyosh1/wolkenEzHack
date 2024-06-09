//autocheckin.js

// ステータスコードを定数として定義
const STATUS_CODES = {
  ONLINE: '1',
  CHECKIN: '2',
  AWAY: '3',
  CHECKOUT: '4',
  OUTOFOFFICE: '10'
};

// 業務時間の定義
const START_HOUR = 9;
const START_MINUTE = 14;
const END_HOUR = 17;
const END_MINUTE = 28;
const BUSINESS_WEEK = [1, 2, 3, 4, 5]; // 0.Sunday 1Monday - 5Fraiday 6.Saturday
const BUSINESS_HOURS_STATUS_CODE = STATUS_CODES.CHECKIN;
const NON_BUSINESS_HOURS_STATUS_CODE = STATUS_CODES.CHECKOUT;

let timerInterval = null;
let isBusinessHours = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.toggleState) {
    console.info('INFO: Auto-CheckIn functionality enabled!');
    console.info(`INFO: CheckIn: ${padZero(START_HOUR)}:${padZero(START_MINUTE)}, CheckOut: ${padZero(END_HOUR)}:${padZero(END_MINUTE)}`)
    startAutoCheckedIn();
  } else {
    console.info('INFO: Auto-CheckIn functionality disabled!');
    stopAutoCheckedIn();
  }
});

function startAutoCheckedIn() {
  if (!timerInterval) {
    displayCurrentTime();
    checkBusinessHours();
    timerInterval = setInterval(() => {
      displayCurrentTime();
      checkBusinessHours();
    }, 60000);
  }
}

function stopAutoCheckedIn() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function displayCurrentTime() {
  const currentTime = new Date();
  const { hours, minutes, seconds } = getTime(currentTime);
  console.log('INFO: Current time:', `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`);
}

function getTime(currentTime) {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  return { hours, minutes, seconds };
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

function checkBusinessHours() {
  const currentTime = new Date();
  const { hours, minutes } = getTime(currentTime);
  const dayOfWeek = currentTime.getDay();
  const isBusinessDay = BUSINESS_WEEK.includes(dayOfWeek);

  const isAfterStart = hours > START_HOUR || (hours === START_HOUR && minutes >= START_MINUTE);
  const isBeforeEnd = hours < END_HOUR || (hours === END_HOUR && minutes < END_MINUTE);

  const isWithinBusinessHours = isBusinessDay && isAfterStart && isBeforeEnd;

  if (isWithinBusinessHours !== isBusinessHours) {
    isBusinessHours = isWithinBusinessHours;
    handleBusinessHoursChange(isBusinessHours);
  }
}

function handleBusinessHoursChange(isBusinessHours) {
  if (isBusinessHours) {
    console.log('INFO: 業務時間です。');
    console.log('INFO: チェックインします。');
    updateStatus(BUSINESS_HOURS_STATUS_CODE);
  } else {
    console.log('INFO: 業務時間外です。');
    console.log('INFO: チェックアウトします。');
    updateStatus(NON_BUSINESS_HOURS_STATUS_CODE);
  }
}

function updateStatus(newStatusCode) {
  //document.getElementsByClassName(`mat-menu-trigger user-status-container status-${status} ng-star-inserted`);
  const statusTriggerElement = document.querySelector('.mat-menu-trigger.user-status-container.ng-star-inserted'); 
  if (statusTriggerElement) {
    statusTriggerElement.click();
    const statusMenuItem = document.querySelector(`.mat-menu-item.user-online-menu.status-${newStatusCode}`);
    if (statusMenuItem) {
      statusMenuItem.click();
    } else {
      console.log(`ERROR: Failed to change status. Subelements not found for status ${newStatusCode}.`);
    }
  } else {
    console.log('ERROR: No current status found to change status.');
  }
}