const express = require("express");
const mongoose = require("mongoose");
const Album = require("./models/album");

const app = express();

const dbURI =
  "mongodb+srv://Hono:hono123@crud-db.0zfq2.mongodb.net/albums?retryWrites=true&w=majority&appName=CRUD-DB";

mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.get("/add-album", (req, res) => {
  const album = new Album({
    title: "CRUSH EP",
    description:
      "Artist: Ravyn Lenae, \n Favorite songs: 4 Leaf clover, The Night Song, Sticky",
    price: 18,
  });
  album
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/all-albums", (req, res) => {
  Album.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
//66e4036bbcfcca928bd76d86
app.get("/album/:id", (req, res) => {
  const albumId = req.params.id;
  Album.findById(albumId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/deleted-album", async (req, res) => {
  const deletedAlbum = await Album.findOneAndDelete({
    _id: "66e4036bbcfcca928bd76d86",
  });
  if (deletedAlbum) {
    res.status(200).send({
      message: "album deleted successfully",
      album: deletedAlbum,
    });
  } else {
    res.status(404).send({
      message: "album not found",
    });
  }
});

app.listen(8000);
