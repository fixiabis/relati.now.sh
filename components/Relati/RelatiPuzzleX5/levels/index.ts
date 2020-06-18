import { LevelComponent } from "./types";

const RelatiLevels: Record<string, LevelComponent> = {
    "1": require("./RelatiLevel1").default,
    "2": require("./RelatiLevel2").default,
};

export default RelatiLevels;
