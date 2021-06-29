import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

type mulInputProps = {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  variant: "outlined" | "filled" | "standard";
  hint?: string;
};

////////////////////////////////////////////////////
//initial value should be [""] or ["","","", ...] //
//should not pass [] (empty array)                //
////////////////////////////////////////////////////

const MulInput: React.FC<mulInputProps> = ({
  value,
  setValue,
  label,
  variant,
  hint,
}) => {
  // const [valueIndex, setValueIndex] = useState<number[]>([]);
  const [inputList, setInputList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setInputList(() => []);
    // setValueIndex(() => []);

    if (value.length) {
      for (let i = 0; i < value.length; i++) {
        // setValueIndex((prevState) => [...prevState, i]);

        if (i === 0) {
          setInputList((prevState) => [
            ...prevState,
            <Box key={0} width="calc(40% - 64px)" my="2px">
              <TextField
                id={`mul-${i}`}
                value={value[0]}
                fullWidth
                variant={variant}
                size="small"
                onChange={textChange}
                label={label}
              />
            </Box>,
          ]);
        } else {
          setInputList((prevState) => [
            ...prevState,
            <Box
              key={i}
              display="flex"
              flexDirection="row"
              width="40%"
              my="2px"
            >
              <TextField
                id={`mul-${i}`}
                value={value[i]}
                fullWidth
                variant={variant}
                size="small"
                onChange={textChange}
              />
              <Button
                value={i.toString()}
                onClick={deleteClick}
                variant="outlined"
              >
                ×
              </Button>
            </Box>,
          ]);
        }
      }
    } else {
      // setValueIndex((prevState) => [...prevState, 0]);
      setInputList((prevState) => [
        ...prevState,
        <Box key={0} width="40%" my="2px">
          <TextField
            id={`mul-0`}
            value={value[0]}
            fullWidth
            variant={variant}
            size="small"
            onChange={textChange}
          />
        </Box>,
      ]);
    }
  }, [value]);

  const textChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const targetIndex = Number(e.currentTarget.id.split("-")[1]);
    let valueArr = value;
    valueArr[targetIndex] = e.target.value;
    setValue(() => [...valueArr]);
  };

  const deleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    let target = value[Number(e.currentTarget.value)];
    let newArr = value.filter((el) => el !== target);

    setValue([...newArr]);
  };

  const addClick = () => {
    if (!value.includes("")) {
      setValue([...value, ""]);
    }
  };

  return (
    <Box display="flex" flexDirection="column" width="100%">
      {inputList}

      <Box>
        <Typography variant="body2" color="textSecondary">
          {hint}
        </Typography>
      </Box>

      <Box width="calc(40% - 64px)" my="2px">
        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addClick}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

export default MulInput;
