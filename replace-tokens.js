import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.join(__dirname, 'src')

const replacements = {
  'var(--color-surface)': 'var(--color-card)',
  'var(--color-surface-sunken)': 'var(--color-charcoal-soft)',
  'var(--color-canvas)': 'var(--color-void)',
  'var(--color-ink-soft)': 'var(--color-ink-dim)',
  'var(--color-border)': 'var(--color-edge)',
  'var(--color-border-strong)': 'var(--color-edge-hover)',
  'var(--color-emerald-soft)': 'var(--color-success-subtle)',
  'var(--color-emerald-deep)': 'var(--color-success)',
  'var(--color-emerald)': 'var(--color-success)',
  'var(--color-blue-soft)': 'var(--color-accent-subtle)',
  'var(--color-blue)': 'var(--color-accent)',
  'var(--color-amber-soft)': 'var(--color-warning-subtle)',
  'var(--color-amber)': 'var(--color-warning)',
  'var(--color-rose-soft)': 'var(--color-danger-subtle)',
  'var(--color-rose)': 'var(--color-danger)',
  'var(--color-charcoal-950)': 'var(--color-graphite)',
  'var(--color-charcoal-900)': 'var(--color-graphite-soft)',
  'var(--color-charcoal-800)': 'var(--color-charcoal)',
  'var(--color-charcoal-700)': 'var(--color-charcoal-soft)',
  'var(--color-charcoal-600)': 'var(--color-charcoal-soft)',
  'bg-white/5': 'bg-[var(--color-charcoal-soft)]',
  'bg-white/10': 'bg-[var(--color-charcoal)]',
  'bg-white/50': 'bg-[var(--color-ink-dim)]',
  'bg-white': 'bg-[var(--color-void)]',
  'text-white/40': 'text-[var(--color-ink-faint)]',
  'text-white/55': 'text-[var(--color-ink-dim)]',
  'text-white/70': 'text-[var(--color-ink)]',
  'text-white/90': 'text-[var(--color-ink)]',
  'text-white': 'text-[var(--color-ink)]',
  'font-display': 'font-playfair',
  'font-sans': 'font-body',
  'font-mono-data': 'tabular'
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      processDirectory(fullPath)
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      let originalContent = content
      for (const [oldStr, newStr] of Object.entries(replacements)) {
        content = content.split(oldStr).join(newStr)
      }
      
      // Also apply some layout-specific class replacements to match the new surface look
      content = content.replace(/bg-\[var\(--color-card\)]/g, 'surface-card')
      // but only if they are not already within another class name or variable, which is handled largely above.
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8')
        console.log(`Updated ${fullPath}`)
      }
    }
  }
}

processDirectory(srcDir)
console.log('Replacement complete.')
