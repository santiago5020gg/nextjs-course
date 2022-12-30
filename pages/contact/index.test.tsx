import "@testing-library/react";
import { render, screen } from "@testing-library/react";
import Contact from ".";

beforeEach(() => {
  render(<Contact />);
});

describe("Contact main section", () => {
  it(`When the page loads it should show 'Welcome, contact us'`, () => {
    expect(
      screen.getByRole("heading", { name: /Welcome, contact us/i })
    ).toBeInTheDocument();
  });
  it(`it should render input text with name with placeholder and label 'Escribe tu nombre'`, () => {
    const inputName = screen.getByRole("textbox", { name: /nombre completo/i });
    const labelName = screen.getByLabelText("Nombres:");
    expect(labelName).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputName).toHaveAttribute("placeholder", "Escribe tu nombre");
  });

  it(`it should render text area with placeholder 'Dejanos tu mensaje'`, () => {
    const textMessage = screen.getByRole("textbox", { name: /mensaje/i });
    expect(textMessage).toHaveAttribute("placeholder", "Dejanos tu mensaje");
  });

  it(`it should render button 'Enviar'`, () => {
    expect(screen.getByRole('button', {name: /Enviar/i})).toBeInTheDocument();
  });

  it(`The button should be disabled 
  if the name or message are invalid`, () => {
    expect(screen.getByRole('button', {name: /Enviar/i})).toBeDisabled();
  });
});
