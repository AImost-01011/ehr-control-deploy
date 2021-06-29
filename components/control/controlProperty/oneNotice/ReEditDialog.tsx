import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { RootState } from "../../../../redux/store";
import { changeNotice } from "../../../../redux/oneMiSlice";

type reEditDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  update: number;
};

const ReEditDialog: React.FC<reEditDialogProps> = ({
  isOpen,
  setIsOpen,
  title,
  content,
  update,
}) => {
  //data
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  //dialog controler
  const [isLoading, setIsLoading] = useState("none");
  const [isSent, setIsSent] = useState(false);

  //redux
  const miSelector = useSelector((state: RootState) => state.oneMi);
  const dispatch = useDispatch();

  //initial value
  useEffect(() => {
    setNewTitle(title);
    setNewContent(content);
  }, [isOpen]);

  //loading controler
  useEffect(() => {
    if (miSelector.loading) {
      setIsLoading("flex");
    } else {
      isSent ? setIsOpen(false) : null;
      setIsLoading("none");
    }
    return () => {
      setIsLoading("none");
      setNewTitle("");
      setNewContent("");
    };
  }, [miSelector.loading]);

  const backClick = () => {
    if (isLoading === "none") setIsOpen(false);
  };

  const changeClick = () => {
    setIsLoading("flex");

    dispatch(
      changeNotice({
        title: newTitle,
        content: newContent,
        update: update,
        oriId_m: miSelector.oriId_m,
      })
    );

    setIsSent(true);
  };

  const titleReChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setNewTitle(e.target.value);
  };

  const contentReChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setNewContent(e.target.value);
  };

  return (
    <Dialog open={isOpen} scroll="paper" fullWidth>
      <DialogTitle>お知らせの再編集</DialogTitle>
      <DialogContent>
        <Box px="4px" py="8px">
          <TextField
            label="お知らせのタイトル"
            size="small"
            value={newTitle}
            onChange={titleReChange}
          />
        </Box>

        <TextField
          variant="outlined"
          label="お知らせの内容"
          size="small"
          value={newContent}
          onChange={contentReChange}
          fullWidth
          multiline
        />
      </DialogContent>

      <DialogActions>
        <Box
          width="230px"
          display={isLoading}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mr="20px"
        >
          <CircularProgress size={30} />
          <Typography variant="body1" color="primary">
            お知らせを変更しています
          </Typography>
        </Box>

        <Button variant="outlined" onClick={backClick}>
          やめる
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={changeClick}
          disableElevation
        >
          変更
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReEditDialog;
