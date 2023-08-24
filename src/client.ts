import { RequestClient } from "./request-client";
import {
  Chain,
  chainFromJSON,
  ChainJSON,
  swapVenueFromJSON,
  SwapVenueJSON,
} from "./types";

export const SKIP_API_URL = "https://api.skip.money/v1";

export class SkipAPIClient {
  private requestClient: RequestClient;

  constructor(apiURL: string) {
    this.requestClient = new RequestClient(apiURL);
  }

  async chains(): Promise<Chain[]> {
    const response = await this.requestClient.get<{ chains: ChainJSON[] }>(
      "/info/chains",
    );

    return response.chains.map((chain) => chainFromJSON(chain));
  }

  async venues() {
    const response = await this.requestClient.get<{ venues: SwapVenueJSON[] }>(
      "/fungible/venues",
    );

    return response.venues.map((venue) => swapVenueFromJSON(venue));
  }
}
