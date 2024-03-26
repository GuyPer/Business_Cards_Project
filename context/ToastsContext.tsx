import React, { createContext, useState } from "react"
import { ToastContainer, Toast } from "react-bootstrap"

interface ToastType {
    id: number
    message: string
}

interface ToastsContextType {
    addToast: (message: string) => void
}

export const ToastsContext = createContext<ToastsContextType | undefined>(undefined)

export default function ToastsProvider({ children }: { children: React.ReactNode }) {

    const [toasts, setToasts] = useState<ToastType[]>([])

    const addToast = (message: string) => {
        const newToast: ToastType = { id: Date.now(), message }
        setToasts([...toasts, newToast])
    }

    return (
        <ToastsContext.Provider value={{ addToast }}>
            {children}
            {/* <div style={{ marginTop: "10vw" }}> */}
            <ToastContainer className="p-3" style={{ position: "fixed", right: 0, top: "7vw", color: "green", borderColor: "green" }} >
                {toasts.map((toast) =>
                    <Toast key={toast.id} onClose={() => setToasts(toasts => toasts.filter(t => t.id !== toast.id))} delay={3000} autohide >
                        <Toast.Body>
                            {toast.message}
                        </Toast.Body>
                    </Toast>
                )}
            </ToastContainer>
            {/* </div> */}
        </ToastsContext.Provider>
    )
}
