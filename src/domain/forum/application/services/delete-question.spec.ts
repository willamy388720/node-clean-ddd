import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositoy";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionService } from "./delete-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionService;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionService(inMemoryQuestionRepository);
  });

  it("should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: "question-1",
    });

    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        questionId: "question-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
