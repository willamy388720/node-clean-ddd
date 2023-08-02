import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repositoy";
import { FetchQuestionCommentsService } from "./fetch-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsService;

describe("Fetch Question Comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsService(inMemoryQuestionCommentsRepository);
  });

  it("should be able to fetch question comments", async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-1") })
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-1") })
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-1") })
    );

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: "question-1",
    });

    expect(questionComments).toHaveLength(3);
  });

  it("should be able to fetch paginated question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId("question-1") })
      );
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(questionComments).toHaveLength(2);
  });
});
