import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface EditAnswerServiceRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerServiceResponse {
  answer: Answer;
}

export class EditAnswerService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerServiceRequest): Promise<EditAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not find");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Invalid author");
    }

    answer.content = content;

    await this.answersRepository.save(answer);

    return { answer };
  }
}
