const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");


router
  .route("/")
  .get((req, res) => {
    const postId = parseInt(req.query.postId);
    // If postId is provided, filter the comments
    if (postId) {
      const filteredComments = comments.filter((c) => c.postId === postId);
      return res.json(filteredComments);
    }

    // Return all comments if no postId is provided
    const links = [
      {
        href: "/comments/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ comments, links });
  })
  .post((req, res, next) => {
    // Validate that required data exists
    if (req.body.userId && req.body.postId && req.body.content) {
      const comment = {
        id: comments[comments.length - 1].id + 1,
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content,
      };

      comments.push(comment);

      res.locals.commentMessage = "Your comment has been submitted successfully!"

      // res.json(comments[comments.length - 1]); // no longer needed
      // res.redirect("/"); // Redirect to the homepage - doesn't work...

      // Render the page with the newly added comment and message
      res.render("index", {
        userId: req.body.userId,
        postId: req.body.postId,
        commentMessage: res.locals.commentMessage, // passing the message
        comments: comments // passing the comments to render
      });

    } else {
      next(error(400, "Insufficient Data"));
    }
  });

// Get, Update, or Delete a specific comment by its ID
router
  .route("/:id")
  .get((req, res, next) => {
    const comment = comments.find((c) => c.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (comment) res.json({ comment, links });
    else next();
  })
  .patch((req, res, next) => {
    const comment = comments.find((c, i) => {
      if (c.id == req.params.id) {
        // Update the fields in the comment
        for (const key in req.body) {
          comments[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (comment) res.json(comment);
    else next();
  })
  .delete((req, res, next) => {
    const comment = comments.find((c, i) => {
      if (c.id == req.params.id) {
        comments.splice(i, 1); // Remove the comment from the array
        return true;
      }
    });

    if (comment) res.json(comment);
    else next();
  });

module.exports = router;