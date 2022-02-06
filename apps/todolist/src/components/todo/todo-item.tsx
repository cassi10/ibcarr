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
  Button,
  Tooltip,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea
} from "@chakra-ui/react";
import { fromColorMode, getIconComponent } from "@ibcarr/ui";
import { type Colors, colors } from "@ibcarr/utils";
import {
  deleteDoc,
  deleteField,
  doc,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { database } from "../../firebase";
import type { Toast, Todo } from "../../types";
import DatePicker from "./date-picker";

type TodoItemProperties = {
  todo: QueryDocumentSnapshot<Todo>;
  toast: Toast;
  userUID: string;
};

const TodoItem = ({
  todo,
  toast,
  userUID
}: TodoItemProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { title, body, color, pinned, dueDate, createdAt, updatedAt } =
    todo.data();

  const borderColor = (): string => {
    if (colorMode === "light") {
      if (color === "gray") return `${color}.100`;
      if (color === "yellow" || color === "cyan") return `${color}.400`;
      return `${color}.500`;
    }
    return `${color === "gray" ? "whiteAlpha" : color}.200`;
  };

  const handleTodoPinnedClicked = (): void => {
    updateDoc(doc(database, "users", userUID, "todos", todo.id), {
      pinned: !pinned,
      updatedAt: serverTimestamp()
    }).catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  };

  const handleTodoColorChange = (wantedColor: Colors): void => {
    updateDoc(doc(database, "users", userUID, "todos", todo.id), {
      color: wantedColor,
      updatedAt: serverTimestamp()
    }).catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  };

  const handleTodoDateChange = (date: Date | undefined): void => {
    updateDoc(doc(database, "users", userUID, "todos", todo.id), {
      dueDate: date || deleteField(),
      updatedAt: serverTimestamp()
    }).catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  };

  const handleTodoDeleteClick = (): void => {
    deleteDoc(doc(database, "users", userUID, "todos", todo.id))
      .then(() => {
        return toast({
          title: "Todo deleted!",
          status: "success"
        });
      })
      .catch((error: unknown) => {
        throw new Error(JSON.stringify(error));
      });
  };

  return (
    <>
      <ListItem
        p={4}
        rounded="md"
        shadow="md"
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="start"
        borderColor={borderColor()}
        borderWidth={2}
        gap={0}
        bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
        color={fromColorMode("gray.800", "whiteAlpha.900", colorMode)}
        role="group"
      >
        {title && (
          <Text
            cursor="text"
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            w="100%"
            fontSize="lg"
            fontWeight="semibold"
          >
            {title}
          </Text>
        )}
        {/* <Text
          cursor="text"
          wordBreak="break-word"
          whiteSpace="pre-wrap"
          w="100%"
        >
          {body}
        </Text> */}
        <Editable defaultValue={body} w="100%">
          <EditablePreview
            cursor="text"
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            w="100%"
          />
          <EditableInput
            w="100%"
            as={Textarea}
            p={0}
            _focus={{
              outline: 0,
              boxShadow: "none",
              border: 0
            }}
          />
        </Editable>
        <Flex
          align="center"
          justify="start"
          gap={3}
          opacity={0} // if menu open then opacity, mt and bg are same as _groupHover
          bg="transparent"
          roundedTop="md"
          shadow="sm"
          transitionProperty="all"
          transitionDuration="150ms"
          transitionTimingFunction="ease-in-out"
          w="100%"
          _groupHover={{
            opacity: 1,
            mt: 3
          }}
        >
          <DatePicker
            button={{
              size: "sm",
              variant: "outline",
              rounded: "full"
            }}
            buttonText={dueDate?.toDate().toLocaleDateString("en-GB", {
              dateStyle: "medium"
            })}
            date={dueDate ? dueDate.toDate() : undefined}
            updateDate={(date): void => handleTodoDateChange(date)}
          />
          <Menu autoSelect={false} placement="bottom-start">
            <Tooltip hasArrow label="Color picker" placement="auto">
              <MenuButton
                as={IconButton}
                icon={getIconComponent("colorPicker")}
                colorScheme={color}
                aria-label="Color picker"
                variant="outline"
                rounded="full"
                size="sm"
              />
            </Tooltip>
            <MenuList
              minW="min-content"
              border="none"
              p={0}
              display="flex"
              flexDirection="row"
            >
              {colors.map((itemColor) => (
                <MenuItem
                  key={itemColor}
                  as="div"
                  p={1}
                  w={10}
                  role="group"
                  cursor="pointer"
                  onClick={(): void => handleTodoColorChange(itemColor)}
                >
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
          <Tooltip hasArrow label="Toggle pinned" placement="auto">
            <IconButton
              aria-label="Toggle pinned"
              icon={
                pinned
                  ? getIconComponent("pin")
                  : getIconComponent("outlinePin")
              }
              colorScheme="blue"
              variant="outline"
              rounded="full"
              size="sm"
              onClick={handleTodoPinnedClicked}
            />
          </Tooltip>
          <Tooltip hasArrow label="Edit todo" placement="auto">
            <IconButton
              aria-label="Edit todo"
              icon={getIconComponent("edit")}
              colorScheme="green"
              variant="outline"
              rounded="full"
              size="sm"
            />
          </Tooltip>
          <Menu autoSelect={false}>
            <Tooltip hasArrow label="More options" placement="auto">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={getIconComponent("more")}
                size="sm"
                variant="outline"
                rounded="full"
              />
            </Tooltip>
            <MenuList minW="min-content" p={0}>
              <MenuItem
                icon={getIconComponent("delete")}
                onClick={handleTodoDeleteClick}
              >
                Delete todo
              </MenuItem>
            </MenuList>
          </Menu>
          {updatedAt && createdAt && (
            <Tooltip
              hasArrow
              placement="auto"
              label={`Created ${updatedAt.toDate().toLocaleDateString("en-GB", {
                year: undefined,
                month: "short",
                day: "numeric"
              })}`}
            >
              <Text fontSize="sm" ml="auto">
                Edited{" "}
                {updatedAt.toDate().toLocaleDateString("en-GB", {
                  year: undefined,
                  month: "short",
                  day: "numeric"
                })}
              </Text>
            </Tooltip>
          )}
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
