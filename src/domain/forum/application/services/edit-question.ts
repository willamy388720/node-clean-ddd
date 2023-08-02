import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionServiceRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionServiceResponse {
  question: Question;
}

export class EditQuestionService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionServiceRequest): Promise<EditQuestionServiceResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not find");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Invalid author");
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return { question };
  }
}
