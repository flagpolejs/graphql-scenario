import { iScenario, ProtoScenario } from "flagpole";
import { KeyValue } from "flagpole/dist/interfaces/generic-types";
import { HttpRequestOptions } from "flagpole/dist/interfaces/http";
import { DocumentNode } from "graphql";
import { GraphQLResponse } from "./graphql-response";
import {
  CONTENT_TYPE_GRAPHQL,
  CONTENT_TYPE_JSON,
  fetchWithNeedle,
} from "./needle-adapter";

export class GraphQLScenario extends ProtoScenario implements iScenario {
  public readonly requestAdapter = fetchWithNeedle;
  public readonly response = new GraphQLResponse(this);

  protected _query: string = "";
  protected _operationName?: string;
  protected _variables: KeyValue = {};

  protected _getDefaultRequestOptions(): HttpRequestOptions {
    const headers: KeyValue = {};
    headers["Content-Type"] = CONTENT_TYPE_JSON;
    return {
      method: "post",
      headers,
    };
  }

  protected updateJsonBody(): this {
    this.setJsonBody({
      query: this._query,
      operationName: this._operationName,
      variables: this._variables,
    });
    return this;
  }

  public setQuery(query: DocumentNode | string): this {
    this._query =
      typeof query == "string" ? query : query.loc?.source.body || "";
    return this.updateJsonBody();
  }

  public setVariables(variables: KeyValue): this {
    this._variables = variables;
    return this.updateJsonBody();
  }

  public setOperationName(name: string): this {
    this._operationName = name;
    return this.updateJsonBody();
  }
}
