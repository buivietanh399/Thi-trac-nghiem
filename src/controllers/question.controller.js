const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { questionService } = require("../services");

const createQuestion = catchAsync(async (req, res) => {
  const question = await questionService.createQuestion(req.body);
  res.status(httpStatus.CREATED).send(question);
});

const getQuestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["grade", "tags", "isSolved", "ids", "query"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await questionService.queryQuestions(filter, options);
  res.send(result);
});

const getQuestion = catchAsync(async (req, res) => {
  const question = await questionService.getQuestionById(req.params.questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, "Question not found");
  }
  res.send(question);
});

const updateQuestion = catchAsync(async (req, res) => {
  const question = await questionService.updateQuestionById(
    req.params.questionId,
    req.body
  );
  res.send(question);
});

const deleteQuestion = catchAsync(async (req, res) => {
  await questionService.deleteQuestionById(req.params.questionId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getQuestionsWithCriterias = catchAsync(async (req, res) => {
  const results = await questionService.queryQuestionsWithCriterias(req.body);
  res.status(httpStatus.OK).send(results);
});

const createQuestions = catchAsync(async (req, res) => {
  const questions = await questionService.createQuestions(req.body)
  res.send(questions)
})

module.exports = {
  createQuestion,
  createQuestions,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsWithCriterias,
};
