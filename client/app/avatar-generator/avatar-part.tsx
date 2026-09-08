interface AvatarPartProps {
  type: number;
  row: number;
  foreground: string;
}

export default function AvatarPart(props: AvatarPartProps) {
  const y = 10 * props.row;
  if (props.type === 1) {
    return (
      <rect
        x="0"
        y={y}
        width="50"
        height="10"
        stroke="none"
        fill={props.foreground}
      />
    );
  } else if (props.type === 2) {
    return (
      <rect
        x="10"
        y={y}
        width="30"
        height="10"
        stroke="none"
        fill={props.foreground}
      />
    );
  } else if (props.type === 3) {
    return (
      <rect
        x="20"
        y={y}
        width="10"
        height="10"
        stroke="none"
        fill={props.foreground}
      />
    );
  } else if (props.type === 4) {
    return (
      <>
        <rect
          x="0"
          y={y}
          width="10"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
        <rect
          x="40"
          y={y}
          width="10"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
      </>
    );
  } else if (props.type === 5) {
    return (
      <>
        <rect
          x="10"
          y={y}
          width="10"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
        <rect
          x="30"
          y={y}
          width="10"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
      </>
    );
  } else if (props.type === 6) {
    return (
      <>
        <rect
          x="0"
          y={y}
          width="20"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
        <rect
          x="30"
          y={y}
          width="20"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
      </>
    );
  } else if (props.type === 7) {
    return (
      <>
        <rect
          x="0"
          y={y}
          width="10"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
        <rect
          x="20"
          y={y}
          width="10"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
        <rect
          x="40"
          y={y}
          width="10"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
      </>
    );
  } else if (props.type === 8) {
    return (
      <>
        <rect
          x="0"
          y={y}
          width="40"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
      </>
    );
  } else if (props.type === 9) {
    return (
      <>
        <rect
          x="10"
          y={y}
          width="40"
          height="10"
          stroke="none"
          fill={props.foreground}
        />
      </>
    );
  } else if (props.type === 10) {
    return <></>;
  } else {
    return <></>;
  }
}
