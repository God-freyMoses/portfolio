#!/usr/bin/env node

const chokidar = require('chokidar')
const { exec } = require('child_process')
const path = require('path')

// Watch content directory for changes
const contentDir = path.join(__dirname, '..', 'content')

console.log('🚀 Starting content hot reload watcher...')
console.log(`📁 Watching: ${contentDir}`)

const watcher = chokidar.watch(contentDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 50,
  },
})

let rebuildTimeout

function triggerRebuild() {
  console.log('📝 Content change detected, rebuilding...')

  // Clear existing timeout
  if (rebuildTimeout) {
    clearTimeout(rebuildTimeout)
  }

  // Debounce rebuilds
  rebuildTimeout = setTimeout(() => {
    exec('npx contentlayer build', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Contentlayer build failed:', error.message)
        return
      }

      if (stderr) {
        console.warn('⚠️  Contentlayer warnings:', stderr)
      }

      console.log('✅ Contentlayer build completed')
      console.log('🔄 Next.js will hot reload automatically')
    })
  }, 500)
}

watcher
  .on('add', filePath => {
    console.log(`📄 File added: ${path.relative(contentDir, filePath)}`)
    triggerRebuild()
  })
  .on('change', filePath => {
    console.log(`✏️  File changed: ${path.relative(contentDir, filePath)}`)
    triggerRebuild()
  })
  .on('unlink', filePath => {
    console.log(`🗑️  File removed: ${path.relative(contentDir, filePath)}`)
    triggerRebuild()
  })
  .on('addDir', dirPath => {
    console.log(`📁 Directory added: ${path.relative(contentDir, dirPath)}`)
    triggerRebuild()
  })
  .on('unlinkDir', dirPath => {
    console.log(`🗑️  Directory removed: ${path.relative(contentDir, dirPath)}`)
    triggerRebuild()
  })

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Stopping content watcher...')
  watcher.close()
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n👋 Stopping content watcher...')
  watcher.close()
  process.exit(0)
})
