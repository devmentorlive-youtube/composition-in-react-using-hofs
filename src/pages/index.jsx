import { useState, useRef, useEffect } from "react";

const FieldWithLabel = withErrors(withLabel(TextField));

export default function Homepage() {
  const [value, setValue] = useState("");

  return (
    <div className="mt-16 w-1/2 mx-auto">
      <FieldWithLabel
        value={value}
        onChange={setValue}
        placeholder="Some text here.."
        errors={["test error"]}>
        Label
      </FieldWithLabel>
    </div>
  );
}

function withLabel(Component) {
  return ({ children, ...rest }) => {
    const [clicked, setClicked] = useState(false);
    return (
      <div>
        <label
          onClick={() => {
            setClicked(true);
            setTimeout(() => setClicked(false), 1000);
          }}
          className="text-sm text-gray-800 font-medium">
          {children}
        </label>
        <Component focused={clicked} {...rest} />
      </div>
    );
  };
}

function withErrors(Component) {
  return ({ errors = [], ...rest }) => (
    <div>
      <Component {...rest} />
      <div className="text-red-500 text-sm font-thin px-1">
        {errors.join(", ")}
      </div>
    </div>
  );
}

function TextField({
  value,
  placeholder,
  focused = false,
  onChange = () => {},
}) {
  const ref = useRef(undefined);

  useEffect(() => {
    if (!focused || !ref.current) return;

    ref.current.focus();
  }, [focused]);

  return (
    <input
      ref={ref}
      value={value}
      type="text"
      placeholder={placeholder}
      className="border p-2 w-full placeholder:text-gray-400 text-gray-800 font-thin"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
