import { Component as SceneComponent } from "./types";

const RELATI_SCENES: SceneComponent[] = [
    require("./RelatiScene1"),
    require("./RelatiScene2"),
    require("./RelatiScene3"),
    require("./RelatiScene4"),
    require("./RelatiScene5"),
    require("./RelatiScene6"),
    require("./RelatiScene7"),
    require("./RelatiScene8"),
    require("./RelatiScene9"),
    require("./RelatiScene10"),
    require("./RelatiScene11"),
    require("./RelatiScene12"),
].map(module => module.default);

export default RELATI_SCENES;
