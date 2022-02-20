import { Flex, Textarea, useColorMode } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { type Colors } from "@ibcarr/utils";
import { database } from "../../firebase";
import type { Toast, Todo } from "../../types";
import { scrollbar } from "../../theme";
import BottomBar from "./components/bottom-bar";

type TodoFormProperties = {
  user: User;
  toast: Toast;
};

type HalfTodo = Pick<Todo, "title" | "body" | "color" | "dueDate">;

const TodoForm = ({ user, toast }: TodoFormProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  const titleReference = useRef<HTMLTextAreaElement | null>(null);
  const bodyReference = useRef<HTMLTextAreaElement | null>(null);

  const todoInitialValues: HalfTodo = {
    title: "",
    body: "",
    color: "gray",
    dueDate: undefined
  };

  const [{ title, body, color, dueDate }, setTodo] =
    useState<HalfTodo>(todoInitialValues);

  useEffect(() => {
    if (titleReference && titleReference.current) {
      titleReference.current.style.height = `auto`;
      titleReference.current.style.height = `${titleReference.current.scrollHeight.toString()}px`;
    }
  }, [title]);

  useEffect(() => {
    if (bodyReference && bodyReference.current) {
      bodyReference.current.style.height = `auto`;
      bodyReference.current.style.height = `${bodyReference.current.scrollHeight.toString()}px`;
    }
  }, [body]);

  const updateTodo = (toUpdate: Partial<HalfTodo>): void =>
    setTodo((previousTodo) => {
      return { ...previousTodo, ...toUpdate };
    });

  const handleTodoInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => updateTodo({ [event.target.name]: event.target.value });

  const handleTodoColorClick = (wantedColor: Colors): void =>
    updateTodo({ color: wantedColor });

  const handleTodoDateChange = (date: Date | undefined): void =>
    updateTodo({ dueDate: date ? Timestamp.fromDate(date) : undefined });

  const addTodoToFirestore = (): void => {
    const trimmedTitle = title?.toString().trim();

    const todoToAdd: Todo = {
      title: trimmedTitle || undefined,
      body: body.trim(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      dueDate: dueDate || undefined,
      color,
      ownerUID: user?.uid,
      pinned: false
    };

    addDoc(
      collection(database, "todolist", user.uid, "todos"),
      todoToAdd
    ).catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  };

  const handleAddTodoClick = (): void => {
    if (!body || body.trim().length === 0) {
      if (toast.isActive("emptySubmittedTodo")) return;
      toast({
        id: "emptySubmittedTodo",
        title: "You cannot submit an empty todo.",
        status: "warning"
      });
    } else {
      addTodoToFirestore();

      setTodo(todoInitialValues);
    }
  };

  return (
    <Flex
      mt={8}
      align="stretch"
      justify="stretch"
      direction="column"
      w="100%"
      shadow="md"
      bg="whiteAlpha.50"
      rounded="md"
    >
      <Textarea
        placeholder="Title"
        value={title?.toString()}
        onChange={handleTodoInputChange}
        roundedBottom={0}
        minH={10}
        maxLength={1000}
        name="title"
        ref={titleReference}
        fontSize="lg"
        fontWeight="semibold"
        sx={scrollbar(colorMode)}
        rounded="md"
        variant="filled"
        resize="none"
        spellCheck={false}
      />
      <Textarea
        placeholder="What is the task..."
        value={body}
        onChange={handleTodoInputChange}
        roundedTop={0}
        minH={40}
        maxLength={10_000}
        name="body"
        shadow="md"
        ref={bodyReference}
        sx={scrollbar(colorMode)}
        rounded="md"
        variant="filled"
        resize="none"
        spellCheck={false}
      />
      <BottomBar
        flex={{
          p: 3,
          gap: 2
        }}
        datePicker={{
          date: dueDate instanceof Timestamp ? dueDate.toDate() : undefined,
          updateDate: handleTodoDateChange
        }}
        colorPicker={{
          menuPlacement: "right",
          color,
          updateColor: handleTodoColorClick
        }}
        editTodo={false}
        moreOptions={false}
        todoDates={false}
        saveTodo={handleAddTodoClick}
      />
    </Flex>
  );
};

export default TodoForm;
