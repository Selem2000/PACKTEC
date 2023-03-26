const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({ ...req.body });
    await newPost.save();
    res.status(200).send({ msg: "Post add", Post: newPost });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: " faild to create Post" }] });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    let PostList = await Post.find();

    res.status(200).send({ msg: "get all the Posts", Posts: PostList });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can not get all Posts" }] });
  }
};

exports.getPostByID = async (req, res) => {
  try {
    let PostToFind = await Post.findById(req.params.id);
    res.status(200).send({ msg: "get Post by id", Post: PostToFind });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "faild to get Post" }] });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "delete success" });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "delete faild" }] });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const result = await Permutation.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    if (result.modifiedCount) {
      return res.status(200).send("updated");
    }
    res.status(200).send({ msg: "no modification" });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "faild to update" }] });
  }
};
