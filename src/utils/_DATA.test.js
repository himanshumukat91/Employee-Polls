import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("Testing _saveQuestion()", () => {
  it("returns error for missing option 1", async () => {
    const questionInputData = {
      optionTwoText: "Option 2",
      author: "NA",
    };
    const error = "Please provide optionOneText, optionTwoText, and author";
    await expect(_saveQuestion(questionInputData)).rejects.toEqual(error);
  });

  it("returns error for missing option 2", async () => {
    const questionInputData = {
      optionOneText: "Option 1",
      author: "NA",
    };
    const error = "Please provide optionOneText, optionTwoText, and author";
    await expect(_saveQuestion(questionInputData)).rejects.toEqual(error);
  });

  it("returns error for missing author", async () => {
    const questionInputData = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
    };
    const error = "Please provide optionOneText, optionTwoText, and author";
    await expect(_saveQuestion(questionInputData)).rejects.toEqual(error);
  });

  it("returns the correct formatted question for correct input data", async () => {
    const questionInputData = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
      author: "sarahedo",
    };
    const questionData = await _saveQuestion(questionInputData);
    expect(questionData).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        timestamp: expect.any(Number),
        author: questionInputData.author,
        optionOne: { text: questionInputData.optionOneText, votes: [] },
        optionTwo: { text: questionInputData.optionTwoText, votes: [] },
      })
    );
  });
});

describe("Testing _saveQuestionAnswer()", () => {

  it("returns true for correct input data", async () => {
    const answerInputData = {
      authedUser: "mtsamis",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    };
    const response = await _saveQuestionAnswer(answerInputData);
    expect(response).toBe(true);
  });

  it("returns error for missing qid", async () => {
    const answerInputData = {
      authedUser: "mtsamis",
      answer: "optionTwo",
    };
    const error = "Please provide authedUser, qid, and answer";
    await expect(_saveQuestionAnswer(answerInputData)).rejects.toEqual(error);
  });

  it("returns error for missing author", async () => {
    const answerInputData = {
      answer: "optionTwo",
      qid: "6ni6ok3ym7mf1p33lnez",
    };
    const error = "Please provide authedUser, qid, and answer";
    await expect(_saveQuestionAnswer(answerInputData)).rejects.toEqual(error);
  });

  it("returns error for missing answer", async () => {
    const answerInputData = {
      authedUser: "mtsamis",
      qid: "6ni6ok3ym7mf1p33lnez",
    };
    const error = "Please provide authedUser, qid, and answer";
    await expect(_saveQuestionAnswer(answerInputData)).rejects.toEqual(error);
  });
  
});
