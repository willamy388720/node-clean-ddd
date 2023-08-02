import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repositoy";
import { makeAnswer } from "test/factories/make-answer";
import { EditAnswerService } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerService;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerService(inMemoryAnswerRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toValue(),
      content: "Conteudo Teste",
    });

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: "Conteudo Teste",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        answerId: newAnswer.id.toValue(),
        content: "Conteudo Teste",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
