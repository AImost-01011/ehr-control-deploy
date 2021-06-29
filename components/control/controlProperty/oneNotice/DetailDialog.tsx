import React from "react";
import { format } from "date-fns";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

type deleteDialogProps = {
  title: string;
  content: string;
  update: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailDialog: React.FC<deleteDialogProps> = ({
  isOpen,
  setIsOpen,
  title,
  content,
  update,
}) => {
  const backClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs={9}>
            <Typography variant="h5" color="primary">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" color="textSecondary" align="right">
              {format(new Date(update), "yyyy年MM月dd日 HH:mm")}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Box maxHeight="600px" overflow="auto">
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {content}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={backClick}>
          もどる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailDialog;
