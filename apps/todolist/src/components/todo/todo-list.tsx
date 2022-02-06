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
  SnapshotOptions,
  Timestamp
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import type { Colors } from "@ibcarr/utils";
import { useMemo } from "react";
import { database } from "../../firebase";
import type { Todo, Toast } from "../../types";
import TodoItem from "./todo-item";

const TodoConverter = {
  toFirestore(todo: Todo): DocumentData {
    return { ...todo };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions | undefined
  ): Todo {
    const data = snapshot.data(options);
    return {
      title: data.title as string,
      body: data.body as string,
      color: data.color as Colors,
      pinned: data.pinned as boolean,
      dueDate: data.dueDate as Timestamp,
      createdAt: data.created_at as Timestamp,
      updatedAt: data.updated_at as Timestamp,
      ownerUID: data.owner_uid as string
    };
  }
};

type TodoListProperties = {
  user: User;
  toast: Toast;
};

const TodoList = ({ user, toast }: TodoListProperties): JSX.Element => {
  const todosReference = collection(
    database,
    `users/${user.uid}/todos`
  ).withConverter<Todo>(TodoConverter);

  const todosQuery = query(
    todosReference,
    orderBy("created_at", "desc")
  ).withConverter(TodoConverter);

  const [baseTodos, todosLoading, todosError] = useCollection(todosQuery);

  const todos = useMemo(() => {
    return {
      pinned: baseTodos?.docs.filter((baseTodo) => baseTodo.data().pinned),
      others: baseTodos?.docs.filter((baseTodo) => !baseTodo.data().pinned)
    };
  }, [baseTodos]);

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
        (baseTodos === undefined || baseTodos.empty ? (
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
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      toast={toast}
                      userUID={user.uid}
                    />
                  ))}
                </List>
              </>
            )}
            {todos.others && todos.others.length > 0 && (
              <>
                <Text fontSize="sm" fontWeight="semibold">
                  OTHERS
                </Text>
                <List spacing={6}>
                  {todos.others &&
                    todos.others.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        toast={toast}
                        userUID={user.uid}
                      />
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
