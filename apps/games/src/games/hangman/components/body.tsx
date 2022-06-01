import { Flex } from "@chakra-ui/react";
import { getStageOfBody } from "../data/hangman-stages";

type BodyProperties = {
  stage: number;
};

const Body = ({ stage }: BodyProperties): JSX.Element => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      my={2}
      height={[160, 220]}
    >
      <svg
        viewBox="0 0 118 200"
        height="100%"
        width="100%"
        style={{
          filter: "drop-shadow(0px 4px 6px rgba(33, 33, 33, 0.1))"
        }}
      >
        {/* Frame */}
        <path
          stroke="rgba(0, 0, 0, 0.80)"
          strokeWidth={6}
          d="M0 197h118m-103 2V0m55 0v40M13 3h59"
        />
        {/* Body */}
        {getStageOfBody(stage)}
      </svg>
    </Flex>
  );
};

export default Body;
