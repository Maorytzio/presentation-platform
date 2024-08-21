const Presentation = require("../models/presentation");
const asyncHandler = require("express-async-handler");

const createPresentation = asyncHandler(async (req, res) => {
  const { title, authors, slides } = req.body;

  if (!title || !Array.isArray(authors) || !authors?.length) {
    return res.status(400).json({ message: "Title and authors are required!" });
  }

  const duplicate = await Presentation.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate title" });
  }

  const presentation = new Presentation({ title, authors, slides });
  await presentation.save();

  res.status(201).json({ presentation });
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

// Alter a Slide in a Presentation
const alterSlideInPresentation = asyncHandler(async (req, res) => {
  const { title, slideId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Slide content is required!" });
  }

  const presentation = await Presentation.findOne({ title });
  if (!presentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }

  const slide = presentation.slides.id(slideId);
  if (!slide) {
    return res.status(404).json({ message: "Slide not found" });
  }

  slide.content = content;
  await presentation.save();

  res.json({
    message: `Slide '${slideId}' in presentation '${title}' updated`,
    presentation,
  });
});

// Add a Slide to a Presentation
const addSlideToPresentation = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Slide content is required!" });
  }

  const presentation = await Presentation.findOne({ title });
  if (!presentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }

  presentation.slides.push({ content });
  await presentation.save();

  res
    .status(201)
    .json({ message: `Slide added to presentation '${title}'`, presentation });
});

// Delete a Slide from a Presentation
const deleteSlideFromPresentation = asyncHandler(async (req, res) => {
  const { title, slideId } = req.params;

  const presentation = await Presentation.findOne({ title });
  if (!presentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }

  presentation.slides.pull({ _id: slideId });
  await presentation.save();

  res.json({
    message: `Slide '${slideId}' deleted from presentation '${title}'`,
    presentation,
  });
});

// Update Authors List in a Presentation
const updateAuthorsList = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const { authors } = req.body;

  if (!Array.isArray(authors) || !authors?.length) {
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

  res.json({ message: `Authors list for presentation '${title}' updated` });
});

module.exports = {
  getAllPresentations,
  createPresentation,
  getPresentationByTitle,
  updateAuthorsList,
  deletePresentationByTitle,
  alterSlideInPresentation,
  deleteSlideFromPresentation,
  addSlideToPresentation,
};
