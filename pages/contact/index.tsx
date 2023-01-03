import { useState } from "react";
import CustomButton from "../../components/buttons/default";

const Contact = () => {
  const [inputName, setInputName] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await fetch("/api/contact", {
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
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error?.status === 400) {
        setMessage("Los datos no fueron procesados correctamente.");
        return;
      }
      setMessage("Ha ocurrido un error inesperado. Intente mas tarde.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1>Welcome, contact us</h1>
      <div className="flex flex-col gap-5 border-black border">
        <h1>{message}</h1>
        <div className="flex flex-col gap-8">
          <div>
            <label htmlFor="name">Nombres:</label>
            <input
              id="name"
              type="text"
              aria-label="Nombre completo"
              placeholder="Escribe tu nombre"
              value={inputName}
              onChange={(e) => setInputName(e.currentTarget.value)}
            />
          </div>
          <div>
            <textarea
              value={textMessage}
              onChange={(e) => setTextMessage(e.currentTarget.value)}
              aria-label="mensaje"
              placeholder="Dejanos tu mensaje"
              className="w-full"
            />
          </div>
        </div>
        <CustomButton
          className={isInvalidForm() || isLoading ? "!bg-gray-100" : ""}
          disabled={isInvalidForm() || isLoading}
          onClick={handleSubmit}
        >
          Enviar
        </CustomButton>
      </div>
    </div>
  );
};
export default Contact;
