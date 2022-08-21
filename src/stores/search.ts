import type { SearchResultJSON, SearchResultItem } from "@/types/SearchResults";
import { defineStore } from "pinia";

export const useSearchStore = defineStore({
  id: "search",
  state() {
    return {
      isLoading: false,
      query: "",
      results: [] as SearchResultItem[],
      currentPage: 1,
      totalPages: 0,
      totalResults: 0,
      prev: null as string | null,
      next: null as string | null,
    };
  },
  actions: {
    async setQuery(query: string) {
      this.isLoading = true;
      this.query = query;
      this.currentPage = 1;
      await fetch(
        "https://rickandmortyapi.com/api/character/?" +
          new URLSearchParams({ name: this.query })
      )
        .then((response) => response.json())
        .then((result: SearchResultJSON) => {
          this.results = result.results;
          this.totalPages = result?.info?.pages || 0;
          this.prev = result?.info?.prev || null;
          this.next = result?.info?.next || null;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchPage(direction: "next" | "prev") {
      this.isLoading = true;
      if (this[direction] != null) {
        await fetch(this[direction] as string)
          .then((response) => response.json())
          .then((result: SearchResultJSON) => {
            direction == "prev" ? this.currentPage-- : this.currentPage++;
            this.results = result.results;
            this.prev = result?.info?.prev || null;
            this.next = result?.info?.next || null;
            this.isLoading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
});
