import "@testing-library/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Contact from ".";

const server = setupServer(
  rest.post("/contact", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  })
);

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const getInputName = () =>
  screen.getByRole("textbox", { name: /nombre completo/i });

const getTextareaMessage = () =>
  screen.getByRole("textbox", { name: /mensaje/i });

const getButton = () => screen.getByRole("button", { name: /Enviar/i });

const fillInputs = (valueInput: string = "", valueMessage: string = "") => {
  const textMessage = getTextareaMessage();
  const inputName = getInputName();
  fireEvent.change(inputName, { target: { value: valueInput } });
  fireEvent.change(textMessage, { target: { value: valueMessage } });
  return { inputName, textMessage };
};

const fillAndExpectValueInput = (
  valueInput: string = "",
  valueMessage: string = ""
) => {
  const { inputName, textMessage } = fillInputs(valueInput, valueMessage);
  expect(inputName).toHaveValue(valueInput);
  expect(textMessage).toHaveValue(valueMessage);
};

const buttonHassDisabledClass = (className: string = "bg-gray-100") =>
  getButton().classList.contains(className);

const expectDisabledButton = () => {
  expect(getButton()).toBeDisabled();
  expect(buttonHassDisabledClass()).toBeTruthy();
};

const expectEnableddButton = () => {
  expect(getButton()).toBeEnabled();
  expect(buttonHassDisabledClass()).toBeFalsy();
};

describe("Contact main section", () => {
  it(`When the page loads it should show 'Welcome, contact us'`, () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: /Welcome, contact us/i })
    ).toBeInTheDocument();
  });
  it(`it should render input text with name with placeholder and label 'Escribe tu nombre'`, () => {
    render(<Contact />);
    const inputName = getInputName();
    const labelName = screen.getByLabelText("Nombres:");
    expect(labelName).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputName).toHaveAttribute("placeholder", "Escribe tu nombre");
  });

  it(`it should render text area with placeholder 'Dejanos tu mensaje'`, () => {
    render(<Contact />);
    const textMessage = getTextareaMessage();
    expect(textMessage).toHaveAttribute("placeholder", "Dejanos tu mensaje");
  });

  it(`it should render button 'Enviar'`, () => {
    render(<Contact />);
    expect(getButton()).toBeInTheDocument();
  });

  it(`The button should be disabled 
  if the name or message are empty`, async () => {
    render(<Contact />);
    expectDisabledButton();
    expect(getButton().classList.contains("bg-gray-100")).toBeTruthy();
  });

  it(`The button 'Enviar' should be disabled 
  if the name it's not alphanumeric`, () => {
    render(<Contact />);
    fillAndExpectValueInput("##abc");
    expectDisabledButton();
  });
  it(`The button 'Enviar' should be disabled 
  if the name it's not alphanumeric`, () => {
    render(<Contact />);
    fillAndExpectValueInput('aaa.31"');
    expectDisabledButton();
  });
  it(`The button 'Enviar' should be disabled 
  if the name it's not alphanumeric`, () => {
    render(<Contact />);
    fillAndExpectValueInput("128cbas?12");
    expectDisabledButton();
  });

  it(`The button 'Enviar' should be disabled 
  if the input is alphanumeric and
   text message it's does not match alphanumeric including '?.!'`, () => {
    render(<Contact />);
    fillAndExpectValueInput("abc###12ssa", "abc123");
    expectDisabledButton();
  });

  it(`The button 'Enviar' should be disabled 
  if the input is alphanumeric and
   text message it's does not match alphanumeric including '?.!'`, () => {
    render(<Contact />);
    fillAndExpectValueInput("12838asm", "128312.18,12#12");
    expectDisabledButton();
  });

  it(`The button 'Enviar' should be disabled 
  if the input is alphanumeric and
   text message it's does not match alphanumeric including '?.!'`, () => {
    render(<Contact />);
    fillAndExpectValueInput("abc123", "#3##aasb");
    expectDisabledButton();
  });

  it(`The button 'Enviar' should be enabled 
  if the name and textmessage are alphanumeric and textmessage includes '?' `, () => {
    render(<Contact />);
    fillAndExpectValueInput("aAjsjKK123312", "AAAbsb122 2?.");
    expectEnableddButton();
  });

  it(`The button 'Enviar' should be enabled 
  if the name and textmessage are alphanumeric and textmessage includes '?.!' `, () => {
    render(<Contact />);
    fillAndExpectValueInput("AAA8 8281", "AAAbsb 1222???!!...ABC.");
    expectEnableddButton();
  });

  it(`The button 'Enviar' should be enabled 
  if the name and textmessage are alphanumeric and textmessage includes '....' `, async () => {
    render(<Contact />);
    fillAndExpectValueInput("babs jsjas", "ab2828...");
    expectEnableddButton();
  });

  it(`The button 'Enviar' should be enabled 
  if the name and textmessage are alphanumeric and textmessage includes '....' `, async () => {
    render(<Contact />);
    fillAndExpectValueInput(
      "Nombre completo   como yo",
      "mi mensaje es     largo a ver...."
    );
    expectEnableddButton();
  });

  it(`it should show 'La informacion ha sido enviada.'
  when it's press the button 'Enviar'`, async () => {
    render(<Contact />);
    const button = getButton();
    fillInputs("Juan Torres Quintero", "my message request for the company");
    fireEvent.click(button);
    expect(await screen.findByText(/La informacion ha sido enviada./i));
  });

  test(`it should show 'Ha ocurrido un error inesperado. Intente mas tarde.'
  when it's press the button 'Enviar' and the server has 500 error`, async () => {
    server.use(
      // override the initial "GET /greeting" request handler
      // to return a 500 Server Error
      rest.post("/contact", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<Contact />);
    const button = getButton();
    fillInputs("Juan Torres Quintero", "my message request for the company");
    fireEvent.click(button);
    expect(
      await screen.findByText(
        /Ha ocurrido un error inesperado. Intente mas tarde./i
      )
    );
  });

  test(`it should show 'Los datos no fueron procesados correctamente.'
  when it's press the button 'Enviar' and the server has 400 error`, async () => {
    server.use(
      rest.post("/contact", (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(<Contact />);
    const button = getButton();
    fillInputs("Juan Torres Quintero", "my message request for the company");
    fireEvent.click(button);
    expect(
      await screen.findByText(
        /Los datos no fueron procesados correctamente./i
      )
    );
  });
});
