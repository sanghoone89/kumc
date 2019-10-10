import palette from '../palette';

export default {
  root: {
    fontFamily: "'Noto Sans KR', sans-serif",
    '&$selected': {
      backgroundColor: palette.background.default
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.background.default
      }
    }
  }
};
