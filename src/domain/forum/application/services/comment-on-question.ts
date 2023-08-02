import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface CommentOnQuestionServiceRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionServiceResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionService {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionServiceRequest): Promise<CommentOnQuestionServiceResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return {
      questionComment,
    };
  }
}
