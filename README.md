# ibcarr monorepo

## TODO

### General

- [x] Add precommit script to lint project using Husky or something like that.

- [ ] Alot of functionality can be pulled out into Cloud Functions or NextJS API things... so do that.

- [x] Convert data to below schema... again.

```text
C = Collection
D = Document
F = Field

C todolist -> D user_uid -> C todos -> D todo_uid
                         -> F todo_labels (array): list of todos with that label

C games -> D user_uid     -> F game_name (map): maps timestamp to score
        -> D leaderboards -> F game_name (map): maps user_uid to their highest score
        -> D data         -> F game_name (map): maps global game data
```

### Todolist

- [x] ADD TODO WITH ALL FIELDS BUT MAKE OPTIONAL ONES FIREBASE.NULL (just allowed undefined values but still using deleteField())
- [ ] Add settings page to change data:
  - [ ] Change password,
  - [ ] Change email,
  - [ ] Change display name,
  - [ ] Delete account.
- [x] Date picker:
  - [x] Add previous months days to start of next month,
  - [x] Change how state is handled interally,
  - [x] Don't allow to user go back before current date,
- [ ] Clear dueDate in todo form after submit.
  - Currently it will keep the previous value after `Save Todo` is clicked.
- [ ] Add labels to todo's.
- [ ] Add `Forgot Password` feature on auth form.
- [ ] Make tasks draggable.
- [ ] Fix that annoying flashing when adding a title to a todo.

### Games

- [ ] Add leaderboards to games.
- [ ] Add graphs to users to show progression over time.
- [x] Add `Information` button to games to show how to play etc...
- [ ] Make Wordle clone.
- [ ] Allow keyboard to be used on hangman.

## Info

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

To (re)generate ChakraUI theme types run `npx @chakra-ui/cli tokens ./path/to/theme.(ts,js)`

When in doubt:

```bash
npm run clean
npm ci
npm run build
```
