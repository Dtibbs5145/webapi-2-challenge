const server = require('./server');
const db = require('./data/db');

server.get('/api/posts', async (req, res) => {
    try {
        const post = await db.find();
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error getting the posts' });
    }
});

server.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'That post could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error getting post' });
    }
});

server.get('/api/posts/:id/comments', async (req, res) => {
    try {
        const post = await db.findPostComments(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Could not find comments' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error getting comment(s)' });
    }
});

server.post('/api/posts', async (req, res) => {
    try {
        const post = await db.insert(req.body);
        if (post) {
            res.status(201).json({ message: 'Posted successfully' });
        } else {
            res.status(400).json({ message: 'Could not post' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error adding post' });
    }
});

server.post('/api/posts/:id/comments', async (req, res) => {
    try {
        const post = await db.insertComment(req.body);
        if (post) {
            res.status(201).json({ message: 'Posted successfully' });
        } else {
            res.status(400).json({ message: 'Could not post' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error adding comment' })
    }
});

server.put('/api/posts/:id', async (req, res) => {
    try {
        const post = db.update(req.params.id, req.body);
        if (!req.params.id) {
            res.status(400).json({ message: 'Provide content for post' });
        } if (post) {
            res.status(200).json({ message: 'Post was updated!' });
        } else {
            res.status(404).json({ message: 'Post could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error updating the post' });
    }
});

const port = 5000;
server.listen(port, () => console.log(`API running on ${port}`));