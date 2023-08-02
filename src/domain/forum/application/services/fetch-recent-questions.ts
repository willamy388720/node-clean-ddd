import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchRecentQuestionsServiceRequest {
  page: number;
}

interface FetchRecentQuestionsServiceResponse {
  questions: Question[];
}

export class FetchRecentQuestionsService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsServiceRequest): Promise<FetchRecentQuestionsServiceResponse> {
    const questions = await this.questionsRepository.findManyRecent({page});

    return { questions };
  }
}
