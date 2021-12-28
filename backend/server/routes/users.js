import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.body)
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
})

export default router;
