import express from "express";
import bodyParser from 'body-parser';
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", { joke: "Please Select The Type of joke you want."});
});

app.post("/", async (req,res) => {
    let type = req.body.jokeType;
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/${type}?format=txt`);
        const result = response.data;
        res.render("index.ejs", { 
            joke: result
        });
    } catch (error) {
        console.error(error.message);
        res.render("index.ejs", {
        error: "Please Select The correct type of Joke."
        });
    }
})



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});