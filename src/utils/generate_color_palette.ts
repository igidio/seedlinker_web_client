export const generate_color_palette = (base_color: string, num_colors: number): string[] => {
  function hexToHSL(hex: string) {
    let r = 0, g = 0, b = 0
    if (hex.length == 4) {
      r = parseInt(hex[1] + hex[1], 16)
      g = parseInt(hex[2] + hex[2], 16)
      b = parseInt(hex[3] + hex[3], 16)
    } else if (hex.length == 7) {
      r = parseInt(hex[1] + hex[2], 16)
      g = parseInt(hex[3] + hex[4], 16)
      b = parseInt(hex[5] + hex[6], 16)
    }
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2
    if (max != min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
  }
  const { h, s, l } = hexToHSL(base_color)
  return Array.from({ length: num_colors }, (_, i) => {
    const hue = (h + (i * 360) / num_colors) % 360
    return `hsl(${hue}, ${s}%, ${l}%)`
  })
}
