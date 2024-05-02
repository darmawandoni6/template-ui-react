declare type FormCmponent<P> = {
  <RecordType>(props: P<RecordType>, context?: unknown): ReactNode;
  defaultProps?: Partial<P> | undefined;
};

declare type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
declare type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
