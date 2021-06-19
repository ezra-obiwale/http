import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

let name = pkg.name.replace(/[^a-z\/]/gi, '')

if (name.indexOf('/') !== -1) {
  name = name.split('/')[1]
}

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name
      },
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        exclude: 'node_modules/**', // only transpile our source code
      }),
      terser(),
    ],
  },
]
