import {
  ListItem,
  Flex,
  Text,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react";
import { fromColorMode, getIconComponent } from "@ibcarr/ui";
import { colors } from "@ibcarr/utils";
import { QueryDocumentSnapshot } from "firebase/firestore";
import type { Toast, Todo } from "../types";

type TodoItemProperties = {
  todo: QueryDocumentSnapshot<Todo>;
  toast: Toast;
};

const TodoItem = ({ todo, toast }: TodoItemProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { body, color, dueDate, createdAt, updatedAt } = todo.data();

  const borderColor = (): string => {
    if (colorMode === "light") {
      if (color === "gray") return `${color}.100`;
      if (color === "yellow" || color === "cyan") return `${color}.400`;
      return `${color}.500`;
    }
    return `${color === "gray" ? "whiteAlpha" : color}.200`;
  };
  // const colors = useMemo(() => {
  // const bgLightShade = (): "100" | "400" | "500" => {
  //   if (color === "gray") return "100";
  //   if (color === "yellow" || color === "cyan") return "400";
  //   return "500";
  //   };

  //   return {
  //     bg: fromColorMode(
  //       `${color}.${bgLightShade()}`,
  //       `${color === "gray" ? "whiteAlpha" : color}.200`,
  //       colorMode
  //     ),
  //     color: fromColorMode(
  //       ["gray", "yellow", "cyan"].includes(color) ? "black" : "white",
  //       color === "gray" ? "whiteAlpha.900" : "gray.800",
  //       colorMode
  //     ),
  //     toolbarHover: fromColorMode(
  //       ["gray", "yellow", "cyan"].includes(color)
  //         ? "blackAlpha.400"
  //         : "whiteAlpha.400",
  //       color === "gray" ? "blackAlpha.300" : "blackAlpha.400",
  //       colorMode
  //     )
  //   };
  // }, [color, colorMode]);

  return (
    <>
      <ListItem
        p={4}
        pb={0}
        rounded="md"
        shadow="md"
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="start"
        borderColor={borderColor()}
        borderWidth={2}
        bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
        color={fromColorMode("gray.800", "whiteAlpha.900", colorMode)}
        role="group"
      >
        <Text cursor="text" wordBreak="break-word" whiteSpace="pre-wrap">
          {body}
        </Text>
        <Flex
          direction="row"
          align="center"
          justify="center"
          p={2}
          mt={0}
          gap={2}
          opacity={0}
          bg="transparent"
          roundedTop="md"
          shadow="sm"
          transitionProperty="all"
          transitionDuration="150ms"
          transitionTimingFunction="ease-in"
          _groupHover={{
            opacity: 1,
            bg: fromColorMode("gray.200", "whiteAlpha.200", colorMode),
            mt: 2
          }}
        >
          <IconButton
            aria-label="Edit todo"
            icon={getIconComponent("calendar")}
            colorScheme={color}
            size="sm"
          />
          <Menu autoSelect={false} placement="bottom-start">
            <MenuButton
              as={IconButton}
              icon={getIconComponent("colorPicker")}
              colorScheme={color}
              size="sm"
            />
            <MenuList
              minW="min-content"
              border="none"
              p={0}
              display="flex"
              flexDirection="row"
            >
              {colors.map((itemColor) => (
                <MenuItem key={itemColor} as="div" p={1} w={10}>
                  <Button
                    size="sm"
                    colorScheme={itemColor}
                    w={8}
                    h={8}
                    textTransform="capitalize"
                  >
                    {itemColor.slice(0, 3)}
                  </Button>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <IconButton
            aria-label="Edit todo"
            icon={getIconComponent("edit")}
            colorScheme={color}
            size="sm"
          />
        </Flex>
      </ListItem>

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
      {/* {dueDate && (
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
          </Text> */}

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
