interface ProgrammingLanguage {
  name: string;
  value: string;
}
const SelectBox = ({
  programmingLanguage,
  handleChangeLanguagesOption,
}: {
  programmingLanguage: ProgrammingLanguage[];
  handleChangeLanguagesOption: (value: string) => void;
}) => {
  return (
    <div>
      <select
        className="select select-bordered select-xs h-8 max-w-xs"
        onChange={(e) => handleChangeLanguagesOption(e.target.value)}
      >
        {programmingLanguage.map((lang) => (
          <option
            selected={lang.value === "c_cpp"}
            key={lang.name}
            value={lang.value}
          >
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
