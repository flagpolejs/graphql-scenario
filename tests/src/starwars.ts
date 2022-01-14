import flagpole from "flagpole";
import { GraphQLScenario } from "../../dist/graphql-scenario";

flagpole("Star Wars GraphQL API", async (suite) => {
  suite
    .scenario("Smoke Test", GraphQLScenario)
    .open("POST https://graphql.org/swapi-graphql")
    .setJsonBody({
      query: `query {
  allFilms {
    films {
      title
    }
  }
}`,
    })
    .next(async (context) => {
      await context.exists("data.allFilms");
    });
});
