import React, { useEffect, useRef, useState } from "react";

// Libraries
import { Layer, Stage, Image } from "react-konva";
import useImage from "use-image";

// Components
import CustomImage from "./CustomImage";
import CustomText from "./CustomText";
import { FramesContext, useFrames } from "../store/contexts/frames.context";

// Utils
import { CONTROLLER_ACTIONS } from "../store/actions/controller.action";
import { CANVAS_ACTIONS } from "../store/actions/frames.action";

const Canvas = () => {
  const [frame1] = useImage(
    "https://homologacao.fqmgrupo.com.br/bancodeimagens/images/figbaseprint.png"
  );
  const [state, dispatch] = useFrames();

  /**
   * Okay so we have removed the imageDetails variables and
   * shifted it to a state. Not only this but also we have added
   * 2 new properties of scale defaulted to 1 which would determine
   * the size of our shape/element and id.
   *
   * In addition to that we have also created a new state called
   * selectedElement. This element stores an id or unique field which
   * showcases which element is currently selected.
   */
  const [selectedElement, setSelectedElement] = useState(null);

  /**
   * A list of objects containing the various details that we
   * would require for all the different elements.
   *
   * It is better to separate them now as we will be shifting
   * them to their global states later
   */
  const stageRef = useRef();
  const stageDetails = state.stageDetails;
  const textDetails = state.textDetails;

  const onSelect = (id) => {
    if (selectedElement === id) {
      setSelectedElement(null);
    } else {
      setSelectedElement(id);
    }
  };

  useEffect(() => {
    if (stageRef) {
      dispatch({
        type: CANVAS_ACTIONS.UPDATE_STAGE_REF,
        payload: stageRef,
      });
    }
  }, [stageRef, dispatch]);

  return (
    <FramesContext.Consumer>
      {(value) => (
        <Stage
          ref={stageRef}
          width={stageDetails.width}
          height={stageDetails.height}
          style={{ position: "relative" }}
        >
          <FramesContext.Provider value={value}>
            <Layer>
              {state.imageDetails.image && (
                <CustomImage
                  isSelected={selectedElement === state.imageDetails.id}
                  onSelect={() => onSelect(state.imageDetails.id)}
                />
              )}

              <Image
                image={frame1}
                width={stageDetails.width}
                height={stageDetails.height}
                x={0}
                y={0}
                style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
                listening={false}
                onSelect={() => onSelect(null)}
              />
            </Layer>
          </FramesContext.Provider>
        </Stage>
      )}
    </FramesContext.Consumer>
  );
};

export default Canvas;
