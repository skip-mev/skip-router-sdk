import axios from "axios";

import { COSMOSHUB_ENDPOINT, OSMOSIS_ENDPOINT } from "./utils";

// THESE ARE PLACEHOLDER TESTS
describe("basic e2e tests", () => {
  it("can connect to cosmoshub devnet", async () => {
    const response = await axios.get(`${COSMOSHUB_ENDPOINT}/status`);

    expect(response.data.result.node_info.network).toEqual("gaia-1");
  });

  it("can connect to osmosis devnet", async () => {
    const response = await axios.get(`${OSMOSIS_ENDPOINT}/status`);

    expect(response.data.result.node_info.network).toEqual("osmosis-1");
  });
});
