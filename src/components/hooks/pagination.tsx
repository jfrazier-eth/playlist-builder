import { Page } from "@spotify/web-api-ts-sdk";
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
  loadAll = false,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState<PaginationResponse<T>>({
    isReady: false,
  });

  const fetchNext = async (offset: number, signal: { abort: boolean }) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = await loadNext({ offset });
      if (signal.abort) {
        return;
      }

      setState((prev) => {
        let items = prev.isReady && "data" in prev ? prev.data.items : [];
        items = items.concat(nextPage.items);

        return {
          isReady: true,
          data: {
            complete: nextPage.items.length === 0,
            items,
            total: nextPage.total,
          },
        };
      });
    } catch (err) {
      console.error(err);
      if (signal.abort) {
        return;
      }

      setState({
        isReady: true,
        error: "Failed to fetch data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let signal = { abort: false };
    if (!state.isReady) {
      fetchNext(0, signal);
    } else if ("error" in state) {
      console.log("Error!");
    } else if (state.data.complete) {
      console.log(`Complete!`);
    } else if (loadAll) {
      fetchNext(state.data.items.length, signal);
    }

    return () => {
      signal.abort = true;
    };
  }, [loadAll, state]);

  useEffect(() => {});

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
