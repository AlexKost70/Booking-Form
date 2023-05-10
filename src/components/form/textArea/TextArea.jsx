import React from "react";
import "./TextArea.css";

export default class TextArea extends React.Component {
    render() {
        const {id, label, value, onChange} = this.props;
        return(
            <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
            />
            </div>
        )
    }
}