/* eslint-env mocha */
import toSnakeCase from '../src/to-snake-case'
import { assert } from 'chai'

describe('snakeCase function tests', () => {
  it('converts the object\'s properties to snakeCase', () => {
    const hookFunction = toSnakeCase('birthDate')
    const hook = {
      type: 'before',
      params: {
        query: {
          $select: ['id', 'lastName'],
          id: 2,
          $limit: 10,
          middle_name: 'Heisenberg',
          lastName: 'Walter',
          birthDate: '12/12/1630',
          $sort: {
            first_name: 'White',
            lastName: 'Walter'
          }
        }
      }
    }

    const result = hookFunction(hook)

    // Successfully converted to snake case
    assert.equal(result.params.query.last_name, 'Walter')
    // Change $sort query
    assert.equal(result.params.query.$sort.last_name, 'Walter')
    // Change $select query
    assert.equal(result.params.query.$select[1], 'last_name')
    // Stay unmodified
    assert.equal(result.params.query.id, 2)
    assert.equal(result.params.query.middle_name, 'Heisenberg')
    // reserved query word must be unmodified
    assert.equal(result.params.query.$limit, 10)
    // Except
    assert.equal(result.params.query.birthDate, '12/12/1630')
  })
  it('throws an error when used not as a before hook.', () => {
    const hookFunction = toSnakeCase()
    const hook = {
      type: 'after'
    }

    assert.throws(hookFunction.bind(undefined, hook), '"snakeCase" must be used in before hook only.')
  })
})
