import { CaptionProps } from "../../../types/api/captions";
import { PageProps } from "../entry/entry.types";

export interface InitialStateProps {
    captions: CaptionProps[];
    active_caption?: CaptionProps;
    pagination?: PageProps,
    caption_loading : boolean;
};

