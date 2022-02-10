# ibcarr monorepo

## TODO

### Add precommit script to lint project using Husky or something like that

```text
todolist -> user_uid -> todos -> todo_uid
                     -> todo_labels (array): list of todos with that label

games -> user_uid -> game_name (map): maps timestamp to score
      -> leaderboards -> game_name (map): maps user_uid to their highest score
```

## Info

To (re)generate ChakraUI types run `npx @chakra-ui/cli tokens ./path/to/theme.(ts,js)`

## Scrap code but still useful

```tsx
sx={{
  "&::-webkit-scrollbar": {
    width: "0.5rem",
    borderRadius: "0.5rem",
    backgroundColor: fromColorMode(
      `rgba(0, 0, 0, 0.15)`,
      `rgba(255, 255, 255, 0.1)`,
      colorMode
    )
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "0.5rem",
    backgroundColor: fromColorMode(
      `rgba(0, 0, 0, 0.15)`,
      `rgba(255, 255, 255, 0.1)`,
      colorMode
    )
  }
}}
```

## Scrap stuff

`find . -type d -name "folder_name" -exec -rc {} +`
