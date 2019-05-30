/*
   JavaScript クライアントでメッセージを受信する  |  Firebase
   https://firebase.google.com/docs/cloud-messaging/js/receive?hl=ja
 */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.7.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.7.3/firebase-messaging.js')

firebase.initializeApp({
  'messagingSenderId': '508401944453'
})

const messaging = firebase.messaging()

// setBackgroundMessageHandlerが呼ばれる条件
// 「該当のWebアプリ（のページ）がアクティブでないこと and サーバPUSHのデータに`notification`が存在しないこと」
// `notification` をサーバー側で設定しない場合はここで通知のtitle, bodyを組み立てることになる。
messaging.setBackgroundMessageHandler((payload) => {
  console.log("setBackgroudMessageHandler")
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    title: 'push-test-web',
    body: 'push-test-web: Background Message body',
    icon: '/favicon.ico',
  }

  return self.registration.showNotification(notificationTitle,
    notificationOptions)
})
