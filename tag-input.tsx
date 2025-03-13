import { useState } from "react";
import { X } from "@phosphor-icons/react";

interface TagInputProps {
  title: string;
  description: string;
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagInput({ title, description, values, setValues }: TagInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const addTag = () => {
    const newTags = inputValue
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "" && !values.includes(tag));
  
    if (newTags.length > 0) {
      setValues([...values, ...newTags]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (value: string) => {
    setValues(values.filter((item) => item !== value));
  };

  return (
    <fieldset className="flex flex-row gap-8 justify-between items-start pb-8">
      <div className="flex flex-col w-1/3">
        <legend className="text-xl font-semibold text-base-content">{title}</legend>
        <label className="label">
          <span className="label-text">{description}</span>
        </label>
      </div>
      <div className="w-2/4">
        <div className="flex flex-wrap gap-2 p-2">
          {values.map((value, index) => (
            <div key={index} className="badge badge-lg badge-soft flex items-center gap-1">
              {value}
              <button onClick={() => removeTag(value)} className="ml-1 text-error cursor-pointer">
                <X size={12} />
              </button>
            </div>
          ))}
          <input
            type="text"
            className="input input-sm input-bordered w-full focus:outline-none"
            placeholder="Type values separated by commas (e.g., value1, value2, value3)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* Informative Helper Text */}
          <p className="text-xs text-gray-500 ml-auto">
            Press <span className="font-semibold">Enter</span> after typing values separated by commas.
          </p>
        </div>
      </div>
    </fieldset>
  );
}
