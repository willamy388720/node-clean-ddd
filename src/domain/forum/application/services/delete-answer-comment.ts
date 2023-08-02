import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentServiceRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentServiceResponse {}

export class DeleteAnswerCommentService {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentServiceRequest): Promise<DeleteAnswerCommentServiceResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      throw new Error("Answer not found");
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error("Invalid author");
    }

    await this.answerCommentsRepository.delete(answerComment);

    return {};
  }
}
