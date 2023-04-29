
import { TopicProps } from "../../../types/api/topics";

export interface InitialStateProps {
    topic_data: TopicProps[];
    active_topic?: ActiveTopic;
};

interface ActiveTopic {
    id: number;
    name: string;
}