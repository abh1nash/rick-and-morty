import { rest } from "msw";
import searchResultJSON from "./responses/search.json";
import character1JSON from "./responses/character-1.json";
import type { EpisodeResultItem } from "@/types/EpisodeResults";
const handlers = [
  rest.get("https://rickandmortyapi.com/api/character/:id", (req, res, ctx) => {
    if (req.params.id == "1")
      return res(ctx.status(200), ctx.json(character1JSON));
    return res(ctx.status(404));
  }),
  rest.get("https://rickandmortyapi.com/api/character/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(searchResultJSON));
  }),
  rest.get(
    "https://rickandmortyapi.com/api/episode/:episodes",
    (req, res, ctx) => {
      const episodes = req.params.episodes as string;
      const episodeResults: EpisodeResultItem[] = [];
      episodes.split(",").forEach((id) => {
        const episodeResult: EpisodeResultItem = {
          name: `Episode #${id}`,
          id: parseInt(id),
          air_date: "",
          episode: id,
          characters: [],
          url: "https://rickandmortyapi.com/api/episode/" + id,
          created: "",
        };
        episodeResults.push(episodeResult);
      });
      return res(
        ctx.status(200),
        ctx.json(episodeResults.length > 1 ? episodeResults : episodeResults[0])
      );
    }
  ),
];
export default handlers;
