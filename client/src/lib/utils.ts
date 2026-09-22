export { cn } from 'cn'

export function getShdcnColorByNumber(color: number) {
  const colors: Record<number, string> = {
    1: '#fe9a00',
    2: '#2b7fff',
    3: '#00b8db',
    4: '#00bc7d',
    5: '#e12afb',
    6: '#00c950',
    7: '#615fff',
    8: '#7ccf00',
    9: '#ff6900',
    10: '#f6329a',
    11: '#ad46ff',
    12: '#fb2c36',
    13: '#ff2056',
    14: '#00a6f4',
    15: '#00bba7',
    16: '#8e51ff',
    17: '#f0b100',
  }

  return colors[color] ?? '#ffffff'
}
