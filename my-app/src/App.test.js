import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import Pagination from "./Pagination";

// Mocking the fetch API
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            "s.no": 0,
            "amt.pledged": 15823,
            "percentage.funded": 186,
          },
          {
            "s.no": 1,
            "amt.pledged": 6859,
            "percentage.funded": 8,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});


// test("renders loading message while fetching data", async () => {
//   render(<App />);
//   const loadingMessage = screen.getByText(/Loading/i);
//   expect(loadingMessage).toBeInTheDocument();

//   // Wait for data to be fetched
//   await waitFor(() => {
//     const heading = screen.getByText(/Projects status table/i);
//     expect(heading).toBeInTheDocument();
//   });
// });



// test("renders table with correct columns", async () => {
//   render(<App />);
//   const loadingMessage = screen.getByText(/Loading/i);
//   expect(loadingMessage).toBeInTheDocument();

//   await waitFor(() => {
//     const column1 = screen.getByText(/S.No./i);
//     const column2 = screen.getByText(/Percentage Funded/i);
//     const column3 = screen.getByText(/Amount Pledged/i);

//     expect(column1).toBeInTheDocument();
//     expect(column2).toBeInTheDocument();
//     expect(column3).toBeInTheDocument();
//   });
// });

test("renders pagination buttons", () => {
  const onPageChange = jest.fn();
  render(<Pagination totalPages={5} currentPage={1} onPageChange={onPageChange} />);

  const prevButton = screen.getByText(/Prev/i);
  const nextButton = screen.getByText(/Next/i);

  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});

test("calls onPageChange when clicking a page button", () => {
  const onPageChange = jest.fn();
  render(<Pagination totalPages={5} currentPage={1} onPageChange={onPageChange} />);

  const page2Button = screen.getByText("2");
  fireEvent.click(page2Button);

  expect(onPageChange).toHaveBeenCalledWith(2);
});