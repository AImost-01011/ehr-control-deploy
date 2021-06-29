import React, { useState } from "react";
import { format } from "date-fns";

import Box from "@material-ui/core/Box";
import { ListItem, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ReEditDialog from "./oneNotice/ReEditDialog";
import DeleteDialog from "./oneNotice/DeleteDialog";
import Grid from "@material-ui/core/Grid";
import DetailDialog from "./oneNotice/DetailDialog";

type oneNoticeProps = {
  title: string;
  content: string;
  update: number;
};

const OneNotice: React.FC<oneNoticeProps> = ({ title, content, update }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [reEditOpen, setReEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDetail = () => {
    setDetailOpen(true);
  };

  const openReEdit = () => {
    setReEditOpen(true);
  };

  const openDelete = () => {
    setDeleteOpen(true);
  };

  return (
    <>
      <ListItem divider>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box width="calc(100% - 148px - 16px)" mx="8px">
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <div
                  onClick={openDetail}
                  style={{ textOverflow: "ellipsis", cursor: "pointer" }}
                >
                  <Typography variant="h6" color="primary" noWrap>
                    {title}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                  {format(new Date(update), "yyyy年MM月dd日")}
                </Typography>
              </Grid>
            </Grid>

            <Box style={{ textOverflow: "ellipsis" }}>
              <Typography variant="body1" noWrap>
                {content}
              </Typography>
            </Box>
          </Box>

          <Box width="148px" display="flex" justifyContent="space-between">
            <Button color="primary" variant="outlined" onClick={openReEdit}>
              再編集
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={openDelete}
            >
              削除
            </Button>
          </Box>
        </Box>
      </ListItem>

      <DetailDialog
        isOpen={detailOpen}
        setIsOpen={setDetailOpen}
        title={title}
        content={content}
        update={update}
      />

      <ReEditDialog
        isOpen={reEditOpen}
        setIsOpen={setReEditOpen}
        title={title}
        content={content}
        update={update}
      />

      <DeleteDialog
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
        update={update}
      />
    </>
  );
};

export default OneNotice;
