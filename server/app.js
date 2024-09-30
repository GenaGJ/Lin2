
require('dotenv').config(); 
const { Op } = require('sequelize');
const express = require('express');
const path = require('path')


const app = express();
const cookieParser = require('cookie-parser');
const { verifyAccessToken } = require('./middleware/verifyJWT');

const serversApiRoutes = require('./routes/api/servers.routers');
const authApiRoutes = require('./routes/api/auth.routes');


app.use(cookieParser());
app.use(express.urlencoded());


app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client/dist')))

app.use(express.static(process.env.NODE_ENV === 'production'
  ? path.join(__dirname,'./dist')
  : path.join(__dirname, '../client/dist')))
  
app.use(verifyAccessToken);
const cron = require('node-cron');
const {Server} = require('./db/models'); // Путь к модулю базы данных


cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    await Server.destroy({
        where: {
            destroyAt: {
              [Op.lt]: now 
            }
          }
        });
    
    console.log('Устаревшие сервера успешно удалены');
  } catch (error) {
    console.error('Ошибка при удалении устаревших серверов:', error);
  }
});



app.use('/api/servers', serversApiRoutes);

app.use('/api/auth', authApiRoutes);


const PORT = process.env.PORT ?? 5500;

app.listen(PORT, () => console.log(`Я Запустился на сервере ${PORT}`));
