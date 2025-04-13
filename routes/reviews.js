const express = require("express")
const router = express.Router()

const reviews = require("../data/reviews")
const error = require("../utilities/error")


// GET all reviews or filter by userId or bookId
router
    .route("/")
    .get((req, res) => {
        const links = [
            {
                href: "reviews/:id",
                rel: ":id",
                type: "GET",
            },
        ];

        res.json({ reviews, links });
    })
    .post((req, res, next) => {
        if (req.body.bookId && req.body.userId && req.body.content) {
            const review = {
                id: reviews[reviews.length - 1].id + 1,
                bookId: req.body.bookId,
                userId: req.body.userId,
                content: req.body.content,
            };

            reviews.push(review);
            res.json(reviews[reviews.length - 1]);
        } else {
            next(error(400, "Insufficient Data"));
        }
    });

router
    .route("/:id")
    .get((req, res, next) => {
        const review = reviews.find((r) => r.id == req.params.id);

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

        if (review) {
            res.json({ review, links });
        } else {
            next(error(404, "Review not found"));
        }
    })
    .patch((req, res, next) => {
        const review = reviews.find((r, i) => {
            if (r.id == req.params.id) {
                for (const key in req.body) {
                    reviews[i][key] = req.body[key];
                }
                return true;
            }
        });

        if (review) {
            res.json(review);
        } else {
            next(error(404, "Review not found"));
        }
    })
    .delete((req, res, next) => {
        const review = reviews.find((r, i) => {
            if (r.id == req.params.id) {
                reviews.splice(i, 1);
                return true;
            }
        });

        if (review) {
            res.json(review);
        } else {
            next(error(404, "Review not found"));
        }
    });

    module.exports = router;

