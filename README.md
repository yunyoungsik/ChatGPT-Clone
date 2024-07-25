# ChatGPT Clone

## 설치
[Clinet]
```
npm install -f react-router-dom
npm install -f react-type-animation
npm i -f imagekitio-react
npm i -f @google/generative-ai
npm i -f react-markdown

Clerk
npm install -f @clerk/clerk-react
```

[Backend]
```
npm i nodemon
npm i express
npm i imagekit
npm i cors
npm i mongoose

Clerk
npm install @clerk/clerk-sdk-node
```

```
 "type": "module", <!-- 추가 -->
  "scripts": {
    "start": "nodemon index.js", <!-- 추가 -->
    "start": "nodemon --env-file .env index.js", <!-- 변경 -->
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```