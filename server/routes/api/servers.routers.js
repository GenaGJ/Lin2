const router = require('express').Router();


const { Server } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const servers = await Server.findAll();

    res.json({ servers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { address,name, desc, rating, chronicles, openAt, destroyAt } = req.body;

  // const img = undefined ? `images/1708261429493.jpg` : `/${req.file.filename}`;
  try {
    const server = await Server.create({
      address,
      name,
      desc,
      rating,
      chronicles,
      openAt: new Date(openAt),
      destroyAt: new Date(destroyAt),
      userId: res.locals.user.id,
    });

    res.json({
      server,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:serverId', async (req, res) => {
  const { serverId } = req.params;

  try {
    const result = await Server.destroy({
      where: { id: serverId },
    });

    if (!result) {
      res.status(500).json({ success: false, message: 'Это не твоё' });
      return;
    }

    res.json({ message: 'seccess', serverId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});
//appdate
router.put('/:serverId', async (req, res) => {
  const { serverId } = req.params;
   const  userId  = res.locals.user.id;
  const { address,name, desc, rating, chronicles, openAt, destroyAt } = req.body;
  
  try {
    const result = await Server.update(
      { id: serverId,address, name, desc, rating, chronicles, openAt:new Date(openAt), destroyAt:new Date(destroyAt) },
      { where: { id: serverId, userId: res.locals.user.id } }
        
    );
    
    if (result === 0  ) {
      res
        .status(500)
        .json({ success: false, message: 'Нельзя изменять чужое' });
      return;
    }
  
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});





module.exports = router;
