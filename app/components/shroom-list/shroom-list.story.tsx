import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { ShroomList } from "./shroom-list"
import { ShroomModel } from "../../models"

storiesOf("ShroomList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Behavior", () => (
    <Story>
      <UseCase text="Normal">
        <ShroomList style={{ backgroundColor: color.primary }} data={[ShroomModel.create({id: "hello", name: "RESULT", createdAt: Date.now()})]}/>
      </UseCase>
    </Story>
  ))
