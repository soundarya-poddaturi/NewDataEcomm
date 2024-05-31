import React, { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
 
const MultiThumbSlider = ({
  min,
  max,
  step,
  initialMinValue,
  initialMaxValue,
  onChange,
}) => {
  const [values, setValues] = useState([
    initialMinValue || min,
    initialMaxValue || max,
  ]);
 
  useEffect(() => {
    // Ensure values are sorted and within bounds
    if (initialMinValue && initialMaxValue) {
      const sortedValues = [
        Math.max(min, initialMinValue),
        Math.min(max, initialMaxValue),
      ];
      setValues(sortedValues.sort((a, b) => a - b));
    }
  }, [min, max, initialMinValue, initialMaxValue]);
 
  const handleChange = (values) => {
    setValues(values);
    onChange(values);
  };
 
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "2em 0",
      }}
    >
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "80%", // Adjusted width
              maxWidth: "800px", // Added max width
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#2b2f32", "#ccc"],
                  min,
                  max,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "50%",
              backgroundColor: "#212529",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "gray",
              }}
            >
              ${values[index]}
            </div>
          </div>
        )}
      />
    </div>
  );
};
 
export default MultiThumbSlider;
