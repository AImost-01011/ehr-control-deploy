import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { oneMiData, oneMiType, oneStaffDataType } from "../globalType";

const initialState: oneMiType = {
  loading: false,
  error: false,
  errorMessage: "",

  miName: {
    name: "",
    hira: "",
  },
  oriId_m: "",
  email: "",
  location: {
    zip_m: "",
    address1_m: "",
    address2_m: "",
  },
  contact: {
    phone_m: "",
    fax_m: "",
    contactEmail: "",
  },
  businessContact: [],
  notice_m: [
    {
      title: "",
      update: 0,
      content: "",
    },
  ],
  department: [],
  reservation_m: [],
};

export const fetchMi = createAsyncThunk<any, any>(
  "oneMi/fetchMi",
  (email_m: string) => {
    const gotMi = axios
      .get(`/api/mi/read/${email_m}`)
      .then((result) => result.data)
      .catch((err) => err);

    return gotMi;
  }
);

export const addBusiness = createAsyncThunk<any, any>(
  "oneMi/addBusiness",
  (props: {
    with: string;
    speaker: string;
    content: string;
    oriId_m: string;
  }) => {
    return axios
      .post("/api/mi/update/businessMessage/add", {
        with: props.with,
        speaker: props.speaker,
        content: props.content,
        oriId_m: props.oriId_m,
      })
      .then((result) => result.data)
      .catch((err) => err);
  }
);

export const addNotice = createAsyncThunk<
  any,
  { title: string; content: string; oriId_m: string }
>("oneMi/addNotive", (props) => {
  return axios
    .post("/api/mi/update/notice/add", {
      title: props.title,
      content: props.content,
      oriId_m: props.oriId_m,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

export const changeNotice = createAsyncThunk<
  any,
  { title: string; content: string; update: number; oriId_m: string }
>("oneMi/changeNotice", (props) => {
  return axios
    .post("/api/mi/update/notice/change", {
      title: props.title,
      content: props.content,
      oriId_m: props.oriId_m,
      update: props.update,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

export const deleteNotice = createAsyncThunk<
  any,
  { oriId_m: string; update: number }
>("oneMi/deleteNotice", (props) => {
  return axios
    .post("/api/mi/update/notice/delete", {
      oriId_m: props.oriId_m,
      update: props.update,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

export const changeMiInfo = createAsyncThunk<
  any,
  {
    miName: string;
    miHira: string;
    zip_m: string;
    address1_m: string;
    address2_m: string;
    phone_m: string;
    fax_m: string;
    contactEmail: string;
    oriId_m: string;
    department: string[];
  }
>("oneMi/changeMiInfo", (props) => {
  return axios
    .post("/api/mi/update/miInfo", {
      miName: props.miName,
      miHira: props.miHira,
      zip_m: props.zip_m,
      address1_m: props.address1_m,
      address2_m: props.address2_m,
      phone_m: props.phone_m,
      fax_m: props.fax_m,
      contactEmail: props.contactEmail,
      oriId_m: props.oriId_m,
      department: props.department,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

const oneMiSlice = createSlice({
  name: "oneMi",
  initialState: initialState,
  reducers: {
    serversideData(state, action: PayloadAction<oneMiData>) {
      Object.assign(state, { ...action.payload });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMi.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      fetchMi.fulfilled,
      (state, action: PayloadAction<oneMiData>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(fetchMi.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(addBusiness.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      addBusiness.fulfilled,
      (state, action: PayloadAction<oneStaffDataType>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(addBusiness.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(addNotice.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      addNotice.fulfilled,
      (state, action: PayloadAction<oneMiData>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(addNotice.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(changeNotice.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      changeNotice.fulfilled,
      (state, action: PayloadAction<oneMiData>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(changeNotice.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(deleteNotice.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      deleteNotice.fulfilled,
      (state, action: PayloadAction<oneMiData>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(deleteNotice.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(changeMiInfo.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      changeMiInfo.fulfilled,
      (state, action: PayloadAction<oneMiData>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(changeMiInfo.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });
  },
});

export const { serversideData } = oneMiSlice.actions;

export const oneMiReducer = oneMiSlice.reducer;
