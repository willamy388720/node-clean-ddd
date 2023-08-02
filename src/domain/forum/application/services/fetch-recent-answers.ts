import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface FetchRecentAnswersServiceRequest {
  page: number;
  questionId: string;
}

interface FetchRecentAnswersServiceResponse {
  answers: Answer[];
}

export class FetchRecentAnswersService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchRecentAnswersServiceRequest): Promise<FetchRecentAnswersServiceResponse> {
    const answers = await this.answersRepository.findManyRecent(
      { page },
      questionId
    );

    return { answers };
  }
}
