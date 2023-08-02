import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositoy";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repositoy";
import { CommentOnQuestionService } from "./comment-on-question";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionService;

describe("Comment On Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionService(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: "Comentario Teste",
    });

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      "Comentario Teste"
    );
  });
});
