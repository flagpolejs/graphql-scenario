import { iScenario, iValue, ProtoScenario } from "flagpole";
import { KeyValue } from "flagpole/dist/interfaces/generic-types";
import { HttpRequestOptions } from "flagpole/dist/interfaces/http";
import { GraphQLResponse } from "./graphql-response";
import {
  CONTENT_TYPE_GRAPHQL,
  CONTENT_TYPE_JSON,
  fetchWithNeedle,
} from "./needle-adapter";

export class GraphQLScenario extends ProtoScenario {
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

  protected updateJsonBody(): GraphQLScenario {
    this.setJsonBody({
      query: this._query,
      operationName: this._operationName,
      variables: this._variables,
    });
    return this;
  }

  public open(endpointUrl: string | iValue): GraphQLScenario {
    super.open(typeof endpointUrl == "string" ? endpointUrl : endpointUrl.$);
    return this;
  }

  public setQuery(query: string): GraphQLScenario {
    this._query = query;
    return this.updateJsonBody();
  }

  public setVariables(variables: KeyValue): GraphQLScenario {
    this._variables = variables;
    return this.updateJsonBody();
  }

  public setOperationName(name: string): GraphQLScenario {
    this._operationName = name;
    return this.updateJsonBody();
  }
}
