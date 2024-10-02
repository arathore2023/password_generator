import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [isNum, numberAllowed] = useState(true)
  const [isChar, charAllowed] = useState(true)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) {
      str += 1234567890
    }
    if (charAllowed) {
      str += "!@#$%^&*~/?"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, isNum, isChar, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-d rounded-lg px-4 py-4 my-8 text-orange-700 bg-gray-500'>
        <h1 className='text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full px-4 py-4' placeholder='password' readOnly ref={passwordRef} />
          <button className='outline-none bg-blue-700 text-white px-3 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={14} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label className='text-white' >Length: {length}</label>

          </div>
          <div className='flex text-sm gap-x-2'>
            <input type='checkbox' defaultChecked={numberAllowed} id="numberInput" onChange={() => {
              numberAllowed((prev) => !prev)
            }} />
            <label htmlFor="numberInput" className='text-white'>Numbers</label>
          </div>

          <div className='flex text-sm gap-x-2'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                charAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput" className='text-white'>Charcters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
