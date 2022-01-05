import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import AppContext from '../AppContext';
import A from '../layout/A';
import s from './HackageSearchResults.module.css';

const HackageSearchResults = ({ query }: { query: string }) => {
  const appContext = useContext(AppContext);
  const [searchResults, setSearchResults] = useState<{ name: string }[]>([]);

  useEffect(() => {
    (async () => {
      if (!query) {
        return;
      }

      let searchTerms = query.split(' ').join('+');

      let resData: { name: string }[] = [];

      const taskId = 'hackage-search';
      try {
        appContext.startTask(taskId, `search on Hackage: ${query}`);

        resData = await (await axios.get(
          `/api/hackage/packages/search?terms=${encodeURIComponent(searchTerms)}`,
          { headers: { 'Content-Type': 'application/json' } }
        )).data;
      } catch (err) {
        appContext.notifyError('An error occured during searching on Hackage');
        console.log(err);
      } finally {
        appContext.finishTask(taskId);
      }

      setSearchResults(resData);
    })()

    // XXX - don't add appContext to deps here as eslint suggests.
    // It may cause infinite recursive calls. Fix it if you know how.
  }, [query, appContext.tasks.length]);

  return (
    <div className={s.hackageSearchResults}>
      {searchResults.map(pkg => {
        return (
          <A key={pkg.name} className={s.searchResult} href={`/package/${pkg.name}`}>
            {pkg.name}
          </A>
        );
      })}
    </div>
  )
}

export default HackageSearchResults;