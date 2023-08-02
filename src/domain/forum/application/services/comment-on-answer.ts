import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface CommentOnAnswerServiceRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerServiceResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerService {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerServiceRequest): Promise<CommentOnAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return {
      answerComment,
    };
  }
}
