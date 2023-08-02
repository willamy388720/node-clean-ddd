import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repositoy";
import { makeAnswer } from "test/factories/make-answer";
import { DeleteAnswerService } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerService;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerService(inMemoryAnswerRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: "answer-1",
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        answerId: "answer-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
