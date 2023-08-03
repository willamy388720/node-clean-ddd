import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repositoy";
import { makeAnswer } from "test/factories/make-answer";
import { DeleteAnswerService } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";
import { makeAnswerAttachment } from "test/factories/make-answer-attachment";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;

let sut: DeleteAnswerService;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new DeleteAnswerService(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId("1"),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId("2"),
      })
    );

    await sut.execute({
      authorId: "author-1",
      answerId: "answer-1",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "author-2",
      answerId: "answer-1",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
