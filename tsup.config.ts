import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src'],               // ponto de entrada principal
    outDir: 'dist',                         // pasta de saída dos artefatos
    bundle: true,                           // agrupa todo o código em um bundle
    platform: 'node',                       // otimizado para Node.js
    target: 'es2022',                       // aproveita features do Node 18+ 
    format: ['cjs'],                        // gera módulos ES (pode adicionar 'cjs')
    clean: true,                            // limpa dist/ antes de cada build
    sourcemap: false,                       // desativa source maps em produção
    minify: false,                           // reduz tamanho e ofusca o bundle
    dts: false,                             // não gera .d.ts (ajuste conforme necessidade)
    //esbuildPlugins: [tsconfigPathsPlugin()],// resolve aliases do tsconfig.json
    //external: []                            // liste libs a excluir do bundle, se houver
  })