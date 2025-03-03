import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
   <Component {...pageProps} />;
   <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

