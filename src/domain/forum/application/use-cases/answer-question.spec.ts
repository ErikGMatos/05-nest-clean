import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create a question‚', async () => {
    const result = await sut.execute({
      questionId: '1',
      authorId: 'author-id',
      content: 'Conteúdo da resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
      ],
    )
  })

  it('should persist attachments when creating a new attachment‚', async () => {
    const result = await sut.execute({
      questionId: '1',
      authorId: '1',
      content: 'Nova Pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryAnswerAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('2'),
        }),
      ]),
    )
  })
})
