import React from "react";
import "./Dropdown.css";

export default class Dropdown extends React.Component {
    render () {
        const { id, label, value, onChange, error, options } = this.props;
        return(
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                >
                    <option value="">--</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        )
    }
};