export interface TopicTableListItem {
    key: number;
    title: string;
    term: number;
    description: string;
    status: number;
  }

  export interface InitialValuesProps {
    title: string,
    term: Moment,
    description: string,
  }