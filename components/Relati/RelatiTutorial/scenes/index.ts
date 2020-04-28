import { Component as SceneComponent } from "./types";

const RELATI_SCENES: Record<string, SceneComponent> = {
    "1": require("./RelatiScene1").default,
    "2": require("./RelatiScene2").default,
    "3": require("./RelatiScene3").default,
    "4": require("./RelatiScene4").default,
    "5": require("./RelatiScene5").default,
    "6": require("./RelatiScene6").default,
    "7": require("./RelatiScene7").default,
    "8": require("./RelatiScene8").default,
    "9": require("./RelatiScene9").default,
    "10": require("./RelatiScene10").default,
    "11": require("./RelatiScene11").default,
    "12A": require("./RelatiScene12A").default,
    "12B": require("./RelatiScene12B").default,
    "12C": require("./RelatiScene12C").default,
    "13A": require("./RelatiScene13A").default,
    "13B": require("./RelatiScene13B").default,
    "13C": require("./RelatiScene13C").default,
    "14A": require("./RelatiScene14A").default,
    "14B": require("./RelatiScene14B").default,
    "14C": require("./RelatiScene14C").default,
    "15A": require("./RelatiScene15A").default,
    "15B": require("./RelatiScene15B").default,
    "15C": require("./RelatiScene15C").default,
    "16A": require("./RelatiScene16A").default,
    "16B": require("./RelatiScene16B").default,
    "16C": require("./RelatiScene16C").default,
    "17A": require("./RelatiScene17A").default,
    "17B": require("./RelatiScene17B").default,
    "17C": require("./RelatiScene17C").default,
    "18B": require("./RelatiScene18B").default,
    "18C": require("./RelatiScene18C").default,
    "19B": require("./RelatiScene19B").default,
    "19C": require("./RelatiScene19C").default,
    "20B": require("./RelatiScene20B").default,
    "20C": require("./RelatiScene20C").default,
};

RELATI_SCENES["12"] = RELATI_SCENES["12A"];
RELATI_SCENES["13"] = RELATI_SCENES["13A"];
RELATI_SCENES["14"] = RELATI_SCENES["14A"];
RELATI_SCENES["15"] = RELATI_SCENES["15A"];

export default RELATI_SCENES;
