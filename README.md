# ibcarr monorepo

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

```json
"deploy": "firebase deploy --only hosting",
```
