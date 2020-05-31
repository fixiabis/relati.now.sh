import { Box, Switch, Button, IconButton, Range, BoxProps } from "../../components";
import { SettingState } from "../../container/store";

export interface Props extends BoxProps {
  setting: SettingState;
  setPlacementEffect: (isOn: boolean) => void;
  setLastPieceEmphasized: (isOn: boolean) => void;
  setDrawLineEffectDuration: (duration: number) => void;
  setTutorialSceneDuration: (duration: number) => void;
  onReset: () => void;
  onClose: () => void;
}

const SettingBox = ({ show: isShow, setting, setPlacementEffect, setLastPieceEmphasized, setDrawLineEffectDuration, setTutorialSceneDuration, onReset: handleReset, onClose: handleClose }: Props) => {
  if (!isShow) {
    return <></>;
  }

  return (
    <Box className="setting">
      <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div>符號放置特效</div>
          <Switch value={setting.effect.placementEffect} onChange={setPlacementEffect} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div>強調最後符號</div>
          <Switch value={setting.effect.lastPieceEmphasized} onChange={setLastPieceEmphasized} />
        </div>
      </div>

      <div>連線特效速度({(setting.effect.drawLineDuration / 1000).toFixed(2)}秒)</div>

      <Range
        min={100}
        max={1000}
        value={setting.effect.drawLineDuration}
        onChange={setDrawLineEffectDuration} />

      <div>教學場景速度({(setting.tutorial.sceneDuration / 1000).toFixed(1)}秒)</div>

      <Range
        min={500}
        max={2000}
        value={setting.tutorial.sceneDuration}
        onChange={setTutorialSceneDuration} />

      <Button.Group className="no-animation">
        <IconButton type="retry" color="crimson" title="重設" onClick={handleReset} />
        <IconButton type="verify" color="seagreen" title="完成" onClick={handleClose} />
      </Button.Group>
    </Box>
  );
};

export default SettingBox;
