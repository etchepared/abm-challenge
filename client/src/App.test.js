import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/index";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("Landing", () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  expect(screen.getByText("adventure")).toBeInTheDocument();
});
