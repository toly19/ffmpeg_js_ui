import React from "react";
import { assocPath, curry } from "ramda";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { CommandArgumentsInterface } from "libs/ffmpeg/useCommand";

interface CommandChildComponentWrapperInterface {
  label: string;
  node: any;
  children: () => React.ReactNode;
  enable: () => void;
  disable: () => void;
}

export default React.memo(function({
  children,
  label,
  node,
  enable,
  disable,
}: CommandChildComponentWrapperInterface) {
  const checked = !!node;
  return (
    <Box display="flex" marginRight="18px" height="56px">
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={checked ? disable : enable} />
        }
        label={label}
      />
      {checked && children()}
    </Box>
  );
});

export const setCommandArgument = curry(function(
  path: (string | number)[],
  commandArguments: CommandArgumentsInterface,
  setArguments: (data: CommandArgumentsInterface) => void,
  data,
) {
  setArguments(assocPath(path, data, commandArguments));
});
