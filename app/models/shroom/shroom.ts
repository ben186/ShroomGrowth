import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ShroomModel = types
  .model("Shroom")
  .props({
    id: types.identifier,
    name: types.maybe(types.string),
    uri: types.maybe(types.string),
    day: types.maybe(types.integer),
    contaminated: types.maybe(types.boolean),
    createdAt: types.maybe(types.integer),
    updatedAt: types.maybe(types.integer)
  })

type ShroomType = Instance<typeof ShroomModel>
export interface Shroom extends ShroomType {}
type ShroomSnapshotType = SnapshotOut<typeof ShroomModel>
export interface ShroomSnapshot extends ShroomSnapshotType {}
export const createShroomDefaultModel = () => types.optional(ShroomModel, {})
