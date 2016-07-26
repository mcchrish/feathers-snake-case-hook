/* eslint-env mocha */
import hooks from '../src'
import { assert } from 'chai'

describe('hook function tests', () => {
  it('has a toSnakeCase function', () => {
    assert.isFunction(hooks.toSnakeCase)
  })
})
