import React from "react";
import Link from "next/link";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const ControlAppbar: React.FC = () => {
  return (
    <Box bgcolor="primary.main" width="100%" paddingY="8px" paddingX="16px">
      <Link href="/control">
        <Typography variant="h5" style={{ color: "white" }}>
          EHR Control
        </Typography>
      </Link>
    </Box>
  );
};

export default ControlAppbar;
