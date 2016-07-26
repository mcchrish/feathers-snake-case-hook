import { snakeCase } from 'lodash'

export default function toSnakeCase (...except) {
  const filters = ['$eager', '$search', '$select', '$limit', '$skip', '$populate', '$sort']
  const snakeFields = data => {
    for (let key of Object.keys(data)) {
      if (!except.includes(key) && !filters.includes(key)) {
        const snakedKey = snakeCase(key)
        data[snakedKey] = data[key]
        if (snakedKey !== key) {
          delete data[key]
        }
      }
    }
  }

  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error('"snakeCase" must be used in before hook only.')
    }

    // If no `params` or `query` specified
    if (!hook.params || !hook.params.query) {
      return hook
    }

    if (hook.params.query) {
      snakeFields(hook.params.query)
    }

    if (hook.params.query.$sort) {
      snakeFields(hook.params.query.$sort)
    }

    if (hook.params.query.$select) {
      hook.params.query.$select = hook.params.query.$select.map(col => {
        return snakeCase(col)
      })
    }
    return hook
  }
}
