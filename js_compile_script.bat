@echo off

echo  start 
mkdir js_compile_build\sys
mkdir js_compile_build\doc

npm config set registry https://registry.npm.taobao.org && npm install && npm run build && xcopy "dist" "js_compile_build\sys" /E/y && cd js_compile_build

echo  SUCCESS!! 