import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {

  const [length,setlength]  = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false); 
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  const passwordRef = useRef(null); // using useRefrence hook to target the refrence element 
  
  const randomPassword= useCallback(()=>{ // this function is to create a random password based on range and check boxes that use checked || selected range!!!

    let password_ = "";
    let pass = "ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let special_char = "!@#$%^&*()}{_+|?><";

    if(numberAllowed) pass+=num;
    if(charAllowed) pass+=special_char

    for (let index = 1; index <= length; index++) {
      
      let char = Math.floor(Math.random()*pass.length + 1);

      password_+=pass.charAt(char);
      
    }
    setPassword(password_); // passing password for function in useState hook
  },[length,numberAllowed,charAllowed]);

  useEffect(()=>{ // using useEffect when the value changes based on the dependencies;;
    randomPassword();
  },[length,numberAllowed,charAllowed,setPassword,randomPassword]);

  const onSelectPassword = useCallback(()=>{ // using call back and useRef hook to select the value in the inputElement

    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20); // giving selection range for the text in inputElement 
    window.navigator.clipboard.writeText(password); // code to select the text in input Element
  },[password]);
   


  return (
    <>  
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className="flex-shadow rounded-lg overflow-hidden mb-4">
        <input type='text' ref={passwordRef } value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
        <button onClick={onSelectPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex item-center gap-x-1'>
        <input cursor = "cursor-pointer" type='range'  min = {6} max={100} value={length} onChange={(e)=>setlength(e.target.value)}/>
        <label>Length : {length}</label>
      </div>
      <div className='flex text-sm gap-x-2'>  
      <div className='flex item-center gap-x-1'>
        <input cursor = "cursor-pointer" type='checkbox' defaultChecked ={numberAllowed} onChange={()=>setNumberAllowed((prev)=>!prev)}/>
        <label>Number{numberAllowed}</label>
      </div>
      <div className='flex item-center gap-x-1'>
        <input cursor = "cursor-pointer" type='checkbox' defaultChecked={charAllowed} onChange={()=>setCharAllowed((prevStat)=>!prevStat)}/>
        <label>Char {charAllowed}</label>        
      </div>
      </div>
      </div>
    </div>
    </>

  )
}

export default App
