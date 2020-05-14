import { SceneComponent } from "./types";

const RelatiScenes: Record<string, SceneComponent> = {
    "1": require("./RelatiScene1").default,
    "2": require("./RelatiScene2").default,
    "3": require("./RelatiScene3").default,
    "4": require("./RelatiScene4").default,
    "5": require("./RelatiScene5").default,
    "6": require("./RelatiScene6").default,
};

export default RelatiScenes;
