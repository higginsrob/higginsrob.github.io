import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fetchYouTubeRssFeed } from './src/utils/youtube'

type ConnectMiddleware = (
  req: { url?: string },
  res: {
    statusCode: number
    setHeader: (name: string, value: string) => void
    end: (body: string) => void
  },
  next: () => void
) => void

function youtubeFeedPlugin(): Plugin {
  const attach = (server: { middlewares: { use: (fn: ConnectMiddleware) => void } }) => {
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split('?')[0]
      if (url !== '/youtube-videos.json') {
        next()
        return
      }

      void fetchYouTubeRssFeed()
        .then((videos) => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(videos))
        })
        .catch((err: unknown) => {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : 'Failed to load YouTube feed',
            })
          )
        })
    })
  }

  return {
    name: 'youtube-feed',
    configureServer: attach,
    configurePreviewServer: attach,
    async generateBundle() {
      let videos: Awaited<ReturnType<typeof fetchYouTubeRssFeed>> = []
      try {
        videos = await fetchYouTubeRssFeed()
        const withDescriptions = videos.filter((video) => video.description.trim()).length
        console.log(
          `[youtube-feed] baked ${videos.length} videos (${withDescriptions} with descriptions)`
        )
      } catch (err) {
        this.warn(
          `[youtube-feed] ${err instanceof Error ? err.message : 'Failed to load YouTube feed'}`
        )
      }
      this.emitFile({
        type: 'asset',
        fileName: 'youtube-videos.json',
        source: JSON.stringify(videos),
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), youtubeFeedPlugin()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
})
