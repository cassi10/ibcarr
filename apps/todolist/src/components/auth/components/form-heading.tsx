import { Heading } from "@chakra-ui/react";

type FormHeadingProperties = {
  children: string;
};

const FormHeading = ({ children }: FormHeadingProperties): JSX.Element => (
  <Heading size="md" alignSelf="flex-start" my={2}>
    {children}
  </Heading>
);

export default FormHeading;
