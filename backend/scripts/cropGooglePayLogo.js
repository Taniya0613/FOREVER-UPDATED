import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputPath = path.join(__dirname, '../assets/googlepay_logo.png')
const outputPath = inputPath

async function cropLogo() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.log('sharp not installed, skipping crop')
    return
  }

  const image = sharp(inputPath)
  const trimmed = await image.trim({ threshold: 20 }).png({ quality: 100, compressionLevel: 0 }).toBuffer()
  fs.writeFileSync(outputPath, trimmed)
  const meta = await sharp(outputPath).metadata()
  console.log(`Cropped logo: ${meta.width}x${meta.height}`)
}

cropLogo()
