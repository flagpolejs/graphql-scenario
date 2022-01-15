"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const flagpole_1 = require("flagpole");
const dist_1 = require("../../dist");
flagpole_1.default("SpaceX GraphQL API", (suite) => __awaiter(void 0, void 0, void 0, function* () {
    suite
        .scenario("Get Last 10 Launches", dist_1.default)
        .open("https://api.spacex.land/graphql")
        .setQuery(dist_1.gql `
        query {
          launchesPast(limit: 10) {
            mission_name
            launch_date_local
            launch_site {
              site_name_long
            }
          }
        }
      `)
        .next((context) => __awaiter(void 0, void 0, void 0, function* () {
        context.comment(context.response.body);
        const launches = yield context.exists("data.launchesPast");
        launches.is.array();
        launches.length.assert().equals(10);
    }));
}));
