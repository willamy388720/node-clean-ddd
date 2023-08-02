import { CreateQuestionService } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repositoy";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionService;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionService(inMemoryQuestionRepository);
  });

  it("should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "Nova pergunta",
      content: "Conteudo da pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id);
  });
});
