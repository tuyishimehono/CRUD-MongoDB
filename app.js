const express = require("express");
const mongoose = require("mongoose");
const Album = require("./models/album");

const app = express();
app.use(express.json());

const dbURI =
  "mongodb+srv://Hono:hono123@crud-db.0zfq2.mongodb.net/albums?retryWrites=true&w=majority&appName=CRUD-DB";

mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.get("/all-albums", (req, res) => {
  Album.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/albums", (req, res) => {
  const { title, description, price } = req.body;
  const album = new Album({
    title,
    description,
    price,
  });
  album
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error saving album" });
    });
});

app.get("/album/:id", (req, res) => {
  const albumId = req.params.id;
  Album.findById(albumId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/album/:id", async (req, res) => {
  const albumId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(albumId, updatedData, {
      new: true,
    });
    if (updatedAlbum) {
      res.status(200).json({
        message: "album updated successfully",
        album: updatedAlbum,
      });
    } else {
      res.status(401).json({
        message: "album not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating album",
      error: error.message,
    });
  }
});

app.delete("/album/:id", async (req, res) => {
  const albumId = req.params.id;
  try {
    const deletedAlbum = await Album.findOneAndDelete({
      _id: albumId,
    });
    if (deletedAlbum) {
      res.status(200).json({
        message: "album deleted successfully",
        album: deletedAlbum,
      });
    } else {
      res.status(404).json({
        message: "album not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the album",
      error: error.message,
    });
  }
});

app.listen(8000);
