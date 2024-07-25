import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';
import mongoose from 'mongoose';
import Chat from './models/chat.js';
import UserChats from './models/userChats.js';
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PROT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get('/api/upload', (req, res) => {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get('/api/test', ClerkExpressRequireAuth(), (req, res) => {
  const userId = req.auth.userId;
  console.log(userId)
  res.send('good')
});

app.post('/api/chats', ClerkExpressRequireAuth(), async (req, res) => {
  const { text, userId } = req.body;

  try {
    // 새 채팅 만들기
    const newChat = new Chat({
      userId: userId,
      history: [
        {
          role: 'user',
          parts: [{ text }],
        },
      ],
    });

    const savedChat = await newChat.save();

    // 사용자 채팅이 있는지 확인
    const userChats = await UserChats.find({ userId: userId });

    // 존재하지 않는 경우 새 채팅을 만들고 채팅 배열에 채팅을 추가
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat.id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // 존재하는 경우 채팅을 기존 배열로 푸시
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );

      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating chast');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});

app.listen(port, () => {
  connect();
  console.log(`Server running on ${port}`);
});
