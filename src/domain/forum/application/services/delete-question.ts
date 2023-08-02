import { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionServiceRequest {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionServiceResponse {}

export class DeleteQuestionService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionServiceRequest): Promise<DeleteQuestionServiceResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not find");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Invalid author");
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}
