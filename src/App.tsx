import { useState } from 'react'
import TypingBox from './TypingBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <TypingBox/>
    </>
  )
}

export default App
