/**
 * TODO this needs an entire rework
 * TODO add label button to... add... labels... ( also add labels... also add sidebar to access labels )
 * TODO make tasks draggable
 */

import { Flex, Textarea, useColorMode } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { type Colors } from "@ibcarr/utils";
import { database } from "../../firebase";
import type { Toast } from "../../types";
import { scrollbar } from "../../theme";
import BottomBar from "./components/bottom-bar";

type HalfTodo = {
  title?: string;
  body: string;
  color: Colors;
  dueDate?: Date | undefined;
};

type TodoFormProperties = {
  user: User;
  toast: Toast;
};

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
    updateTodo({ dueDate: date });

  const addTodoToFirestore = (): void => {
    const todoToAdd: HalfTodo & {
      created_at: FieldValue;
      updated_at: FieldValue;
      owner_uid: string;
      pinned: boolean;
    } = {
      body: body.trim(),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      color,
      owner_uid: user?.uid,
      pinned: false
    };

    if (title && title.length > 0) todoToAdd.title = title.trim();
    if (dueDate) todoToAdd.dueDate = dueDate;

    addDoc(collection(database, `/users/${user.uid}/todos`), todoToAdd).catch(
      (error: unknown) => {
        throw new Error(JSON.stringify(error));
      }
    );
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
        value={title}
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
          date: dueDate,
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
        togglePinned={false}
        saveTodo={handleAddTodoClick}
      />
    </Flex>
  );
};

export default TodoForm;
