"use client";

import { useState } from "react";
import AvatarCombiner from "./avatar-generator/combiner";
import Combobox from "../components/combobox";

const rows = Array.from({ length: 5 }, (_, rowIndex) => rowIndex + 1);
const buttons = Array.from({ length: 10 }, (_, buttonIndex) => buttonIndex + 1);

export default function Home() {
  const [hair, setHead] = useState(0);
  const [forehead, setForehead] = useState(0);
  const [nose, setNose] = useState(0);
  const [mouth, setMouth] = useState(0);
  const [chin, setChin] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [foregroundColor, setForegroundColor] = useState("");

  const handleSelection = (row: number, button: number) => {
    if (row === 1) {
      setHead(button);
    } else if (row === 2) {
      setForehead(button);
    } else if (row === 3) {
      setNose(button);
    } else if (row === 4) {
      setMouth(button);
    } else if (row === 5) {
      setChin(button);
    }
  };

  return (
    <main className="min-h-screen p-8 ">
      <div className="flex flex-col gap-5">
        {rows.map((row) => (
          <fieldset key={row} className="flex gap-4 border-0 p-0">
            <legend className="sr-only">Ряд {row}</legend>
            {buttons.map((button) => (
              <label
                key={button}
                className="flex cursor-pointer items-center gap-1"
              >
                <input
                  type="radio"
                  name={`row-${row}`}
                  value={button}
                  onChange={() => handleSelection(row, button)}
                />
                {button}
              </label>
            ))}
          </fieldset>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <Combobox
          name={"Background color"}
          text={"Choose background color"}
          value={backgroundColor}
          setValue={setBackgroundColor}
        />

        <Combobox
          name={"Foreground color"}
          text={"Choose foreground color"}
          value={foregroundColor}
          setValue={setForegroundColor}
        />
      </div>

      <AvatarCombiner
        hair={hair}
        forehead={forehead}
        nose={nose}
        mouth={mouth}
        chin={chin}
        background={backgroundColor}
        foreground={foregroundColor}
      />
    </main>
  );
}
