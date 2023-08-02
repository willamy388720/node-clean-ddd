import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositoy";
import { makeQuestion } from "test/factories/make-question";
import { EditQuestionService } from "./edit-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: EditQuestionService;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionService(inMemoryQuestionRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: newQuestion.id.toValue(),
      title: "Pergunta Teste",
      content: "Conteudo Teste",
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: "Pergunta Teste",
      content: "Conteudo Teste",
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        questionId: newQuestion.id.toValue(),
        title: "Pergunta Teste",
        content: "Conteudo Teste",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
