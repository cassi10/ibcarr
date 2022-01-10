import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  ColorMode,
  Flex,
  Grid,
  IconButton,
  Textarea,
  Tooltip,
  Text,
  Button
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp
} from "firebase/firestore";
import { useState } from "react";
import { getIconComponent, fromColorMode } from "@ibcarr/ui";
import { database } from "../firebase";
import { Colors, Toast } from "../types";
import DatePicker from "./date-picker";

interface ITodoFormProperties {
  user: User;
  toast: Toast;
  colorMode: ColorMode;
}

const TodoForm: React.FC<ITodoFormProperties> = ({
  user,
  toast,
  colorMode
}) => {
  const colors: Colors[] = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "cyan",
    "blue",
    "purple",
    "pink"
  ];

  const [todoInput, setTodoInput] = useState<string>("");
  const [todoColor, setTodoColor] = useState<Colors>("gray");
  const [todoDate, setTodoDate] = useState<Date | undefined>(undefined);

  const addTodoToFirestore = (): void => {
    const todoToAdd: {
      body: string;
      createdAt: FieldValue;
      updatedAt: FieldValue;
      color: Colors;
      ownerUID: string;
      dueDate?: Date;
    } = {
      body: todoInput.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      color: todoColor,
      ownerUID: user?.uid
    };

    if (todoDate) {
      todoToAdd.dueDate = todoDate;
    }

    addDoc(collection(database, "todos"), todoToAdd).catch((error) => {
      throw error;
    });
  };

  const handleTodoInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setTodoInput(event.target.value);

  const handleAddTodoClick = (): void => {
    if (!todoInput || todoInput.trim().length === 0) {
      if (toast.isActive("emptySubmittedTodo")) return;
      toast({
        id: "emptySubmittedTodo",
        title: "You cannot submit an empty todo.",
        status: "warning"
      });
    } else {
      addTodoToFirestore();

      setTodoInput("");
      // setTodoColor("gray");
      // setTodoDate(undefined);
    }
  };

  const handleTodoColorClick = (color: Colors): void => setTodoColor(color);

  const handleTodoDateChange = (date: Date | undefined): void =>
    setTodoDate(date);

  return (
    <Flex align="stretch" justify="center" direction="row" gridGap={3} mt={8}>
      <Flex
        align="stretch"
        justify="stretch"
        direction="column"
        w="100%"
        gridGap={0}
      >
        <Textarea
          placeholder="What is the task..."
          value={todoInput}
          onChange={handleTodoInputChange}
          rounded={8}
          roundedBottom={todoDate ? 0 : 8}
          variant="filled"
          minH={todoDate ? "112px" : "152px"}
        />
        {todoDate && (
          <Flex
            direction="row"
            align="stretch"
            bg={fromColorMode("gray.100", "whiteAlpha.50", colorMode)}
            p={2}
            px={4}
            rounded={8}
            roundedTop={0}
            boxShadow="md"
            justify="end"
          >
            <Text fontSize="sm">
              {todoDate.toLocaleDateString("en-GB", {
                dateStyle: "full"
              })}
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex
        bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
        p={2}
        rounded={8}
        boxShadow="md"
        direction="column"
        gridRowGap={2}
        justifyContent="space-between"
      >
        <Grid gridRowGap={2}>
          <Box>
            <DatePicker updateDate={handleTodoDateChange} date={todoDate} />
          </Box>
          <Accordion allowToggle border={0}>
            <AccordionItem border={0}>
              <Tooltip hasArrow label="Change color" placement="right">
                <AccordionButton
                  _expanded={{ marginBottom: "1rem" }}
                  as="div"
                  p={0}
                  m={0}
                >
                  <IconButton
                    aria-label="Change color"
                    icon={getIconComponent("colorPicker")}
                    colorScheme={todoColor}
                  />
                </AccordionButton>
              </Tooltip>
              <AccordionPanel p={0} m={0}>
                <Flex direction="column" gridGap={1}>
                  {colors.map((color) => (
                    <Tooltip
                      hasArrow
                      label={color}
                      placement="right"
                      key={color}
                      textTransform="capitalize"
                    >
                      <Button
                        colorScheme={color}
                        w={10}
                        h={10}
                        textTransform="capitalize"
                        onClick={(): void => handleTodoColorClick(color)}
                      >
                        {color.slice(0, 3)}
                      </Button>
                    </Tooltip>
                  ))}
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Grid>
        <Tooltip hasArrow label="Add todo" placement="right">
          <IconButton
            aria-label="Add todo"
            icon={getIconComponent("add")}
            colorScheme="green"
            onClick={handleAddTodoClick}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default TodoForm;
