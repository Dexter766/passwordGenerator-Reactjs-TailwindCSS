import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    // let pass = "";
    // let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // if (num) str += "0123456789";
    // if (char) str += "!@#$%^&*_+-=[]{}~`?";

    // for (let i = 1; i <= length; i++) {
    //   let charRan = Math.floor(Math.random() * str.length + 1);
    //   pass += str.charAt(charRan);
    // }

    // setPassword(pass);

    let password = [];
    for (let i = 0; i < Number(length); i++) {
      password.push("");
    }
    let words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "1234567890";
    let characters = "?!@#$%^&*_+-=[]{}~`";
    if (numberAllowed) {
      let randomIndex = Math.floor(Math.random() * password.length);
      password[randomIndex] =
        numbers[Math.floor(Math.random() * numbers.length)];
      words += numbers;
    }
    if (charAllowed) {
      let randomIndex = Math.floor(Math.random() * password.length);
      password[randomIndex] =
        characters[Math.floor(Math.random() * characters.length)];
      words += characters;
    }
    for (let i = 0; i < Number(length); i++) {
      if (password[i] === "")
        password[i] = words[Math.floor(Math.random() * words.length)];
    }
    setPassword(password.join(""));
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(
    () => passwordGenerator(),
    [length, numberAllowed, charAllowed, passwordGenerator]
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className=" text-center text-white my-3 ">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="len">Lenght: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
