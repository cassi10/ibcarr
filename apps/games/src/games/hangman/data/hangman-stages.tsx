const color = "#F7FAFC";

const stages = [
  <g key="head">
    <circle cx="70" cy="46" r="16" fill={color} stroke={color} />
    <circle cx="64" cy="40" r="1.3" />
    <circle cx="76" cy="40" r="1.3" />
    <circle cx="70" cy="45" r="1" />
    <path d="M65 54q5-6 10 0" stroke="#000" fill="transparent" />
  </g>,
  <path key="torso" stroke={color} strokeWidth="3" d="M70 62v58" />,
  <path key="left-arm" stroke={color} strokeWidth="3" d="m70 80-20 20" />,
  <path key="right-arm" stroke={color} strokeWidth="3" d="m70 80 20 20" />,
  <path key="left-leg" stroke={color} strokeWidth="3" d="m70 120-20 30" />,
  <path key="right-leg" stroke={color} strokeWidth="3" d="m70 120 20 30" />,
  <path
    key="eye-crosses"
    d="m62 38 4 4m-4 0 4-4m8 0 4 4m-4 0 4-4"
    stroke="#000"
  />
];

const getStageOfBody = (stage: number): JSX.Element[] =>
  stages.filter((value, index) => index <= stage);

export { getStageOfBody };

export default stages;
