import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById: (questionCommentId: string) => Promise<QuestionComment | null>
  create: (questionComment: QuestionComment) => Promise<void>
  delete: (questionCommentId: QuestionComment) => Promise<void>
  findManyByQuestionId: (
    questionId: string,
    params: PaginationParams,
  ) => Promise<QuestionComment[]>
  // findByQuestionId: (questionId: string) => Promise<QuestionComment[]>
  // save: (questionComment: QuestionComment) => Promise<void>
}
