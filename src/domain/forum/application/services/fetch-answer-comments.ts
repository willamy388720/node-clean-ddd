import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface FetchAnswerCommentsServiceRequest {
  page: number;
  answerId: string;
}

interface FetchAnswerCommentsServiceResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsService {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsServiceRequest): Promise<FetchAnswerCommentsServiceResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return { answerComments };
  }
}
