# NOTES

## Database schema

```text
C = Collection
D = Document
F = Field
? = Optional

C todolist ╼ D userUID ╼┬╼ C todos ╼ D todoUID ╼┬╼ string?      title
                        │                       ├╼ string       body
                        │                       ├╼ string       color
                        │                       ├╼ boolean      pinned
                        │                       ├╼ timestamp?   dueDate
                        │                       ├╼ timestamp    createdAt
                        │                       ├╼ timestamp    updatedAt
                        │                       └╼ string       ownerUID
                        └╼ array todoLabels: list of todoUID's with that label

C games ╼┬╼ D userUID ╼ map gameName: maps timestamp to score
         │
         └╼ D gameName ┬╼ map gameName:  maps user_uid to their highest score
                       └╼ any dataPoint: holds any global data a game might need
```

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

To (re)generate ChakraUI theme types run `npx @chakra-ui/cli tokens ./path/to/theme.ts`

When in doubt:

```bash
npm run clean
npm ci
npm run build
```
