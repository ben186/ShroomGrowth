import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ShroomModel, ShroomSnapshot } from "../shroom/shroom"

/**
 * Model description here for TypeScript hints.
 */
export const ShroomStoreModel = types
  .model("ShroomStore")
  .props({
    shrooms: types.optional(types.array(ShroomModel), [])
  })
  .views((self) => ({
    sortByDate: () => {
      return self.shrooms.slice().sort((a, b) => b.createdAt - a.createdAt);
    }
  }))
  .actions((self) => ({
    add: (shroomSnapshot: ShroomSnapshot) => {
      self.shrooms.push(shroomSnapshot);
    },
    remove: (shroomSnapshot: ShroomSnapshot) => {
      self.shrooms.remove(shroomSnapshot);
    },
    clear: () => {
      self.shrooms.clear();
    }
  }));

type ShroomStoreType = Instance<typeof ShroomStoreModel>
export interface ShroomStore extends ShroomStoreType {}
type ShroomStoreSnapshotType = SnapshotOut<typeof ShroomStoreModel>
export interface ShroomStoreSnapshot extends ShroomStoreSnapshotType {}
export const createShroomStoreDefaultModel = () => types.optional(ShroomStoreModel, {})
