# graphql-scenario

Flagpole Add-On for GraphQL Testing

```typescript
import flagpole from "flagpole";
import { GraphQLScenario } from "graphql-scenario";

flagpole("SpaceX GraphQL API", async (suite) => {
  suite
    .scenario("Get Last 10 Launches", GraphQLScenario)
    .open("https://api.spacex.land/graphql")
    .setQuery(
      `query { launchesPast(limit: 10) { mission_name launch_date_local launch_site { site_name_long } } }`
    )
    .next(async (context) => {
      const launches = await context.exists("data.launchesPast");
      launches.is.array();
      launches.length.assert().equals(10);
    });
});
```
