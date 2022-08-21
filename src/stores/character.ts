import type { EpisodeResultItem } from "@/types/EpisodeResults";
import type { SearchResultItem } from "@/types/SearchResults";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useCharacterStore = defineStore({
  id: "character",
  state: () => ({
    isLoading: false,
    characterData: {} as SearchResultItem,
    episodesData: {} as { [key: string]: EpisodeResultItem },
  }),
  actions: {
    async fetchData(characterId: number) {
      this.isLoading = true;
      await fetch("https://rickandmortyapi.com/api/character/" + characterId)
        .then((response) => response.json())
        .then((result: SearchResultItem) => {
          this.characterData = result;
        })
        .then(async () => {
          // fetch episode data for all episodes
          let episodeDataUrl = "https://rickandmortyapi.com/api/episode/";
          this.characterData.episode.forEach((episode) => {
            let urlSplit = episode.split("/");
            if (
              !this.episodesData[
                "https://rickandmortyapi.com/api/episode/" +
                  urlSplit[urlSplit.length - 1]
              ]
            )
              episodeDataUrl += urlSplit.pop() + ","; // breaking the URL because the item after last slash is ep. no.
          });
          episodeDataUrl = episodeDataUrl.slice(0, episodeDataUrl.length - 1); // remove the last comma

          await fetch(episodeDataUrl)
            .then((res) => res.json())
            .then((eps: EpisodeResultItem | EpisodeResultItem[]) => {
              if (eps instanceof Array) {
                eps.forEach((ep) => {
                  this.episodesData[ep.url] = ep;
                });
              } else {
                this.episodesData[eps.url] = eps;
              }
              this.isLoading = false;
            });
        })
        .catch((err) => {
          throw err;
        });
    },
  },
});
