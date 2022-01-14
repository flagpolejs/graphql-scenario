import {
  HttpResponse,
  iResponse,
  iValue,
  ProtoResponse,
  ValuePromise,
} from "flagpole";
import {
  jpathFind,
  jpathFindAll,
  JPathProvider,
  JsonDoc,
} from "flagpole/dist/json/jpath";

export class GraphQLResponse
  extends ProtoResponse
  implements iResponse, JPathProvider
{
  public jsonDoc: JsonDoc | undefined;

  public get responseTypeName(): string {
    return "GraphQL";
  }

  public init(httpResponse: HttpResponse) {
    super.init(httpResponse);
    this.jsonDoc = new JsonDoc(this.jsonBody.$);
    this.context
      .assert("JSON is valid", this.jsonBody.$)
      .type.not.equals("null");
  }

  public getRoot(): any {
    return this.jsonBody.$;
  }

  public async eval(): Promise<any> {
    throw "This type of scenario does not suport eval.";
  }

  public find = (path: string): ValuePromise => jpathFind(this, path);
  public findAll = (path: string): Promise<iValue[]> =>
    jpathFindAll(this, path);
}
