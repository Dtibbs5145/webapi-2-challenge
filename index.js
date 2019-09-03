const server = require('./server');
const db = require('./data/db');

server.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await db.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error getting the blogs' });
    }
});

const port = 5000;
server.listen(port, () => console.log(`API running on ${port}`));