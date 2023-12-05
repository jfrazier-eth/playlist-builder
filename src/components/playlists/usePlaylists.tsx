import { Page, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

export type AsyncData<T> =
  | { isReady: false }
  | { isReady: true; error: string }
  | { isReady: true; data: T };

export type UnwrappedPaginationResponse<T> = {
  complete: boolean;
  items: T[];
  total: number;
};

export type PaginationResponse<T> = AsyncData<UnwrappedPaginationResponse<T>>;

export const usePagination = <T,>(
  loadNext: (options: { offset: number }) => Promise<Page<T>>,
) => {
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState<PaginationResponse<T>>({
    isReady: false,
  });

  const fetchNext = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = await loadNext({ offset });

      setOffset(nextPage.offset);
      setState((prev) => {
        let items = prev.isReady && "data" in prev ? prev.data.items : [];
        items = items.concat(nextPage.items);

        return {
          isReady: true,
          data: {
            complete: nextPage.total === nextPage.offset,
            items,
            total: nextPage.total,
          },
        };
      });
    } catch (err) {
      console.error(err);

      setState({
        isReady: true,
        error: "Failed to fetch data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return {
    state,
    isLoading,
    fetchNext,
  };
};

export const useItem = <T,>(getItem: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AsyncData<T>>({
    isReady: false,
  });

  const fetch = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const playlist = await getItem();

      setData({
        isReady: true,
        data: playlist,
      });
    } catch (err) {
      console.error(`Failed to get item`, err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return data;
};

export const usePlaylists = (sdk: SpotifyApi) => {
  const loadNext = async (options: { offset: number }) => {
    return await sdk.currentUser.playlists.playlists(20, options.offset);
  };
  const pagination = usePagination(loadNext);

  return pagination;
};
