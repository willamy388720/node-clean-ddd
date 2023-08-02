import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repositoy";
import { makeAnswer } from "test/factories/make-answer";
import { FetchRecentAnswersService } from "./fetch-recent-answers";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: FetchRecentAnswersService;

describe("Fetch Recent Answers", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new FetchRecentAnswersService(inMemoryAnswerRepository);
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") })
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") })
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") })
    );

    const result = await sut.execute({
      page: 1,
      questionId: "question-1",
    });

    expect(result.value?.answers).toHaveLength(3);
  });

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityId("question-1") })
      );
    }

    const result = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(result.value?.answers).toHaveLength(2);
  });
});
