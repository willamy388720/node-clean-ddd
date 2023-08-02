import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface AnswerQuestionServiceRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionServiceResponse {
  answer: Answer;
}

export class AnswerQuestionService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionServiceRequest): Promise<AnswerQuestionServiceResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return { answer };
  }
}
