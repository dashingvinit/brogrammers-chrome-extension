// background.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'fetchNotifications') {
    fetch('http://brogrammers.live/api/noti')
      .then((response) => response.json())
      .then((data) => {
        chrome.runtime.sendMessage({
          action: 'notificationsFetched',
          notifications: data,
        });
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        chrome.runtime.sendMessage({ action: 'fetchError' });
      });
  }
});
