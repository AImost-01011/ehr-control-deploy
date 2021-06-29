import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import { Tabs, Tab, Divider } from "@material-ui/core";
import { List } from "@material-ui/core";

import OneNotice from "./OneNotice";
import { RootState } from "../../../redux/store";

const NoticeList: React.FC = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const [tabHeader, setTabHeader] = useState<JSX.Element[]>([]);
  const [tabList, setTabList] = useState<JSX.Element[]>([]);

  const miSelector = useSelector((state: RootState) => state.oneMi);

  // const testArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  useEffect(() => {
    setTabHeader(() => []);
    setTabList(() => []);

    //tab header
    const tabs = Math.ceil(miSelector.notice_m.length / 6);

    for (let i = 0; i < tabs; i++) {
      setTabHeader((prevProps) => [
        ...prevProps,
        <Tab label={`${i + 1}`} key={i} />,
      ]);
    }

    //tab list
    const firstIndex = pageIndex * 6;
    const noticeData = miSelector.notice_m.slice().sort((a, b) => {
      return b.update - a.update;
    });
    for (let i = firstIndex; i < firstIndex + 6; i++) {
      const target = noticeData[i];
      if (target) {
        setTabList((prevProps) => [
          ...prevProps,
          <OneNotice
            title={target.title}
            content={target.content}
            update={target.update}
            key={i}
          />,
        ]);
      }
    }
  }, [pageIndex, miSelector.notice_m]);

  const tabChange: (e: React.ChangeEvent<{}>, value: any) => void = (
    e,
    value
  ) => {
    setPageIndex(value);
  };

  return (
    <Box>
      <Tabs
        value={pageIndex}
        variant="scrollable"
        scrollButtons="auto"
        onChange={tabChange}
        indicatorColor="primary"
      >
        {tabHeader}
      </Tabs>

      <Divider />

      <List>{tabList}</List>
    </Box>
  );
};

export default NoticeList;
