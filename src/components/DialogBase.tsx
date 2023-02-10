export const DialogBase = () => {
  return (
    <>
      {/* Fondo blanco */}
      <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 opacity-75"></div>
      {/* Contendor Dialog */}
      <div className="fixed top-0 left-0 w-full h-screen flex z-50 justify-center items-center" onClick={() => {console.log("Padre")}}>
        <div
          className="w-7/12 h-3/6 bg-white flex"
          style={{ borderRadius: '70px' }}
          onClick={() => {console.log("Hijo")}}
        >
          <div className="w-7/12"> imagen </div>
          <div
            className="w-5/12 h-full border-2 border-[#000aff] p-10"
            style={{ borderRadius: '70px' }}
          >
            <p>Ingresa</p>
          </div>
        </div>
      </div>
    </>
  );
};