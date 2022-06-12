import { ShroomStoreModel } from "./shroom-store"

test("can be created", () => {
  const instance = ShroomStoreModel.create({})

  expect(instance).toBeTruthy()
})
