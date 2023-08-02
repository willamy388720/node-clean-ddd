import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositoy";
import { GetQuestionBySlugService } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/values-objects/slug";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugService;

describe("Get Question By slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugService(inMemoryQuestionRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({ slug: Slug.create("example-question") });

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.value?.question.id).toBeTruthy();
  });
});
