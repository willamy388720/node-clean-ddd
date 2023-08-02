import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsServiceRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionCommentsServiceResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsService {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsServiceRequest): Promise<FetchQuestionCommentsServiceResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return { questionComments };
  }
}
