const Presentation = require("../models/presentation");
const asyncHandler = require("express-async-handler");

const createPresentation = asyncHandler(async (req, res) => {
  const { title, authors, slides } = req.body;
  console.log("🚀 ~ createPresentation=asyncHandler ~ req.body:", req.body);

  if (!title || !Array.isArray(authors) || !authors.length) {
    return res.status(400).json({ message: "Title and authors are required!" });
  }

  const duplicate = await Presentation.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate title" });
  }

  const presentation = new Presentation({ title, authors, slides });
  await presentation.save();

  res.status(201).json({ message: `New presentation ${title} created` });
});

const getAllPresentations = asyncHandler(async (req, res) => {
  const presentations = await Presentation.find().lean();
  res.json(presentations);
});

const getPresentationByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const presentation = await Presentation.findOne({ title }).lean();
  if (!presentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  res.json(presentation);
});

const updatePresentationByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const update = req.body;
  const updatedPresentation = await Presentation.findOneAndUpdate(
    { title },
    update,
    { new: true, runValidators: true }
  ).lean();
  if (!updatedPresentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  res.json({ message: `Presentation ${title} updated` });
});

const deletePresentationByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const deletedPresentation = await Presentation.findOneAndDelete({
    title,
  }).lean();
  if (!deletedPresentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  res.status(204).json({ message: `Presentation ${title} deleted` });
});

const updateAuthorsList = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const { authors } = req.body;

  if (!Array.isArray(authors) || !authors.length) {
    return res.status(400).json({ message: "Authors list is required!" });
  }

  const presentation = await Presentation.findOneAndUpdate(
    { title },
    { authors },
    { new: true, runValidators: true }
  ).lean();
  if (!presentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  res.json({ message: `Authors list for presentation ${title} updated` });
});

module.exports = {
  getAllPresentations,
  createPresentation,
  getPresentationByTitle,
  updateAuthorsList,
  updatePresentationByTitle,
  deletePresentationByTitle,
};
