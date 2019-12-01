This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000).
After app runs, you can click buttons to switch authentication on/off. You cant go ProtectedPage ("/protected") unless localStorage has "token" key. Also you cant go LoginPage("/login") if you are authenticated. You are free to go NormalPage ("/normal")
