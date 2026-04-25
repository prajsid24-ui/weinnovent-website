import sharp from 'sharp'

sharp('src/assets/logo.png')
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i], g = data[i + 1], b = data[i + 2]
      if (r < 30 && g < 30 && b < 30) data[i + 3] = 0
    }
    return sharp(data, { raw: { width, height, channels } })
      .png()
      .toFile('public/logo.png')
  })
  .then(() => console.log('✅ Done — public/logo.png ready'))
  .catch(console.error)