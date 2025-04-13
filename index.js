const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const posts = require("./routes/posts");
//const posts = require("./routes/reviews"); //<------????
const comments = require("./routes/comments");

const error = require("./utilities/error");

const app = express();
const port = 3000;

app.use(express.static('./styles'))

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
    //if (Object.keys(req.body).length > 0) {  
    if (req.body && Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Custom (error handling = validation) middleware! 
app.use("/api/comments", (req, res, next) => {
  if (req.method === "POST" && (!req.body.content || req.body.content.trim() === "")) {
    return next(error(400, "Are you sure you don't want to leave a comment?"))
  }
  next()
})


// Middleware to notify user when comment is submitted
const commentSubmittedMessage = (req, res, next) => {
  if (req.method === "POST" && req.body.content && req.body.content.trim() !== '') { // Check if the comment is successfully submitted
    console.log("Comment submitted successfully.");
    res.locals.commentMessage = "Your comment has been submitted successfully!";
  }
  next();
};


// Valid API Keys.
// apiKeys = ["perscholas", "ps-example", "hJAsknw-L198sAJD-l3kasx", "test"];


// Use our Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
//app.use("/api/reviews", reviews); //<---------????
app.use("/api/comments", comments);
app.use("/api/comments", commentSubmittedMessage);


app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index", {
    userId: 1,
    postId: 1,
  });
});

// app.get("/", (req, res) => {
//   res.send("Work in progress!");
// });

// Adding some HATEOAS links.
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

// Adding some HATEOAS links.
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "GET",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "POST",
      },
    ],
  });
});

// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
