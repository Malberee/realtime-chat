export function createAvatarParams() {
  const hair = Math.trunc(Math.random() * 10)
  const forehead = Math.trunc(Math.random() * 10)
  const nose = Math.trunc(Math.random() * 10)
  const mouth = Math.trunc(Math.random() * 10)
  const chin = Math.trunc(Math.random() * 10)
  let backgroundColor = Math.trunc(Math.random() * 17)
  const foregroundColor = Math.trunc(Math.random() * 17)

  if (backgroundColor === foregroundColor) {
    backgroundColor++
  }

  return {
    hair: hair,
    forehead: forehead,
    nose: nose,
    mouth: mouth,
    chin: chin,
    backgroundColor: backgroundColor,
    foregroundColor: foregroundColor,
  }
}
