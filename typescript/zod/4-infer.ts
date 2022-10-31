// CODE
import { expect, it } from 'vitest'
import { z } from "zod"

const StarWarsPerson = z.object({
  name: z.string(),
})

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
})

const logStarWarsPeopleResults = (data: z.infer<typeof StarWarsPeopleResults>) => {
  data.results.map((person) => {
    console.log(person.name)
  })
}

it('should not have any test', () => {
  expect(true).toBe(true)
})
