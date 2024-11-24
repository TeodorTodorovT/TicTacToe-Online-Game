const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
    console.log('Server Listening on PORT: ', PORT);
});

app.get("/", (req, res) => {
    res.send("Hello from server!")
})