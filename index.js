const express = require("express");
const app = express();
app.use(express.json()); //Add this to parse JSON requests

const port = 8080;
const path = require("path")
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// the below is a middleware which is writetn to understand the api calls
app.use(express.urlencoded({ extended: true }));


const methodoveride = require("method-override");
app.use(methodoveride("_method"));

const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let posts = [
    {
        id: uuidv4(),
        username: "nikhil",
        content: "lovely person"
    },
    {
        id: uuidv4(),
        username: "deadly",
        content: "dwreww"
    },
    {
        id: uuidv4(),
        username: "lamesh",
        content: "bodarvar"
    },
];



app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})



app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    // res.send("post request working ");
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    console.log(post)
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newcontent;
    console.log(post);

    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    console.log("the edit post is kinda workking ");
    res.render("edit.ejs", { post })

})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts=posts.filter((p)=>id != p.id);
    res.redirect("/posts");  
})




app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})