import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repositoy";
import { AnswerQuestionService } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionService;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionService(inMemoryAnswersRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Conteudo da pergunta",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
  });
});
