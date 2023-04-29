import { TopicProps } from "../../../types/api/topics";

export interface ComponentStateProps {
    open: boolean;
}

export interface EntryEditorProps {
    text: string;
    setText: (value: string) => void;
    handleSave: () => void;
    buttonText?: string;
    title?: string;
    showTopic?: boolean;
    handleSelectTopic?:(e:any) => void;
    selectTopic?: TopicProps;
}