import { Toaster } from "react-hot-toast"

export const ToastPortal = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      style: {
        fontFamily: "var(--fonts-sans)",
      },
    }}
  />
)
export default ToastPortal
