import {
  primaryColor,
  dangerColor,
  successColor
} from "assets/jss/material-react.js";

const customHelperStyle = {
  helperFocused: {
    //...defaultFont,
    color: primaryColor[0] + " !important",
    //fontWeight: "400",
    //fontSize: "14px",
    lineHeight: "1.42857"
  },
  helperRoot: {
    //...defaultFont,
    fontWeight: "bold",
    //color: grayColor[3] + " !important",
    //color: primaryColor[0] + " !important",
    //fontWeight: "400",
    //fontSize: "14px",
    lineHeight: "1.42857"
  },
  helperRootError: {
    color: dangerColor[0] + " !important"
  },
  helperRootSuccess: {
    color: successColor[0]
  }
};

export default customHelperStyle;
