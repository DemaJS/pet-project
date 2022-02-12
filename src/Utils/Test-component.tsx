import React, { useState, useEffect } from "react";

export function Timer() {
  const [seconds, addSecond] = useState(0);
  const [isStart, toggleStart] = useState(false);
  let interval: any;

  useEffect(() => {
    if (isStart) {
      interval = setInterval(() => {
        addSecond((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [isStart]);

  return (
    <div>
      <h1>Прошло секунд: {seconds}</h1>
      <div>
        <button onClick={() => toggleStart(true)}>Старт</button>
        <button onClick={() => toggleStart(false)}>Стоп</button>
      </div>
    </div>
  );
}
