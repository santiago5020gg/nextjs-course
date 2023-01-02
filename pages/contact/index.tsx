import { useState } from "react";
import CustomButton from "../../components/buttons/default";

const Contact = () => {
  const [inputName, setInputName] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [message, setMessage] = useState("");

  const isInvalidForm = () => {
    const regXInput = /^[a-z0-9 ]+$/i;
    const regxTextMessage = /^[a-z0-9?.! ]+$/i;
    if (
      !inputName ||
      !textMessage ||
      !regXInput.test(inputName) ||
      !regxTextMessage.test(textMessage)
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputName, message: textMessage }),
      });
      if (!response.ok) {
        throw response;
      }
      await response.json();
      setMessage("La informacion ha sido enviada.");
    } catch (error: any) {
      if(error?.status === 400){
        setMessage("Los datos no fueron procesados correctamente.");
        return;
      }
      setMessage("Ha ocurrido un error inesperado. Intente mas tarde.");
    }
  };

  return (
    <div>
      <h1>Welcome, contact us</h1>;
      <form>
        <label htmlFor="name">Nombres:</label>
        <h1>{message}</h1>
        <input
          id="name"
          type="text"
          aria-label="Nombre completo"
          placeholder="Escribe tu nombre"
          value={inputName}
          onChange={(e) => setInputName(e.currentTarget.value)}
        />
        <textarea
          value={textMessage}
          onChange={(e) => setTextMessage(e.currentTarget.value)}
          aria-label="mensaje"
          placeholder="Dejanos tu mensaje"
        />
        <CustomButton
          className={isInvalidForm() ? "bg-gray-100" : ""}
          disabled={isInvalidForm()}
          onClick={handleSubmit}
        >
          Enviar
        </CustomButton>
      </form>
    </div>
  );
};
export default Contact;
