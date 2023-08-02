import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerServiceRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerServiceResponse {}

export class DeleteAnswerService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerServiceRequest): Promise<DeleteAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Question not find");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Invalid author");
    }

    await this.answersRepository.delete(answer);

    return {};
  }
}
