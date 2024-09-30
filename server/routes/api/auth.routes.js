const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../../utils/authUtils');
const configJWT = require('../../middleware/configJWT');





router.post('/signIn', async (req, res) => {
  const { name, password } = req.body;
  

  if (name === '' || password === '') {
    res.status(404).json({ success: false, message: 'Заполните все поля' });
  }

  try {
    const user = await User.findOne({ where: { name} });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'такова пользователя не сушествует(Ты кто такой ? разбойник?)',
      });
      return;
    }
    if (await bcrypt.compare(user.password, password)) {
      res.status(404).json({
        success: false,
        message: 'Неверный пароль',
      });
      return;
    }
    // req.session.girlId = girl.id;

    res.locals.user = user;
    const { accessToken, refreshToken } = generateTokens({
      user: { id: user.id, name: user.name, },
    });

    res.cookie('access', accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.cookie('refresh', refreshToken, {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    });

    res.status(200).json({ success: true,user});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


router.get('/check', async (req, res) => {
  console.log(res.locals.user);
  if (res.locals.user) {
    
    const user = await User.findOne({ where: { id: res.locals.user.id } });
    res.json({ user });
    return;
  }
  res.json({});
});

router.get('/logout', (req, res) => {
  res.clearCookie(configJWT.access.type).clearCookie(configJWT.refresh.type);
  res.json({ message: 'success' });
});








module.exports = router;
