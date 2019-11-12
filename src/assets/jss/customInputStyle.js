import {
  primaryColor,
  dangerColor,
  successColor,
  grayColor,
  defaultFont
} from "assets/jss/material-react.js";

const customInputStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    },
    cursor: "not-allowed"
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: grayColor[4] + " !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: primaryColor[0]
    }
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor[0]
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: primaryColor[0]
    }
  },
  labelFocused: {
    ...defaultFont,
    color: primaryColor[0] + " !important",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "1.42857"
  },
  labelRoot: {
    ...defaultFont,
    //fontWeight: "bold",
    //color: grayColor[3] + " !important",
    //color: primaryColor[0] + " !important",
    //fontWeight: "400",
    fontSize: "16px",
    lineHeight: "1.42857"
  },
  labelRootError: {
    color: dangerColor[0] + " !important"
  },
  labelRootSuccess: {
    color: primaryColor[0]
  },
  feedback: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none"
  },
  marginTop: {
    marginTop: "16px"
  },
  formControl: {
    paddingBottom: "10px",
    margin: "10px 0 0 0",
    position: "relative",
    verticalAlign: "unset"
  },
  textOver: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
};

export default customInputStyle;
