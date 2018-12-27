import { uglify } from "rollup-plugin-uglify"
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import path from 'path'

export default {
    output: {
        format: "umd",
        file: "cdn/tarant-vue-" + require("./package.json").version + ".min.js",
        name: "tarantVue"
    },
    input: "lib/index.ts",
    plugins: [
        typescript({
            tsconfig: false,
            target: "es5",
            declaration: true,
            strict: true,
            lib: ["es6"],

        }),
        nodeResolve(), 
        commonjs(), 
        uglify(),
        alias({
            vue: path.resolve('./node_modules/vue/dist/vue.runtime.common.js')
        }),
        replace({'process.env.NODE_ENV': JSON.stringify('development')})
    ]
}