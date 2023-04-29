export interface TopicProps {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at?: string;
  }
  
 export interface TopicsResponseProps {
    status: number;
    message: string;
    payload: TopicProps[];
  }
  