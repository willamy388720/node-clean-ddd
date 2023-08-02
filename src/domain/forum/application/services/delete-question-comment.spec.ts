import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repositoy";
import { DeleteQuestionCommentService } from "./delete-question-comment";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentService;

describe("Delete Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentService(inMemoryQuestionCommentRepository);
  });

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentRepository.create(questionComment);

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    });

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user question comment", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId("author-1"),
    });

    await inMemoryQuestionCommentRepository.create(questionComment);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        questionCommentId: questionComment.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
