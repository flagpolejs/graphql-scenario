import { KeyValue } from "flagpole/dist/interfaces/generic-types";

export interface GraphQLRequestOptions {
  query: any;
  variables: KeyValue;
  // Client opts
  credentials: string;
  mode: string;
}
