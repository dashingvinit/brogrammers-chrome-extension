document.addEventListener('DOMContentLoaded', function () {
  const notificationList = document.getElementById('notificationList');
  const showMoreBtn = document.getElementById('showMoreBtn');

  chrome.runtime.sendMessage({ action: 'fetchNotifications' });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === 'notificationsFetched') {
      const notifications = request.notifications;

      // Display only the top 5 notifications initially
      const top5Notifications = notifications.slice(0, 5);

      // Add notifications to the list
      top5Notifications.forEach((notification) => {
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('notification');
        notificationItem.textContent = notification.body;
        notificationList.appendChild(notificationItem);
      });

      // If there are more than 5 notifications, show the "Show More" button
      if (notifications.length > 5) {
        showMoreBtn.style.display = 'block';

        // Add click event to "Show More" button
        showMoreBtn.addEventListener('click', function () {
          // Clear the existing notifications
          notificationList.innerHTML = '';

          // Add all notifications to the list
          notifications.forEach((notification) => {
            const notificationItem = document.createElement('div');
            notificationItem.classList.add('notification');
            notificationItem.textContent = notification.body;
            notificationList.appendChild(notificationItem);
          });

          // Hide the "Show More" button after clicking
          showMoreBtn.style.display = 'none';
        });
      }
    } else if (request.action === 'fetchError') {
      console.error('Error fetching notifications.');
      // Handle error as needed
    }
  });

  // Apply rounded corners when the popup is opened
  document.body.style.borderRadius = '10px'; // Adjust the radius as needed
});
