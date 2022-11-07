// CODE

import { expect, it } from "vitest"
import { z } from "zod"

const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.enum(['public', 'private'])
})

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values)

  return parsedData
}

// TESTS

it("Should fail if an invalid privacyLevel passed", async () => {
  expect(() =>
    validateFormInput({
      repoName: "lucas santos",
      privacyLevel: "something-not-allowed",
    }),
  ).toThrowError()
})

it("Should permit valid privacy levels", async () => {
  expect(
    validateFormInput({
      repoName: "lucas santos",
      privacyLevel: "private",
    }).privacyLevel,
  ).toEqual("private")

  expect(
    validateFormInput({
      repoName: "lucas santos",
      privacyLevel: "public",
    }).privacyLevel,
  ).toEqual("public")
})
