import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  ModalHeader,
  Textarea,
  useDisclosure,
  IconButton,
  ColorMode,
  ListItem,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Tooltip,
  Button
} from "@chakra-ui/react";
import { getIconComponent, fromColorMode } from "@ibcarr/ui";
import {
  QueryDocumentSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  FieldValue,
  deleteField
} from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase/client-app";
import { Toast, Colors, Todo } from "../types";
import DatePicker from "./date-picker";

interface ITodoItem {
  todo: QueryDocumentSnapshot<Todo>;
  colorMode: ColorMode;
  toast: Toast;
}

const TodoItem: React.FC<ITodoItem> = ({ todo, colorMode, toast }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { body, color, dueDate } = todo.data();

  const [todoInput, setTodoInput] = useState<string>(body);
  const [todoColor, setTodoColor] = useState<Colors>(color);
  const [todoDate, setTodoDate] = useState<Date | undefined>(
    dueDate ? dueDate.toDate() : undefined
  );

  const handleTodoInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setTodoInput(event.target.value);

  const handleTodoColorClick = (wantedColor: Colors): void =>
    setTodoColor(wantedColor);

  const handleTodoDateChange = (date: Date | undefined): void =>
    setTodoDate(date);

  const handleUpdateTodoClick = (id: string): void => {
    if (!todoInput || todoInput.trim().length === 0) {
      if (toast.isActive("emptySubmittedTodo")) return;
      toast({
        id: "emptySubmittedTodo",
        title: "You cannot submit an empty todo.",
        status: "warning"
      });
    } else {
      const updatedTodo: {
        body: string;
        updatedAt: FieldValue;
        color: Colors;
        dueDate?: Date | FieldValue;
      } = {
        body: todoInput.trim(),
        color: todoColor,
        updatedAt: serverTimestamp(),
        dueDate: todoDate || deleteField()
      };

      updateDoc(doc(firestore, "todos", id), updatedTodo)
        .then((): void => onClose())
        .catch((error) => {
          onClose();
          throw error;
        });
    }
  };

  const handleDeleteTodoClick = (id: string): void => {
    deleteDoc(doc(firestore, "todos", id))
      .then(() => {
        toast({
          title: "Successfully deleted todo!",
          status: "success"
        });
        return onClose();
      })
      .catch((error) => {
        throw error;
      });
  };

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

  return (
    <>
      <ListItem
        p={4}
        rounded={8}
        bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
        boxShadow="md"
      >
        <Flex align="center" justify="start" direction="row">
          <Tooltip hasArrow label="Edit todo" placement="left">
            <IconButton
              alignSelf="start"
              aria-label="Edit todo"
              variant="solid"
              icon={getIconComponent("edit")}
              onClick={onOpen}
              colorScheme={color}
            />
          </Tooltip>
          <Flex
            direction="column"
            align="start"
            justify="start"
            px={4}
            gridGap={1}
          >
            {dueDate && (
              <Text fontSize="sm">
                {dueDate.toDate().toLocaleDateString("en-GB", {
                  dateStyle: "full"
                })}
              </Text>
            )}
            <Text
              whiteSpace="pre-wrap"
              maxH="md"
              flex={1}
              overflow="auto"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                  borderRadius: "8px",
                  backgroundColor: fromColorMode(
                    `rgba(0, 0, 0, 0.15)`,
                    `rgba(255, 255, 255, 0.1)`,
                    colorMode
                  )
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "8px",
                  backgroundColor: fromColorMode(
                    `rgba(0, 0, 0, 0.15)`,
                    `rgba(255, 255, 255, 0.1)`,
                    colorMode
                  )
                }
              }}
            >
              {body}
            </Text>
          </Flex>
        </Flex>
      </ListItem>

      <Modal isOpen={isOpen} onClose={onClose}>
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
                  rounded={8}
                  roundedBottom={todoDate ? 0 : 8}
                  variant="filled"
                  h="auto"
                  minH={todoDate ? "320px" : "360px"}
                  boxShadow={todoDate ? "none" : "md"}
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
              >
                <Flex flex={1} gridRowGap={2} direction="column">
                  <DatePicker onSaveClick={handleTodoDateChange} />
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
      </Modal>
    </>
  );
};

export default TodoItem;
