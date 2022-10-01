import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('index');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
