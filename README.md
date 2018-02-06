# react-component-start-kit

Start kit for react component.



## Todo

- [x] storybook
- [x] typescript
- [x] Jest
- [x] Tslint
- [x] prettier
- [x] less



## How to run

```shell
# install dependecies
$ yarn install

# build src/index.tsx to dist
$ yarn build

# run storybook server
$ yarn storybook

# run test
# We only test files ended with .ts or .tsx
$ yarn test
```

## Hint
### tsconfig.json
1. We have to two tsconfig.json files. 

- The first one is `./tsconfig.json`, in order to build component to dist/.js and dist/.css.   
  It sets rootDir with `./src`, and excludes `./stories`. So it only compiles `./src`.   
  It is used in `./webpack.config.js`.
- The other one is `./stories/tsconfig.json`, in order to build static-storybook, run storybook, and lint the whole proejct.    
  It sets rootDir with `./`, includes `./stories` and `./src`. So it compiles the whole project includes `./src` and `./stories`.   
  It is used in `./.storybook/webpack.config.js`, and `./package.json` for the command `lint:ts`.

2. Default value of `include` in tsconifg.json.   
`include` in tsconfig.json is `**/*`.   
It includes current directories and all sub directories normally.   
But `include` with value `**/*` is confused in `./stories/tsconfig.json`.   
Because it represents `./stories/**/*`, and `.stories/../*`.   
As a result, we set `include` with value `../**/*` instead in `./stories/tsconfig.json`.

3. Who will be compiled?

- The files in `include`, and not in `exclude`.
- The files in `fiels`, with regards of `exclude.
- The file which is imported in compiled file, even if it is not in `include`.



