# image-upload

사용 라이브러리

#### react-toastify

```
 npm i react-toastify
```

https://www.npmjs.com/package/react-toastify

## 참고 깃허브

### 깃 서버 코드

https://github.com/hoffnung8493/image-tutorial

### 깃 프론트 코드

https://github.com/hoffnung8493/image-tutorial-frontend

# 실행방법

## 서버

### 서버 실행

cd server
npm i
npm run dev

### 서버 실행에 필요한 파일

위치 /server/.env

.env

```
MONGODB_URI="mongodb+srv://psh6654:psh6654@cluster0.hmttf0w.mongodb.net/?retryWrites=true&w=majority"
PORT="5000"
```

미들웨어 라이브러리
이미지 업로드
multer
: 이미지, 동영상 등 파일들을 멀티파트 형식으로 업로드 할 때 사용하는 미들웨어

## 클라이언트

cd client
npm i
npm run start
