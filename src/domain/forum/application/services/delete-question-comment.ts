import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentServiceRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentServiceResponse {}

export class DeleteQuestionCommentService {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentServiceRequest): Promise<DeleteQuestionCommentServiceResponse> {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      throw new Error("Question not found");
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error("Invalid author");
    }

    await this.questionCommentsRepository.delete(questionComment);

    return {};
  }
}
