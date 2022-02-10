# ibcarr monorepo

## TODO

#### General
- [ ] Add precommit script to lint project using Husky or something like that.

- [ ] Alot of functionality can be pulled out into Cloud Functions or NextJS API things... so do that.

- [ ] Convert data to below schema... again.
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

#### Todolist
- [ ] ADD TODO WITH ALL FIELDS BUT MAKE OPTIONAL ONES FIREBASE.NULL
- [ ] Add settings page to change data:
  - [ ] Change password,
  - [ ] Change email,
  - [ ] Change display name,
  - [ ] Delete account.
- [ ] Date picker:
  - [ ] Add week of the year to side,
  - [ ] Add previous months days to start of next month,
  - [ ] Change how state is handled interally,
  - [ ] Don't allow to user go back before current date,
  - [ ] Allow keyboard to be used.
- [ ] Add labels to todo's.
- [ ] Add `Forgot Password` feature on auth form.

#### Games
- [ ] Add leaderboards to games.
- [ ] Add graphs to users to show progression over time.
- [ ] Add `Information` button to games to show how to play etc...
- [ ] Make Wordle clone
- [ ] Allow keyboard to be used on hangman

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
