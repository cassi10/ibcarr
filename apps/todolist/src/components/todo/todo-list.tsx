import {
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  List,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  DocumentData,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useMemo } from "react";
import { database } from "../../firebase";
import type { Todo, Toast } from "../../types";
import TodoItem from "./todo-item";

const TodoConverter = {
  toFirestore(todo: Todo): DocumentData {
    return { ...todo };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<Todo>,
    options: SnapshotOptions | undefined
  ): Todo {
    const data = snapshot.data(options);
    return { ...data };
  }
};

type TodoListProperties = {
  user: User;
  toast: Toast;
};

const TodoList = ({ user, toast }: TodoListProperties): JSX.Element => {
  const todosReference = collection(database, "todolist", user.uid, "todos");

  const todosQuery = query(
    todosReference,
    orderBy("createdAt", "desc")
  ).withConverter<Todo>(TodoConverter);

  const [allTodos, todosLoading, todosError] = useCollection(todosQuery);

  const todos = useMemo(() => {
    return {
      pinned: allTodos?.docs.filter((todo) => todo.data().pinned),
      others: allTodos?.docs.filter((todo) => !todo.data().pinned)
    };
  }, [allTodos]);

  return (
    <VStack align="stretch" justify="center" mt={8}>
      {todosError && (
        <Alert
          status="error"
          variant="left-accent"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height={200}
        >
          <AlertIcon boxSize={16} m={0} />
          <AlertTitle my={4} fontSize="lg">
            Error fetching todos!
          </AlertTitle>
          <AlertDescription maxWidth="sm">{todosError}</AlertDescription>
        </Alert>
      )}
      {todosLoading && (
        <SimpleGrid
          columns={1}
          rows={1}
          justifyContent="center"
          alignContent="center"
          justifyItems="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </SimpleGrid>
      )}
      {!todosLoading &&
        !todosError &&
        (allTodos === undefined || allTodos.empty ? (
          <Text alignSelf="center" fontSize="2xl">
            Try adding some tasks!
          </Text>
        ) : (
          <>
            {todos.pinned && todos.pinned.length > 0 && (
              <>
                <Text fontSize="sm" fontWeight="semibold">
                  PINNED
                </Text>
                <List spacing={6}>
                  {todos.pinned.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} toast={toast} />
                  ))}
                </List>
              </>
            )}
            {todos.others && todos.others.length > 0 && (
              <>
                {todos.pinned && todos.pinned.length > 0 && (
                  <Text fontSize="sm" fontWeight="semibold">
                    OTHERS
                  </Text>
                )}
                <List spacing={6}>
                  {todos.others &&
                    todos.others.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} toast={toast} />
                    ))}
                </List>
              </>
            )}
          </>
        ))}
    </VStack>
  );
};

export default TodoList;
