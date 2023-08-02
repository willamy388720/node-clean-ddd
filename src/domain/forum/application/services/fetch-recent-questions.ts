import { Either, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchRecentQuestionsServiceRequest {
  page: number;
}

type FetchRecentQuestionsServiceResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

export class FetchRecentQuestionsService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsServiceRequest): Promise<FetchRecentQuestionsServiceResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return right({ questions });
  }
}
