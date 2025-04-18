
const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());


app.post("/*", async (req, res) => {
    res.send("hello post");
}); // Start the server 

app.get("/*", (req, res) => {
    res.send("hello get");
});


app.listen(PORT,function (err)  {
    if (err) console.log(err);
    console.log("Server is running on port ",PORT);
});