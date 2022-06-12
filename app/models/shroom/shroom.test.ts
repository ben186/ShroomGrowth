import { ShroomModel } from "./shroom"

test("can be created", () => {
  const instance = ShroomModel.create({})

  expect(instance).toBeTruthy()
})
