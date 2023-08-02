import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repositoy";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repositoy";
import { CommentOnAnswerService } from "./comment-on-answer";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerService;

describe("Comment On Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerService(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: "Comentario Teste",
    });

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      "Comentario Teste"
    );
  });
});
