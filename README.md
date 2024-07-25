# ChatGPT Clone

<img width="100%" src="https://github.com/yunyoungsik/ChatGPT-Clone/blob/main/client/public/thumnail.jpg?raw=true" />

[참고영상](https://youtu.be/8iAQ1h30n5I?si=W96G-njTbYYjyBPx)

## 설치

<details>
<summary>Clinet</summary>
npm install -f react-router-dom<br />
npm install -f react-type-animation<br />  
npm i -f imagekitio-react<br />
npm i -f @google/generative-ai<br />
npm i -f react-markdown<br />
npm i -f @tanstack/react-query<br />
<br />
Clerk<br />
npm install -f @clerk/clerk-react
</details>

<details>
<summary>Backend</summary>
npm i nodemon<br />
npm i express<br />
npm i imagekit<br />
npm i cors<br />
npm i mongoose<br />
npm i path url
</details>

### Backend

[package.json]
```
 "type": "module", <!-- 추가 -->
  "scripts": {
    "start": "nodemon index.js", <!-- 추가 -->
    "start": "nodemon --env-file .env index.js", <!-- 변경 -->
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
