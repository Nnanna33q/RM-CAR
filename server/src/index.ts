import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('This is a test');
})

app.listen(3000, () => console.log('Listening on PORT 3000'))