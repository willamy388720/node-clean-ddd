import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Either, right } from "@/core/either";

interface CreateQuestionServiceRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionServiceResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionServiceRequest): Promise<CreateQuestionServiceResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    await this.questionsRepository.create(question);
    return right({
      question,
    });
  }
}
