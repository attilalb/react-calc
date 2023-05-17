import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>beancounter</h1>
      <div className="container">
        <div className="bg-slate-400 w-[100%] h-auto flex flex-col rounded-lg gap-3 p-5">
          <div id="display" className="bg-slate-900 h-16 rounded-md text-white">0</div>
          <div className="bg-slate-600 h-[.25rem] blur"></div>
          <div id="numpad" className="grid grid-cols-4 grid-flow-row gap-2 text-lg">
            <button className="button bg-slate-300 col-span-2">AC</button>
            <button className="button bg-slate-300">C</button>
            <button className="button bg-orange-400">÷</button>
            <button className="button bg-white">7</button>
            <button className="button bg-white">8</button>
            <button className="button bg-white">9</button>
            <button className="button bg-orange-400">*</button>
            <button className="button bg-white">4</button>
            <button className="button bg-white">5</button>
            <button className="button bg-white">6</button>
            <button className="button bg-orange-400">-</button>
            <button className="button bg-white">1</button>
            <button className="button bg-white">2</button>
            <button className="button bg-white">3</button>
            <button className="button bg-orange-400">+</button>
            <button className="button bg-white col-span-2">0</button>
            <button className="button bg-white">.</button>
            <button className="button bg-red-600">=</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
