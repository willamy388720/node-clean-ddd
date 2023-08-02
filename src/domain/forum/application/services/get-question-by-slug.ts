import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface GetQuestionBySlugServiceRequest {
  slug: string;
}

interface GetQuestionBySlugServiceResponse {
  question: Question;
}

export class GetQuestionBySlugService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugServiceRequest): Promise<GetQuestionBySlugServiceResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found");
    }

    return { question };
  }
}
