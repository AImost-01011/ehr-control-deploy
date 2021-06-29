const isHira = (str: string) => {
  str = str == null ? "" : str;
  if (str.match(/^[ぁ-んー　]*$/)) {
    //"ー"の後ろの文字は全角スペースです。
    return true;
  } else {
    return false;
  }
};

export default isHira;
