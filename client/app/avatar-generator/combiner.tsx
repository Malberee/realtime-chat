import AvatarPart from "./avatar-part";

interface AvatarCombinerProps {
  hair: number;
  forehead: number;
  nose: number;
  mouth: number;
  chin: number;
  background: string;
  foreground: string;
}

export default function AvatarCombiner(props: AvatarCombinerProps) {
  return (
    <svg width="100" height="100" viewBox="0 0 50 50">
      <rect
        x="0"
        y="0"
        width="50"
        height="50"
        stroke="black"
        fill={props.background}
      />
      <AvatarPart type={props.hair} row={0} foreground={props.foreground} />
      <AvatarPart type={props.forehead} row={1} foreground={props.foreground} />
      <AvatarPart type={props.nose} row={2} foreground={props.foreground} />
      <AvatarPart type={props.mouth} row={3} foreground={props.foreground} />
      <AvatarPart type={props.chin} row={4} foreground={props.foreground} />
    </svg>
  );
}
