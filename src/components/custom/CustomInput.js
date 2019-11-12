import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import customInputStyle from "assets/jss/customInputStyle.js";
import { FormHelperText, TextField } from "@material-ui/core";
class CustomInput extends Component {
    render() {
        const {
            classes,
            formControlProps,
            labelText,
            id,
            labelProps,
            inputProps,
            helperProps,
            error,
            success,
            ref
        } = this.props;
        const labelClasses = classNames({
            [" " + classes.labelRootError]: error,
            [" " + classes.labelRootSuccess]: success && !error,
            [classes.focused]: true
        });
        const underlineClasses = classNames({
            [classes.underlineError]: error,
            [classes.underlineSuccess]: success && !error,
            [classes.underline]: true
        });
        const marginTop = classNames({
            [classes.marginTop]: labelText === undefined
        });

        return (
            <FormControl
                {...formControlProps}
                className={formControlProps.className + " " + classes.formControl}
            >
                {labelText !== undefined ? (
                    <InputLabel
                        classes={{
                            focused: classes.labelFocused
                        }}
                        className={classes.labelRoot + labelClasses}
                        htmlFor={id}
                        {...labelProps}
                    >
                        {labelText}
                    </InputLabel>
                ) : null}
                <Input
                    classes={{
                        root: marginTop,
                        disabled: classes.disabled,
                        underline: underlineClasses,
                        input: classes.textOver
                    }}
                    id={id}
                    {...inputProps}

                />
                {helperProps !== undefined ? (
                    <FormHelperText id={id} classes={{
                        root: classes.helperRoot,
                        focused: labelClasses
                    }}>
                        {helperProps.value}
                    </FormHelperText>

                ) : null}
                {error ? (
                    <Clear className={classes.feedback + " " + classes.labelRootError} />
                ) : success ? (
                    <Check
                        className={classes.feedback + " " + classes.labelRootSuccess}
                    />
                ) : null}
            </FormControl>
        );
    }
}

CustomInput.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
