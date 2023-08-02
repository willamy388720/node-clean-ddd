import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repositoy";
import { DeleteAnswerCommentService } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentService;

describe("Delete Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentService(inMemoryAnswerCommentRepository);
  });

  it("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentRepository.create(answerComment);

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user answer comment", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId("author-1"),
    });

    await inMemoryAnswerCommentRepository.create(answerComment);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        answerCommentId: answerComment.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
