import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queries = useSelector(state => Object.values(state.adminApi.queries));
  const isSomeQueryPending = queries.some(query => query.status === 'pending');
  useEffect(() => {
    setIsLoading(isSomeQueryPending);
  }, [isSomeQueryPending]);
  return isLoading;
}

export default useLoader;