import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

let name = pkg.name.replace(/[^a-z\/]/gi, '')

if (name.indexOf('/') !== -1) {
  name = name.split('/')[1]
}

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.rollup.main,
      format: 'cjs'
    },
    {
      file: pkg.rollup.module,
      format: 'es'
    },
    {
      file: pkg.rollup.browser,
      format: 'iife',
      name: name
    }
  ],
  plugins: [
    builtins(),
    globals(),
    resolve(),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    terser()
  ]
}
