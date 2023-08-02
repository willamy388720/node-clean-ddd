
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerServiceRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerServiceResponse {
    question: Question
}

export class ChooseQuestionBestAnswerService {
  constructor(private answersRepository: AnswersRepository, private questionsRepository: QuestionsRepository) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerServiceRequest): Promise<ChooseQuestionBestAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answers not found");
    }

    const question = await this.questionsRepository.findById(answer.questionId.toValue());


    if (!question) {
        throw new Error("Question not found");
      }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Invalid author");
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return { 
        question
    };
  }
}
