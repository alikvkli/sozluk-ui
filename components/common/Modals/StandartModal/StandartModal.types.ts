export interface StandarModalProps {
    show: boolean;
    setShow: (value: boolean) => void;
    title: string;
    content: string | React.ReactNode,
    callback: () => void;
    buttonText: ButtonTextProp;
}

interface ButtonTextProp {
    dismiss: string;
    agree: string
}