import { useState, useEffect } from 'react'
import firebase from './Setting'

export const messaging = firebase.messaging()

export const useMessaging = () => {
  const [token, setToken] = useState<null | string>(null)

  useEffect(() => {
    const requestPermission = async () => {
      // permission要求
      await messaging.requestPermission()

      // tokenを取得する
      const defaultToken = await messaging.getToken()
      // サーバがPUSH通知するときに使用するtokenなので本来はここをサーバのAPIに投げつける
      setToken(defaultToken)

      // メッセージを受信した場合の処理をここに記載
      // このonMessageに入る条件は「該当のWebアプリ（のページ）がアクティブであること」
      // ここはuseMessagingの引数で処理内容のFunctionalをもらっていいかも
      messaging.onMessage((payload) => {
        console.log("onMessage")
        console.log(payload)
      })

      // tokenは定期的に更新される
      // tokenが更新されたらstateに反映する
      messaging.onTokenRefresh(() => {
        messaging.getToken()
        .then((token) => {
          // サーバがPUSH通知するときに使用するtokenなので本来はここをサーバのAPIに投げつける
          setToken(token)
        })
        .catch((err) => {
          console.error(err)
        })
      })
    }
    requestPermission()
  }, [])

  return { token: token, messaging }
}
