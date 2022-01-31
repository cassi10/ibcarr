import { ListItem, Flex, Text, useColorMode } from "@chakra-ui/react";
import { fromColorMode } from "@ibcarr/ui";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Toast, Todo } from "../types";

type TodoItemProperties = {
  todo: QueryDocumentSnapshot<Todo>;
  toast: Toast;
};

const TodoItem = ({ todo, toast }: TodoItemProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { body, color, dueDate, createdAt, updatedAt } = todo.data();

  const [boxColors, setBoxColors] = useState({
    bg: fromColorMode("gray.100", "whiteAlpha.200", colorMode),
    color: fromColorMode("black", "whiteAlpha.900", colorMode)
  });

  useEffect(() => {
    const bgLightShade = (): "100" | "400" | "500" => {
      if (color === "gray") {
        return "100";
      }
      if (color === "yellow" || color === "cyan") {
        return "400";
      }
      return "500";
    };

    setBoxColors({
      bg: fromColorMode(
        `${color}.${bgLightShade()}`,
        `${color === "gray" ? "whiteAlpha" : color}.200`,
        colorMode
      ),
      color: fromColorMode(
        ["gray", "yellow", "cyan"].includes(color) ? "black" : "white",
        color === "gray" ? "whiteAlpha.900" : "gray.800",
        colorMode
      )
    });
  }, [colorMode, color]);

  return (
    <>
      <ListItem
        px={6}
        py={4}
        rounded="md"
        shadow="md"
        display="flex"
        alignItems="center"
        justifyContent="start"
        bg={boxColors.bg}
        color={boxColors.color}
      >
        {/* <Tooltip hasArrow label="Edit todo" placement="left">
            <IconButton
              alignSelf="start"
              aria-label="Edit todo"
              variant="solid"
              icon={getIconComponent("edit")}
              onClick={onOpen}
              colorScheme={color}
            />
          </Tooltip> */}
        <Flex
          direction="column"
          align="start"
          justify="start"
          gridGap={1}
          w="100%"
        >
          {dueDate && (
            <Text fontSize="sm">
              {dueDate.toDate().toLocaleDateString("en-GB", {
                dateStyle: "full"
              })}
            </Text>
          )}
          <Text fontSize="sm">
            Created:{" "}
            {createdAt.toDate().toLocaleString("en-GB", {
              dateStyle: "full",
              timeStyle: "full"
            })}
          </Text>
          <Text fontSize="sm">
            Updated:{" "}
            {updatedAt.toDate().toLocaleString("en-GB", {
              dateStyle: "full",
              timeStyle: "full"
            })}
          </Text>
          <Text
            cursor="text"
            overflowWrap="break-word"
            wordBreak="break-word"
            whiteSpace="break-spaces"
            w="100%"
          >
            {body}
          </Text>
        </Flex>
      </ListItem>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="5xl" minH="md">
          <ModalHeader>
            <Flex direction="row" justify="space-between" align="center">
              Edit Todo
              <IconButton
                aria-label="Close Modal"
                variant="ghost"
                icon={getIconComponent("close")}
                onClick={onClose}
              />
            </Flex>
          </ModalHeader>
          <ModalBody display="flex">
            <Flex
              flex={1}
              align="stretch"
              justify="center"
              direction="row"
              gridGap={3}
            >
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
                  rounded="md"
                  roundedBottom={todoDate ? 0 : 8}
                  variant="filled"
                  h="auto"
                  // fontFamily="monospace"
                  minH={todoDate ? "320px" : "360px"}
                  shadow={todoDate ? "none" : "md"}
                />
                {todoDate && (
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
                )}
              </Flex>
              <Flex
                bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
                p={2}
                rounded="md"
                shadow="md"
                direction="column"
                gridRowGap={2}
              >
                <Flex flex={1} gridRowGap={2} direction="column">
                  <DatePicker
                    updateDate={handleTodoDateChange}
                    date={todoDate}
                  />
                  <Accordion allowMultiple border={0}>
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
                          {colors.map((currentColor) => (
                            <Tooltip
                              hasArrow
                              label={currentColor}
                              placement="right"
                              key={currentColor}
                              textTransform="capitalize"
                            >
                              <Button
                                colorScheme={currentColor}
                                w={10}
                                h={10}
                                textTransform="capitalize"
                                onClick={(): void =>
                                  handleTodoColorClick(currentColor)
                                }
                              >
                                {currentColor.slice(0, 3)}
                              </Button>
                            </Tooltip>
                          ))}
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Flex>
                <Flex gridRowGap={2} direction="column">
                  <Tooltip hasArrow label="Update todo" placement="right">
                    <IconButton
                      aria-label="Update todo"
                      icon={getIconComponent("tick")}
                      colorScheme="green"
                      onClick={(): void => handleUpdateTodoClick(todo.id)}
                    />
                  </Tooltip>
                  <Tooltip hasArrow label="Delete todo" placement="right">
                    <IconButton
                      aria-label="Delete todo"
                      icon={getIconComponent("delete")}
                      colorScheme="red"
                      onClick={(): void => handleDeleteTodoClick(todo.id)}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default TodoItem;

// const [todoColor, setTodoColor] = useState<Colors>(color);
// const [todoDate, setTodoDate] = useState<Date | undefined>(
//   dueDate ? dueDate.toDate() : undefined
// );

// const handleTodoInputChange = (
//   event: React.ChangeEvent<HTMLTextAreaElement>
// ): void => setTodoInput(event.target.value);

// const handleTodoColorClick = (wantedColor: Colors): void =>
//   setTodoColor(wantedColor);

// const handleTodoDateChange = (date: Date | undefined): void =>
//   setTodoDate(date);

// const handleUpdateTodoClick = (id: string): void => {
//   if (!todoInput || todoInput.trim().length === 0) {
//     if (toast.isActive("emptySubmittedTodo")) return;
//     toast({
//       id: "emptySubmittedTodo",
//       title: "You cannot submit an empty todo.",
//       status: "warning"
//     });
//   } else {
//     const updatedTodo: {
//       body: string;
//       updatedAt: FieldValue;
//       color: Colors;
//       dueDate?: Date | FieldValue;
//     } = {
//       body: todoInput.trim(),
//       color: todoColor,
//       updatedAt: serverTimestamp(),
//       dueDate: todoDate || deleteField()
//     };

//     updateDoc(doc(database, "todos", id), updatedTodo)
//       .then((): void => onClose())
//       .catch((error: unknown) => {
//         onClose();
//         throw new Error(JSON.stringify(error));
//       });
//   }
// };

// const handleDeleteTodoClick = (id: string): void => {
//   deleteDoc(doc(database, "todos", id))
//     .then(() => {
//       return toast({
//         title: "Todo deleted!",
//         status: "success"
//       });
//     })
//     .catch((error: unknown) => {
//       throw new Error(JSON.stringify(error));
//     });
// };

// const colors: Colors[] = [
//   "gray",
//   "red",
//   "orange",
//   "yellow",
//   "green",
//   "teal",
//   "blue",
//   "cyan",
//   "purple",
//   "pink"
// ];
