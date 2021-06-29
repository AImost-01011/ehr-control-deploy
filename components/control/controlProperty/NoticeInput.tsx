import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { addNotice } from "../../../redux/oneMiSlice";
import { RootState } from "../../../redux/store";

const NoticeInput: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const miSelector = useSelector((state: RootState) => state.oneMi);
  const dispatch = useDispatch();

  const titleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setTitle(e.target.value);
  };

  const contentChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setContent(e.target.value);
  };

  const noticeClick = () => {
    if (title && content) {
      dispatch(
        addNotice({
          title: title,
          content: content,
          oriId_m: miSelector.oriId_m,
        })
      );
      setTitle("");
      setContent("");
    } else {
      window.alert(
        "お知らせのタイトルとお知らせの内容は必須です。これらの欄を埋めてから追加してください。"
      );
    }
  };

  return (
    <Box width="100%" my="8px">
      <Box px="4px" py="8px" width="600px">
        <TextField
          label="お知らせのタイトル"
          value={title}
          onChange={titleChange}
          size="small"
          fullWidth
        />
      </Box>
      <FormControl size="small" fullWidth>
        <InputLabel variant="outlined">お知らせの内容</InputLabel>
        <OutlinedInput
          multiline
          label="お知らせの内容"
          value={content}
          onChange={contentChange}
          endAdornment={
            <InputAdornment position="end">
              <Button color="primary" variant="outlined" onClick={noticeClick}>
                追加
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default NoticeInput;
