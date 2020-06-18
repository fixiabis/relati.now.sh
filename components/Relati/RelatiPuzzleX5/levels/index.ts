import { LevelComponent } from "./types";

const RelatiLevels: Record<string, LevelComponent> = {
    "1": require("./RelatiLevel1").default,
    "2": require("./RelatiLevel2").default,
    "3": require("./RelatiLevel3").default,
    "4": require("./RelatiLevel4").default,
    "5": require("./RelatiLevel5").default,
};

export default RelatiLevels;
