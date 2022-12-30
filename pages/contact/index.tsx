import { useState } from "react";
import CustomButton from "../../components/buttons/default";

const Contact = () => {
  const [inputName, setInputName] = useState("");
  const [textMessage, setTextMessage] = useState("");

  const isInvalidForm = () => {
    if (!inputName.length || !textMessage.length) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h1>Welcome, contact us</h1>;
      <form>
        <label htmlFor="name">Nombres:</label>
        <input
          id="name"
          type="text"
          aria-label="Nombre completo"
          placeholder="Escribe tu nombre"
          value={inputName}
          onChange={(e) => setInputName(e.currentTarget.value)}
        />
        <textarea
          value={inputName}
          onChange={(e) => setTextMessage(e.currentTarget.value)}
          aria-label="mensaje"
          placeholder="Dejanos tu mensaje"
        />
        <CustomButton disabled={isInvalidForm()}>Enviar</CustomButton>
      </form>
    </div>
  );
};
export default Contact;
