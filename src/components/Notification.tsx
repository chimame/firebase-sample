import React from 'react'
import { useMessaging } from '../firebase/Messaging'

export default () => {
  const { token } = useMessaging()

  return <div>FCM Token: {token}</div>
}
