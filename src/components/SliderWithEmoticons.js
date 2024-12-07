import React, { useState, useEffect } from "react";
import "./SliderWithEmoticons.css";

const SliderWithEmoticons = ({ onSave, initialValue }) => {
  const [value, setValue] = useState(Math.max(initialValue, 1));

  useEffect(() => {
    setValue(Math.max(initialValue, 1));
  }, [initialValue]);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(Math.max(newValue, 1));
  };

  const handleSave = () => {
    onSave(value);
  };

  const emoticons = [
    { range: [1, 20], icon: "😖", label: "Nunca a desenvolveria" },
    { range: [21, 40], icon: "😕", label: "Raramente eu a desenvolveria" },
    {
      range: [41, 60],
      icon: "🤔",
      label: "Tenho dúvidas se gostaria ou não de desenvolver esta atividade",
    },
    { range: [61, 80], icon: "🙂", label: "Algumas vezes desenvolveria" },
    { range: [81, 100], icon: "🤩", label: "Frequentemente desenvolveria" },
  ];

  const currentEmoticon = emoticons.find(
    ({ range }) => value >= range[0] && value <= range[1]
  );

  return (
    <div className="slider-container">
      <div className="emoticon-display">
        <span className="emoticon">{currentEmoticon.icon}</span>
        <p>{currentEmoticon.label}</p>
      </div>

      <input
        type="range"
        min="1"
        max="100"
        value={value}
        className="slider"
        onChange={handleChange}
        onMouseUp={handleSave}
      />
    </div>
  );
};

export default SliderWithEmoticons;
