import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
};

class CustomTooltip extends React.Component {
    render() {
        const { classes, handleClickOpen, loginInfo } = this.props;

        return (
            <>
                <Tooltip
                    disableFocusListener={true}
                    title="사용자 추가">
                    <IconButton onClick={handleClickOpen}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    }
}

export default (withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomTooltip));
