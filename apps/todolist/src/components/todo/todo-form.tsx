/**
 * TODO this needs an entire rework
 * TODO add label button to... add... labels... ( also add labels... also add sidebar to access labels )
 * TODO maybe add titles, this is probably a good idea
 * TODO make todos pinnable
 * TODO find better way to display dates on item and form
 * TODO find better way to show buttons on item and form ( probably at the bottom or in a horizontal menu )
 * TODO make todo length max 1000 characters on body and 200 on title
 * TODO probably should add like yup validation here or something
 * TODO add option to delete todo ( and a place to access them before deletion, this will probably require Firebase functions )
 * TODO make tasks draggable
 */

import {
  Box,
  Flex,
  Grid,
  IconButton,
  Textarea,
  Tooltip,
  Text,
  Button,
  useColorMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
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
import { colors, type Colors } from "@ibcarr/utils";
import { database } from "../../firebase";
import type { Toast } from "../../types";
import DatePicker from "./date-picker";

type TodoFormProperties = {
  user: User;
  toast: Toast;
};

const TodoForm = ({ user, toast }: TodoFormProperties): JSX.Element => {
  const { colorMode } = useColorMode();

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

    if (todoDate) todoToAdd.dueDate = todoDate;

    addDoc(collection(database, "todos"), todoToAdd).catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
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
      setTodoColor("gray");
      setTodoDate(undefined);
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
        position="relative"
      >
        <Textarea // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts
          placeholder="What is the task..."
          value={todoInput}
          onChange={handleTodoInputChange}
          rounded="md"
          // roundedBottom={todoDate ? 0 : 8}
          variant="filled"
          minH="9.5rem"
          shadow="md"
        />
        {/* {todoDate && (
          <Flex
            direction="row"
            align="stretch"
            bg={fromColorMode("gray.100", "whiteAlpha.50", colorMode)}
            p={2}
            px={4}
            rounded="md"
            roundedTop={0}
            shadow="md"
            justify="end"
          >
            <Text fontSize="sm">
              {todoDate.toLocaleDateString("en-GB", {
                dateStyle: "full"
              })}
            </Text>
          </Flex>
        )} */}
        {todoDate && (
          <Box
            position="absolute"
            bottom={4}
            right={4}
            bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
            padding={1}
            rounded="md"
          >
            <Text fontSize="sm">
              {todoDate.toLocaleDateString("en-GB", {
                dateStyle: "full"
              })}
            </Text>
          </Box>
        )}
      </Flex>
      <Flex
        bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
        p={2}
        rounded="md"
        shadow="md"
        direction="column"
        gridRowGap={2}
        justifyContent="space-between"
      >
        <Grid gridRowGap={2}>
          <Box>
            <DatePicker updateDate={handleTodoDateChange} date={todoDate} />
          </Box>
          {/* --> Color picker */}
          <Box>
            <Menu autoSelect={false} placement="bottom">
              <MenuButton
                as={IconButton}
                icon={getIconComponent("colorPicker")}
                colorScheme={todoColor}
              />
              <MenuList minW="min-content" border="none" p={0}>
                {colors.map((color) => (
                  <MenuItem
                    key={color}
                    as="div"
                    onClick={(): void => handleTodoColorClick(color)}
                    p={1}
                  >
                    <Button
                      colorScheme={color}
                      w={10}
                      h={10}
                      textTransform="capitalize"
                      position="relative"
                    >
                      {color.slice(0, 3)}
                    </Button>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
          {/* Color picker <-- */}
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
