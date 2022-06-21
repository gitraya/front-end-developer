import "./Input.css";

const Input = ({
  id,
  label,
  size,
  error,
  helperText,
  fullWidth,
  startIcon,
  endIcon,
  multiline,
  row,
  ...props
}) => {
  // Class of input component
  const controlClass = `input-control ${error ? "error" : ""} ${
    startIcon ? "input-icon" : ""
  } ${fullWidth ? "fullWidth" : ""}`;
  const iconClass = `icon ${startIcon ? "startIcon" : ""} ${
    endIcon ? "endIcon" : ""
  }`;

  const multilineRowStyle = {
    height: `${multiline ? `${parseInt(row) * 37.5}px` : "initial"}`,
  };

  // Check size prop
  switch (size) {
    case "sm":
      size = { padding: "10px 12px", width: "200px" };
      break;
    case "md":
      size = { padding: "18px 12px", width: "200px" };
      break;
    default:
      size = { padding: "18px 12px", width: "200px" };
      break;
  }

  // Component html
  return (
    <div className={controlClass}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="input-wrap">
        {startIcon && <i className={iconClass}>{startIcon}</i>}
        {multiline ? (
          <textarea
            {...props}
            className={`input ${props.className}`}
            style={{ ...size, ...multilineRowStyle }}
          ></textarea>
        ) : (
          <input
            {...props}
            className={`input ${props.className}`}
            style={size}
          />
        )}
        {endIcon && <i className={iconClass}>{endIcon}</i>}
      </div>
      <small className="helperText">{helperText}</small>
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
