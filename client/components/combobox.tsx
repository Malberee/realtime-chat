interface ComboboxProps {
  name: string;
  text: string;
  value: string;
  setValue: (value: string) => void;
}

function getColor(color: string): string {
  const colors: Record<string, string> = {
    Amber: "#fe9a00",
    Blue: "#2b7fff",
    Cyan: "#00b8db",
    Emerald: "#00bc7d",
    Fuchsia: "#e12afb",
    Green: "#00c950",
    Indigo: "#615fff",
    Lime: "#7ccf00",
    Orange: "#ff6900",
    Pink: "#f6329a",
    Purple: "#ad46ff",
    Red: "#fb2c36",
    Rose: "#ff2056",
    Sky: "#00a6f4",
    Teal: "#00bba7",
    Violet: "#8e51ff",
    Yellow: "#f0b100",
  };

  return colors[color] ?? "#ffffff";
}

export default function Combobox(props: ComboboxProps) {
  return (
    <label className="flex flex-col gap-1">
      {props.name}
      <select
        className="rounded border border-slate-400 bg-white max-w-sm px-3 py-2 text-slate-900"
        value={props.value}
        onChange={(event) => props.setValue(getColor(event.target.value))}
      >
        <option value="">{props.text}</option>
        <option value="Amber">Amber</option>
        <option value="Blue">Blue</option>
        <option value="Cyan">Cyan</option>
        <option value="Emerald">Emerald</option>
        <option value="Fuchsia">Fuchsia</option>
        <option value="Green">Green</option>
        <option value="Indigo">Indigo</option>
        <option value="Lime">Lime</option>
        <option value="Orange">Orange</option>
        <option value="Pink">Pink</option>
        <option value="Purple">Purple</option>
        <option value="Red">Red</option>
        <option value="Rose">Rose</option>
        <option value="Sky">Sky</option>
        <option value="Teal">Teal</option>
        <option value="Violet">Violet</option>
        <option value="Yellow">Yellow</option>
      </select>
    </label>
  );
}
