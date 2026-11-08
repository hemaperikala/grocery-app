@"
# Grocery App (React Native)

A grocery shopping app built with React Native, Expo and TypeScript.

## Features
- Fetches products from a REST API (fakestoreapi.com)
- Product list with FlatList and a loading state

## Run
npm install
npx expo start

## Next
- Cart with Redux Toolkit
- Unit tests with Jest
"@ | Out-File -Encoding utf8 README.md
git add README.md
git commit -m "Add README"
git push
