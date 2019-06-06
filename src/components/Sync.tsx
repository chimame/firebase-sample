import React, { useState, useRef, useEffect } from 'react'
import DB from '../firebase/Firestore'
import { Stage, Layer, Rect } from "react-konva"
import { Layer as LayerType } from 'konva/types/Layer'

type item = {
  x: number
  y: number
}


const Writer: React.FC = () => {
  const [writeMode, setWriteMode] = useState(false)
  const writing = useRef(false)

  return (
    <div
      style={{height: window.innerHeight, width: window.innerWidth}}
      onMouseDown={() => setWriteMode(true)}
      onMouseUp={() => setWriteMode(false)}
      onMouseMove={(e) => {
        e.persist()
        if (writeMode && !writing.current) {
          writing.current = true
          setTimeout(() => {
            DB.collection("lines").add({
              x: e.clientX,
              y: e.clientY
            })
            writing.current = false
          }, 100)
        }
      }}
    />
  )
}

const Reader: React.FC = () => {
  const layer = useRef<LayerType>(null)
  const [data, setData] = useState<Array<item>>([])

  useEffect(() => {
    DB.collection('lines').onSnapshot(doc => { setData(doc.docs.map(d => d.data() as item)) })
  }, [])

  useEffect(() => {
    if (layer.current) {
      layer.current.draw()
    }
  })

  return (
    <Stage
      width={window.innerWidth} height={window.innerWidth}
    >
      <Layer ref={layer}>
        {data.map((d, i) => <Rect
          key={i}
          x={d.x}
          y={d.y}
          width={50}
          height={50}
          fill={'black'}
          shadowBlur={5}
        />)}
      </Layer>
    </Stage>
  )
}

export default () => {
  const [mode, setMode] = useState('default')

  if (mode === 'write') return <Writer />
  if (mode === 'read') return <Reader />

  return (
    <div>
      <button onClick={() => setMode('write')}>write</button>
      <button onClick={() => setMode('read')}>read</button>
    </div>
  )
}
