import should = require("should");

import { createAppTester } from "zapier-platform-core";

import App from "../index";
const appTester = createAppTester(App);

describe("My Test", () => {
  it("should test the auth succeeds", async () => {
    const bundle = {
      authData: {
        username: "user",
        password: "secret"
      }
    };

    const response = await appTester(App.authentication.test, bundle);
    should(response.status).eql(200);
    response.request.headers!.Authorization.should.eql(
      "Basic dXNlcjpzZWNyZXQ="
    );
  });

  it("should test the auth fails", () => {
    const bundle = {
      authData: {
        username: "user",
        password: "boom"
      }
    };

    // @ts-ignore: rejected() is there
    return should(appTester(App.authentication.test, bundle)).be.rejected();
  });
});
