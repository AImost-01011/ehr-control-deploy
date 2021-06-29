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
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { RootState } from "../../../../redux/store";
import { deleteNotice } from "../../../../redux/oneMiSlice";

type deleteDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  update: number;
};

const DeleteDialog: React.FC<deleteDialogProps> = ({
  isOpen,
  setIsOpen,
  update,
}) => {
  //dialog controler
  const [isLoading, setIsLoading] = useState("none");
  const [isSent, setIsSent] = useState(false);

  //redux
  const dispatch = useDispatch();
  const miSelector = useSelector((state: RootState) => state.oneMi);

  useEffect(() => {
    if (miSelector.loading) {
      setIsLoading("flex");
    } else {
      isSent ? setIsOpen(false) : null;
      setIsLoading("none");
    }

    return () => {
      setIsLoading("none");
    };
  }, [miSelector.loading]);

  const backClick = () => {
    if (isLoading === "none") setIsOpen(false);
  };

  const deleteClick = () => {
    setIsLoading("flex");
    setIsSent(() => true);

    dispatch(deleteNotice({ update: update, oriId_m: miSelector.oriId_m }));
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle style={{ color: "#d70035" }}>
        本当に削除しますか？
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" color="textSecondary">
          お知らせを削除したあとに復元することはできません。
        </Typography>
      </DialogContent>

      <DialogActions>
        <Box
          width="240px"
          display={isLoading}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CircularProgress color="secondary" size={30} />
          <Typography variant="body1" color="secondary">
            お知らせを削除しています
          </Typography>
        </Box>

        <Button variant="outlined" onClick={backClick}>
          やめる
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={deleteClick}
        >
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
