import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Paper, MenuItem, FormLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { fetchStaff, searchStaff } from "../../../redux/staffSlice";
import { RootState } from "../../../redux/store";

const StaffSearchbar: React.FC = () => {
  const [searchCategory, setSearchCategory] = useState("staffName");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const miSelector = useSelector((state: RootState) => state.oneMi);

  const categoryChange: (
    e: React.ChangeEvent<{
      name?: string;
      value: string;
    }>,
    child: React.ReactNode
  ) => void = (e) => {
    setSearchCategory(e.target.value);
  };

  const searchChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      dispatch(fetchStaff(miSelector.oriId_m));
    } else {
      dispatch(
        searchStaff({
          search: e.target.value,
          searchCategory: searchCategory,
          oriId_m: miSelector.oriId_m,
        })
      );
    }
  };

  return (
    <Box marginY="10px">
      <Paper>
        <Box
          paddingX="8px"
          paddingY="4px"
          marginTop="10px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box marginX="10px">
            <FormControl variant="outlined" size="small">
              <FormLabel>検索条件</FormLabel>

              <Select defaultValue="staffName" onChange={categoryChange}>
                <MenuItem value="staffName">名前</MenuItem>
                <MenuItem value="role">役割</MenuItem>
                <MenuItem value="message">伝言</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box marginTop="16px" width="100%">
            <TextField
              id=""
              label="スタッフの検索"
              variant="outlined"
              fullWidth
              size="small"
              value={search}
              onChange={searchChange}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StaffSearchbar;
