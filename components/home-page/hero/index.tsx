export const Hero = ({ price }: { price: string }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div>COMIENZA A DISFRUTAR LAS MEJORES HISTORIAS HECHAS PARA TI</div>
      <div>
        <div>Los planes empiezan desde</div>
        <div>${price}/mes*</div>
      </div>
    </div>
  );
};
